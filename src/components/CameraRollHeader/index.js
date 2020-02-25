import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

const CameraRollHeader = ({ title = "Gallery", nextEnabled = true, handleFunction, handleBack }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerActions}>
      <Icon name="times" size={22} onPress={() => handleBack()} />
      <Text style={styles.groupTypes}>{title}</Text>
    </View>
    {nextEnabled ? (
      <Text onPress={() => handleFunction()} style={[styles.groupTypes, { color: "blue" }]}>Next</Text>
    ) : null}
  </View>
);

export default CameraRollHeader;
