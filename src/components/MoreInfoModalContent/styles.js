import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
    // height: 260
  },

  title: {
    fontSize: 15,
    fontWeight: "bold"
  },

  description: {
    fontSize: 16
  },

  buttonContainer: {
    width: metrics.width / 1.3,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: colors.worSky.lighter,
    borderTopWidth: 1,
    marginTop: metrics.baseMargin * 1.2,
    paddingTop: metrics.basePadding * 1.5
  },

  buttonShape: {
    width: metrics.width / 3,
    height: 40,
    borderRadius: metrics.baseRadius * 20,
    alignItems: "center",
    justifyContent: "center"
  },

  closeButton: {
    backgroundColor: colors.worSky.white,
    borderColor: colors.worSky.blue,
    borderWidth: 1
  },

  closeButtonText: {
    color: colors.worSky.black,
    fontWeight: "bold"
  },

  detailsButton: {
    backgroundColor: colors.worSky.blue,
    borderColor: colors.worSky.blue,
    borderWidth: 1
  },

  detailsButtonText: {
    color: colors.worSky.white,
    fontWeight: "bold"
  }
});

export default styles;
