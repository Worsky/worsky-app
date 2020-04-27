import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { colors } from "~/styles";

import styles from "./styles";

const ErrorPage = ({
  color = colors.worSky.blue,
  size = 16,
  text = "Something went wrong, try again later!",
  ...props
}) => {
  console.log({ props });
  return (
    <View style={styles.container}>
      <Text style={{ color, fontSize: size }}>{text}</Text>
    </View>
  );
};

ErrorPage.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  text: PropTypes.string
};

export default ErrorPage;
