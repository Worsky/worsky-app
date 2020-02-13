import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: metrics.width / 1.4,
    height: metrics.height / 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.worSky.white,
    top: -20,
    marginBottom: metrics.baseMargin * 1.2
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: metrics.width / 5.2,
    backgroundColor: colors.worSky.white,
    borderRadius: metrics.baseRadius * 20,
    padding: metrics.basePadding,
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
