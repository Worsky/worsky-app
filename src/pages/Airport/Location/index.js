import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
// import MapView, { Marker } from 'react-native-maps';
import PropTypes from "prop-types";

import MapStyle from "~/config/MapStyle";

import styles from "./styles";

const Location = ({ data }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Icon name="map-marker-alt" size={20} style={styles.iconTitle} />
      <Text style={styles.title}>Location</Text>
    </View>
    {/* <MapView
      style={styles.mapContainer}
      customMapStyle={MapStyle}
      initialRegion={data}
      showsPointsOfInterest={false}
      showBuilding={false}
    >
      <Marker coordinate={data} />
    </MapView> */}
  </View>
);

Location.propTypes = {
  data: PropTypes.object.isRequired
};

export default Location;
