import { StyleSheet } from "react-native";
import { metrics, colors } from "~/styles";

const styles = StyleSheet.create({
  container: {
    width: metrics.width,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#dee2e6",
    borderBottomWidth: 1
  },

  textContainer: {
    width: metrics.width / 2,
    padding: metrics.basePadding / 2,
    justifyContent: "center"
  },

  text: {
    color: colors.worSky.black,
    fontSize: 14
  }
});

export default styles;
