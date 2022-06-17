import { StyleSheet, Text, View,TouchableOpacity,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Button, Input } from "react-native-elements";
import React, { useEffect, useRef, useState } from "react";
import MapView,{ Marker } from 'react-native-maps';
import { Feather,Entypo } from "@expo/vector-icons";
import {initHW4AppDB, setupItemDataListener, storeItemData} from "../helpers/fb-termproject";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";





const AddItemScreen = ({ route, navigation }) => {

  const [state, setState] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemAddress: "",
    itemLocation:"",
    itemLocDesc:"",
    notes:"",
  });

  const initialField = useRef(null);

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    });
  }


  function saveItemData() {
    if (formValid(state)) {     
        var data = {
          itemName: state.itemName,
          itemDescription: state.itemDescription,
          notes: state.notes,
          itemAddress: state.itemAddress,
          itemLocation: state.itemLocation,
          itemLocDesc: state.itemLocDesc,
          currentDate: new Date().getTime(),
        }
        storeItemData(data);
      }
      
  }


  function formValid(vals) {
   
    if (
      vals.itemName === "" ||
      vals.itemDescription === "" ||
      vals.notes === "" ||
      vals.itemAddress === "" ||
      vals.itemLocation === "" ||
      vals.itemLocDesc === "" 
    ) {
      return false;
    } else {
      return true;
    }
  }


  

  useEffect(() => {
    try {
      initHW4AppDB();
    } catch (err) {
      console.log(err);
    }
    setupItemDataListener();
  }, []);



  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Home", {})
          }
        >
          <Entypo name="home" size={24} color="white" />
        </TouchableOpacity>
      ),



    });
  });

  

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Input
          style={styles.input}
          placeholder="Item Name"
          ref={initialField}
          value={state.itemName}
          autoCorrect={false}
          onChangeText={(val) => updateStateObject({ itemName: val })}
        />
        <Input
          style={styles.input}
          placeholder="Item Description"
          value={state.itemDescription}
          autoCorrect={false}
          onChangeText={(val) => updateStateObject({ itemDescription: val })}
        />

         <Input  
          style={styles.input}
          placeholder="Notes-info about how to contact"
          multiline = {true}
          numberOfLines = {3}
          maxLength= {140}
          value={state.notes}
          autoCorrect={false}
          onChangeText={(val) => updateStateObject({ notes: val })}
        />

        <GooglePlacesAutocomplete
              placeholder='Meeting Place Location'
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
              styles={{
                container: {
                  backgroundColor: "white",
                  flex:0,
                },
                textInput: {
                  backgroundColor:"#f0f0f2",
                  fontSize:20,
                }
              }}

              onPress={(data,details = null) =>  {
                console.log(data);
                console.log(details);

                updateStateObject({
                  itemAddress: details.formatted_address,
                  itemLocation: details.geometry.location,
                  itemLocDesc: data.description,
                });



              }}

              fetchDetails={true}

              minLength={2}
              enablePoweredByContainer={false}
              query= {{
                key:GOOGLE_MAPS_APIKEY,
                language:'en'
              }}
        />

        <View>
          <Button
            style={styles.buttons}
            title="Add Item"
            onPress={() => saveItemData()}
          />

        </View>
        <View>
          <Button
            style={styles.buttons}
            title="Clear"
            onPress={() => {
              //initialField.current.focus();
              Keyboard.dismiss();
              setState({
                itemName: "",
                itemDescription: "",
                notes: "",
                itemAddress: "",
                itemLocation:"",
                itemLocDesc:"",
              });
            }}
          />
        </View>
        </View>
      </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 3,
  },
});

export default AddItemScreen;
