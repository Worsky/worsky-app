import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import PropTypes from "prop-types";

import styles from "./styles";

const MapMarker = ({ point, openInfoModal }) => (
  <MapboxGL.PointAnnotation
    id={"post-" + point.entity_id}
    coordinate={[Number(point.longitude), Number(point.latitude)]}
    title={point.name}
    snippet={point.description.substring(0, 35) + "... [Veja mais detalhes]"}
    onSelected={() => openInfoModal(point)}
  >
    <View style={styles.annotationContainer}>
      <Image
        source={{
          uri: point.point_type.icon
        }}
        resizeMode="contain"
        style={styles.annotationFill}
      />
      <Text>{point.name}</Text>
    </View>
  </MapboxGL.PointAnnotation>
);

MapMarker.propTypes = {
  point: PropTypes.shape({
    entity_id: PropTypes.number.isRequired,
    longitude: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    point_type: PropTypes.object.isRequired
  }).isRequired,
  openInfoModal: PropTypes.func.isRequired
};

export default MapMarker;
