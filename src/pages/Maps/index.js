import React, { useEffect, useState, useRef } from "react";
import { StatusBar, Platform, View, Text, Alert } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from "@react-native-community/geolocation";

import { colors } from "~/styles";

MapboxGL.setAccessToken(
  "pk.eyJ1Ijoid29yc2t5IiwiYSI6ImNrN3dwb2xvMjA0ZDQza3FncDhnY3BocnkifQ.3s1eTwHlWIbhWjDiTfp2wQ"
);

export default function Maps() {
  const [currentPosition, setCurrentPosition] = useState({});
  const refCamera = useRef(null);
  // let watchID = null;

  // useEffect(() => {
  //   watchID = Geolocation.watchPosition(
  //     ({ coords }) => {
  //       setCurrentPosition({
  //         latitude: coords.latitude,
  //         longitute: coords.longitude
  //       });
  //     },
  //     error => Alert.alert(JSON.stringify(error)),
  //     {
  //       timeout: 3000,
  //       maximumAge: 0,
  //       distanceFilter: 2,
  //       useSignificantChanges: true
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   if (currentPosition.hasOwnProperty("latitude"))
  //     refCamera.current.flyTo([
  //       currentPosition.longitude,
  //       currentPosition.latitude
  //     ]);
  // }, [currentPosition]);

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView style={{ flex: 1 }} styleURL={MapboxGL.StyleURL.Dark}>
        <MapboxGL.Camera
          followUserLocation
          followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
          centerCoordinate={[
            currentPosition.longitute,
            currentPosition.latitude
          ]}
          zoomLevel={15}
          ref={refCamera}
        />
        <MapboxGL.UserLocation
          onUpdate={({ coords }) => {
            setCurrentPosition({
              latitude: coords.latitude,
              longitute: coords.longitude
            });
            refCamera.current.flyTo([coords.longitude, coords.latitude]);
          }}
        />
      </MapboxGL.MapView>
      <Text>{JSON.stringify({ ...currentPosition })}</Text>
    </View>
  );
}
