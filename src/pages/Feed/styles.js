import { StyleSheet, Platform } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  recentContainer: {
    padding: metrics.basePadding
  },

  recentsText: {
    color: colors.worSky.black,
    fontSize: 25,
    fontWeight: "bold"
  },

  internalErrorText: {
    fontSize: 16,
    alignSelf: "center"
  },

  headerContainer: {
    flex: 1
    // position: "absolute",
    // zIndex: 999
  },

  blueHeader: {
    width: metrics.width,
    height: Platform.OS === "ios" ? 150 : 120,
    backgroundColor: colors.worSky.blue,
    justifyContent: "center",
    alignItems: "center"
  },

  textLogo: {
    width: metrics.width / 1.5,
    resizeMode: "contain",
    marginTop: metrics.baseMargin * 3,
    marginBottom:
      Platform.OS === "ios" ? metrics.baseMargin : metrics.baseMargin * 3
  },

  searchContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: -metrics.baseMargin * 1.3,
    flex: 1,
    position: "absolute",
    zIndex: 99,
    flexDirection: "row",
    width: Platform.OS == "ios" ? metrics.width : metrics.width / 1.1,
    top:
      Platform.OS == "ios" ? metrics.baseMargin * 8 : metrics.baseMargin * 11,
    left: Platform.OS == "ios" ? 0 : 20,
    backgroundColor: Platform.OS == "ios" ? "transparent" : "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  iconContainer: {
    height: 50,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.worSky.white
  },

  searchIcon: {
    color: colors.worSky.black,
    fontSize: 18
  },

  searchInput: {
    backgroundColor: colors.worSky.white,
    height: 48,
    width: metrics.width / 1.3
  },

  initialSpace: {
    width: 16
  },

  helpText: {
    fontSize: 21,
    fontWeight: "bold",
    color: colors.worSky.black,
    textAlign: "left",
    width: metrics.width / 2,
    marginTop: metrics.baseMargin * 4,
    marginLeft: metrics.baseMargin
  },

  categoriesCards: {
    flex: 1,
    flexDirection: "row",
    marginTop: metrics.baseMargin * 2,
    width: metrics.width
  }
});

export default styles;
