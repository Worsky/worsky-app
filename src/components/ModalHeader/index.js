import React from "react";
import { View, Image, Text } from "react-native";

import Logo from "../../assets/images/blueLogoWithOutText/logo.png";

import styles from "./styles";

const ModalHeader = () => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={Logo} resizeMode="contain" style={styles.image} />
    </View>
    <Text style={styles.text}>Worsky</Text>
  </View>
);

export default ModalHeader;
