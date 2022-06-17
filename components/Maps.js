import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import MapView,{ Marker } from 'react-native-maps';


const Maps = () => {
    return (
            <MapView style = {styles.mapStyle}
              initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
             }}/>
    )
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 3,
  },
});

export default Maps;
