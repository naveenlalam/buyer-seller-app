import { StyleSheet, Text, View } from 'react-native';
import tailWind from 'tailwind-react-native-classnames';
import HomeScreen from './HomeScreen';
import MapView,{ Marker } from 'react-native-maps';

import React, { useEffect, useRef, useState } from "react";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";



const MapsDirectionsScreen = ({ route, navigation }) => {
  

  const originCoordinates = [{
    latitude:route.params.originLat,
    longitude:route.params.originLng
  }];

  const destCoordinates = [{
    latitude:route.params.destinationLat,
    longitude:route.params.destinationLng
  }];
 
  
  return (    
           <MapView  style = {styles.mapStyle}
              initialRegion={{
              latitude: route.params.originLat,
              longitude: route.params.originLng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
              
             }}>

            <Marker 
                 coordinate={{
                  latitude: route.params.originLat,
                  longitude:route.params.originLng,
                 }}
                 title="Seller location"
                 description="Description"
              />

          <Marker 
                 coordinate={{
                  latitude: route.params.destinationLat,
                  longitude:route.params.destinationLng,
                 }}
                 title="Buyer location"
                 description="Description"
              />
              
          <MapViewDirections origin={originCoordinates[0]} 
                             destination={destCoordinates[0]} 
                             apikey={GOOGLE_MAPS_APIKEY}
                             strokeWidth={3}
                             optimizeWaypoints={true}
                             strokeColor="red" 
                             />

            </MapView>


    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textfont: {
    fontSize: 20,
  },
  mapStyle: {
    flex: 3,
  },

});

export default MapsDirectionsScreen;
