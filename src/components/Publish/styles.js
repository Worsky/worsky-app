import { StyleSheet, Dimensions, Platform } from "react-native";
import { metrics, colors } from "../../styles";

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
  },
  inputsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  inputAutocomplete: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    // paddingVertical: 15,
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
  },
  button: {
    paddingVertical: 20,
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1
  },
  headerContainer: {
    backgroundColor: "white",
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  groupTypes: {
    fontSize: 18,
    marginLeft: 10
  },
  headerActions: {
    flexDirection: "row"
  },
  imagePreviewContainer: {
    height: 75,
    width: 75,
    marginVertical: 15
  },
  playIcon: {
    zIndex: 999,
    fontSize: 40,
    color: "white"
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  customPickerModal: {
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    paddingBottom: metrics.basePadding
  },
  pickerHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom:
      Platform.OS == "ios" ? metrics.baseMargin * 2 : metrics.baseMargin * 4
  },
  pickerHeaderText: {},
  pickerItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: metrics.basePadding / 2
  },
  pickerItemIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: metrics.baseMargin / 2
  },
  pickerItemText: {
    textAlign: "left",
    color: colors.worSky.black,
    fontSize: 16
  },
  pickerFieldContainer: {
    // borderWidth: 1,
    // borderColor: "rgba(33,58,130,0.2)",
    // borderRadius: metrics.baseRadius * 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: metrics.baseMargin,
    // paddingHorizontal: metrics.basePadding,
    // paddingVertical: metrics.basePadding / 2
  },
  pickerFieldIconContainer: {
    backgroundColor: colors.worSky.blue,
    borderRadius: metrics.baseRadius * 10,
    paddingHorizontal: metrics.basePadding / 2.6,
    paddingVertical: metrics.basePadding / 3
  },

  pickerFieldIcon: {
    fontSize: 14,
    color: colors.worSky.white
  },
  pickerFieldSelectedContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  viewPickerModal: {
    paddingVertical: 15,
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
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
      Platform.OS == "ios" ? metrics.baseMargin * 8 : metrics.baseMargin * 20,
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
  mapView: {
    height: height / 2,
    // width: wi
  },
  uploadIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },
  planeOnMap: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -32 }, { translateY: -32 }]
  }
});

export default styles;
