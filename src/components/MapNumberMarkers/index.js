import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const MapNumberMarkers = ({ text, onPress }) => (
  <Text style={styles.instrumentItem} onPress={onPress}>
    {text}
  </Text>
);

MapNumberMarkers.propTypes = {
  text: PropTypes.string.isRequired
};

export default MapNumberMarkers;
