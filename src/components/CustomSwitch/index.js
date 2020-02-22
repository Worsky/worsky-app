import React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const CustomSwitch = ({ value, text, onValueChange }) => (
  <TouchableWithoutFeedback onPress={() => onValueChange()}>
    <View style={styles.checkboxField}>
      <View
        style={
          value
            ? [styles.switchShape, styles.switchOn]
            : [styles.switchShape, styles.switchOff]
        }
      />
      <Text style={styles.filterLabel}>{text}</Text>
    </View>
  </TouchableWithoutFeedback>
);

CustomSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
};

export default CustomSwitch;
