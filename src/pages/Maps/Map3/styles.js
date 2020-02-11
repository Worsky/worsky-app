import { StyleSheet, Platform } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  mapContainer: {
    height: metrics.height,
    width: metrics.width
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    zIndex: 99,
    padding: metrics.basePadding / 2,
    justifyContent: "space-between",
    alignItems: "center",
    width: metrics.width,
    backgroundColor: colors.worSky.white,
    ...Platform.select({
      ios: {
        paddingTop: 35
      },
      android: {
        paddingRight: 40
      }
    })
  },

  iconContainer: {
    height: 28,
    width: 30,
    marginLeft: 5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    ...Platform.select({
      ios: {
        position: "absolute",
        top: 47,
        right: 30,
        zIndex: 999
      },
      android: {
        paddingTop: 35
      }
    })
  },

  filterIconContainer: {
    height: "100%",
    width: 30,
    height: 20,
    marginTop: 20,
    textAlign: "center"
  },

  autocomplete: {
    height: Platform.OS == "ios" ? 30 : 35,
    width: metrics.width - 80,
    marginTop: metrics.baseMargin,
    backgroundColor: colors.worSky.grey,
    borderRadius: metrics.baseRadius * 6,
    textAlign: "center",
    paddingHorizontal: 20,
    flex: 1,
    alignContent: "center"
  },

  instruments: {
    position: "absolute",
    left: 4,
    right: 4,
    top: 70,
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  instrumentItem: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 22,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 8,
    marginHorizontal: 4,
    textAlign: "center",
    lineHeight: 40,
    overflow: "hidden"
  },

  myPositionButton: {
    position: "absolute",
    right: 8,
    bottom: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  myHeadButton: {
    position: "absolute",
    left: 8,
    bottom: 8,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  planeOnMap: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -32 }, { translateY: -32 }]
  },

  moreDetailButton: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: colors.worSky.blue,
    borderRadius: 8
  },

  moreDetailButtonText: {
    color: colors.worSky.white,
    textAlign: "center"
  },

  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15
  },

  annotationFill: {
    width: 30,
    height: 30
  }
});

export default styles;
