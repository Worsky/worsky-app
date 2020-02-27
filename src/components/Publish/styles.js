import { StyleSheet, Dimensions, Platform } from "react-native";
import { metrics, colors } from "../../styles";

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
  },
  input: {
  },
  inputsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
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
  }
});

export default styles;
