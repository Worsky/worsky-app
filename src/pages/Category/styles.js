import { StyleSheet, Platform } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: metrics.baseMargin
  },

  category: {
    marginTop: 10,
    marginLeft: metrics.baseMargin,
    fontSize: 26,
    fontWeight: "bold",
    color: colors.worSky.black
  },

  categories: {},

  columnWrapper: {
    marginHorizontal:
      Platform.OS === "ios" ? metrics.baseMargin - 10 : metrics.baseMargin,
    justifyContent: "space-between"
  },

  noResultContainer: {
    height: metrics.height / 1.4,
    justifyContent: "center",
    alignItems: "center"
  },

  noResultText: {
    fontSize: 18
  }
});

export default styles;
