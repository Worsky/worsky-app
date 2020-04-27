import React from "react";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";
import ProgressiveImage from "~/components/ProgressiveImage";

import styles from "./styles";

const Slider = ({ images }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.sliderContainer}
  >
    {images.map(image => (
      <ProgressiveImage
        key={Math.random()}
        source={{ uri: image }}
        style={styles.sliderImage}
        backgroundContainer="white"
      />
    ))}
  </ScrollView>
);

Slider.propTypes = {
  images: PropTypes.array.isRequired
};

export default Slider;
