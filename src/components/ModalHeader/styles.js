import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    top: -45,
    margin: 0
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.worSky.white,
    height: 60,
    width: 60,
    borderRadius: metrics.baseRadius * 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  image: {
    width: 35
  },

  text: {
    marginTop: metrics.baseMargin / 1.8,
    fontSize: 21,
    fontWeight: "bold"
  }
});

export default styles;
