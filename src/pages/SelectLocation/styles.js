import { StyleSheet, Platform } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrics.basePadding / 2
  },

  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: colors.worSky.black,
    marginTop: Platform.OS == "ios" ? metrics.baseMargin : 0,
    marginTop:
      Platform.OS == "ios" ? metrics.baseMargin * 3 : metrics.baseMargin * 6,
    marginBottom: metrics.baseMargin
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: metrics.basePadding / 2,
    position: "absolute"
  },

  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 0
  },

  inputIcon: {
    fontSize: 16
  },

  searchInput: {
    height: 40,
    width: metrics.width / 1.2,
    borderBottomWidth: 1,
    borderBottomColor: colors.worSky.grey,
    marginLeft: metrics.baseMargin / 2
  },

  mapContainer: {
    width: metrics.width,
    height: metrics.height / 1.7
  },

  buttomContainer: {
    marginTop: metrics.baseMargin * 2,
    justifyContent: "center",
    alignItems: "center"
  },

  submitButtom: {
    width: metrics.width / 1.8,
    height: 40,
    borderRadius: metrics.baseRadius * 10,
    backgroundColor: colors.worSky.blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: metrics.baseMargin * 8
  },

  buttomLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.worSky.white
  }
});

export default styles;
