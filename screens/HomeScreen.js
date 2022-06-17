import { StyleSheet, Text, View,TouchableOpacity, FlatList,StatusBar } from 'react-native';
import { Card } from 'react-native-elements';
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from 'react-native-virtualized-view';
import MapView,{ Marker } from 'react-native-maps';
import { Entypo,Feather } from "@expo/vector-icons";
import { initHW4AppDB, setupItemDataListener } from "../helpers/fb-termproject";



const HomeScreen = ({ route, navigation }) => {


  useEffect(() => {
    try {
      initHW4AppDB();
    } catch (err) {
      console.log(err);
    }

    itemsDataList = setupItemDataListener();

  }, []);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddItem", {})
          }
        >
          <Feather
            style={{ marginRight: 10 }}
            name="file-plus"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      ),
    });
  });

    return (
      <ScrollView style={styles.scrollView}>
      <FlatList style={{width:'100%'}}
          data={setupItemDataListener()}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>{
             return(
                <View style={styles.viewStyle}>
                    <TouchableOpacity
                     onPress={() => { navigation.navigate("Maps",
                     {item});
                     }}>

                    <Card>
                      <Card.Title style={styles.textStyle}>{item.itemName}</Card.Title>
                      <Text style={styles.textStyle}>{item.itemDescription}</Text>
                      <Text style={styles.locStyle}>{item.itemAddress}<Entypo name="location-pin" size={24} color="black" /></Text>
                      <Card.Divider/>
                    </Card>

                   </TouchableOpacity>
                   
                </View>)
             }}/>
      </ScrollView>
  
    )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#E8EAF6",
  },
  scrollView: {
    backgroundColor: 'black',
    marginHorizontal: 20,
  },
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 8,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  headerButton: {
    color: "#fff",
    fontWeight: "bold",
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  locStyle: {
    fontSize: 14,
    fontStyle: "italic",
  },
  viewStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});




export default HomeScreen;
