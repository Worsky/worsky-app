import { StyleSheet } from "react-native";
import { metrics, colors } from "~/styles";

const styles = StyleSheet.create({
  switchShape: {
    width: 26,
    height: 26,
    borderRadius: metrics.baseRadius * 20,
    backgroundColor: colors.worSky.white
  },

  switchOn: {
    borderWidth: 8,
    borderColor: colors.worSky.blue
  },

  switchOff: {
    borderWidth: 3,
    borderColor: colors.worSky.light
  },

  checkboxField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15
  },

  filterLabel: {
    paddingHorizontal: 16
  }
});

export default styles;
