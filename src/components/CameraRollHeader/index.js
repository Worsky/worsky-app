import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LoadingPage from "../../components/LoadingPage";

import styles from "./styles";

const CameraRollHeader = ({ title = "Gallery", nextEnabled = true, handleFunction, handleBack, next = "Next", loading = false }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerActions}>
      <Icon name="times" size={22} onPress={() => handleBack()} />
      <Text style={styles.groupTypes}>{title}</Text>
    </View>
    {nextEnabled ? loading ? <View style={styles.loading}><LoadingPage size="small" /></View> :
      <Text onPress={() => handleFunction()} style={[styles.groupTypes, { color: "blue" }]}>{next}</Text>
      : null}
  </View>
);

export default CameraRollHeader;
