import { StyleSheet } from "react-native";
import { metrics, colors } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrics.basePadding / 2
  },

  infoContainer: {
    flexDirection: "row",
    marginTop: metrics.baseMargin * 1.8
  },

  infoLabel: {
    fontSize: 14,
    width: metrics.width / 2.5
  },

  info: {
    fontSize: 12,
    color: colors.worSky.black,
    textAlign: "justify",
    width: metrics.width / 1.5
  },

  editButtom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: metrics.baseMargin * 2
  },

  editTextButtom: {
    fontSize: 16,
    marginRight: metrics.baseMargin,
    color: colors.worSky.blue
  },

  editIconButtom: {
    fontSize: 16,
    color: colors.worSky.blue
  }
});

export default styles;
