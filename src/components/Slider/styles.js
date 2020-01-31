import { StyleSheet } from "react-native";
import { metrics } from "~/styles";

const styles = StyleSheet.create({
  sliderContainer: {},

  sliderImage: {
    width: metrics.width / 1.1,
    height: metrics.height / 3,
    marginHorizontal: metrics.baseMargin / 2,
    borderRadius: metrics.baseRadius * 2
  }
});

export default styles;
