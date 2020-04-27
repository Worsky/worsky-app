import { StyleSheet } from "react-native";
import { metrics } from "~/styles";

const styles = StyleSheet.create({
  button: {
    alignItems: "flex-start",
    padding: metrics.basePadding,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  pointType: {
    fontSize: 14,
    fontWeight: "bold"
  },

  icon: {
    width: 30,
    height: 30
  }
});

export default styles;
