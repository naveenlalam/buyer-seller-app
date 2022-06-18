import { StyleSheet, Text, View } from 'react-native';
import tailWind from 'tailwind-react-native-classnames';
import HomeScreen from './HomeScreen';
import MapView,{ Marker } from 'react-native-maps';

import React, { useEffect, useRef, useState } from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";


const MapsScreen = ({ route, navigation }) => {

  const [lat, setLat] =
    useState(route.params.item.itemLocation.lat);
  const [lng, setLng] =
    useState(route.params.item.itemLocation.lng);
  const [originLocation, setOrigin] =   useState(route.params.item.itemLocation);
  const [name, setName] =
    useState(route.params.item.itemName);  
  const [description, setDescription] =
    useState(route.params.item.itemDescription);
    const [notes, setNotes] =
    useState(route.params.item.notes);
    const [address, setAdress] =
    useState(route.params.item.itemAddress);
  
  return (
  <View>
    <View style={tailWind`h-1/3`}>
            <MapView style = {styles.mapStyle}
              initialRegion={{
              latitude: parseFloat(lat),
              longitude: parseFloat(lng),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
             }}>
              <Marker 
                 coordinate={{
                  latitude: parseFloat(lat),
                  longitude: parseFloat(lng),
                 }}
                 title="Seller location"
                 description={description}
              />


            </MapView>      
    </View>
    <View style={tailWind`h-2/3`}>
    <GooglePlacesAutocomplete
              placeholder='Enter buyers Location to check the route'
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={300}
              styles={{
                container: {
                  backgroundColor: "white",
                  flex:0,
                  borderColor: "black",
                  borderWidth:2,
                },
                textInput: {
                  backgroundColor:"#f0f0f2",
                  fontSize:20,
                },
                
              }}

              onPress={(data,details = null) =>  
                { navigation.navigate("MapsDirections",
                   {originLat: route.params.item.itemLocation.lat, originLng: route.params.item.itemLocation.lng, 
                    destinationLat: details.geometry.location.lat,
                    destinationLng: details.geometry.location.lng});
              }}

              fetchDetails={true}
              minLength={2}
              enablePoweredByContainer={false}
              query= {{
                key:GOOGLE_MAPS_APIKEY,
                language:'en'
              }}
        />      
       <Text style={styles.textfont}>Name: {name}</Text>
       <Text style={styles.textfont}>Description: {description}</Text>
       <Text style={styles.textfont}>Seller notes : {notes}</Text>
       <Text style={styles.textfont}>Address: {address}</Text>

       

    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textfont: {
    fontSize: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  mapStyle: {
    flex: 3,
  },

});

export default MapsScreen;
