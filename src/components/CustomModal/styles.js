import { StyleSheet } from "react-native";
import { metrics, colors } from "~/styles";

const style = StyleSheet.create({
  modalAroundContainer: {
    flex: 1,
    width: metrics.width,
    height: metrics.height,
    backgroundColor: "rgba(53, 53, 53, 0.6)",
    justifyContent: "center",
    alignItems: "center"
  },

  modalContainer: {
    flex: 1,
    maxHeight: metrics.height / 1.5,
    width: metrics.width / 1.2,
    backgroundColor: colors.worSky.white,
    borderRadius: metrics.baseRadius * 2,
    padding: metrics.basePadding,
    alignContent: "center",
    justifyContent: "center"
  },

  closeContainer: {
    height: 36,
    justifyContent: "flex-end",
    alignItems: "center"
  },

  closeButtom: {
    width: metrics.width / 1.5,
    height: 25,
    justifyContent: "center",
    alignItems: "center"
  },

  closeText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15
  }
});

export default style;
