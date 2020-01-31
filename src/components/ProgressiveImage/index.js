import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import { colors } from "~/styles";

import styles from "./styles";

class ProgressiveImage extends Component {
  static propTypes = {
    backgroundContainer: PropTypes.string
  };

  render() {
    const { backgroundContainer: backgroundColor } = this.props;

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator
          size="large"
          color={colors.worSky.blue}
          style={styles.imageOverlay}
        />
        <Image {...this.props} />
      </View>
    );
  }
}
export default ProgressiveImage;
