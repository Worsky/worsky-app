import { StyleSheet, Platform } from "react-native";
import { metrics, colors } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrics.basePadding / 2
  },

  title: {
    fontSize: 25,
    color: colors.worSky.black,
    fontWeight: "bold",
    marginVertical: metrics.baseMargin * 2
  },

  pickerFieldContainer: {
    borderWidth: 1,
    borderColor: "rgba(33,58,130,0.2)",
    borderRadius: metrics.baseRadius * 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: metrics.baseMargin,
    paddingHorizontal: metrics.basePadding,
    paddingVertical: metrics.basePadding / 2
  },

  pickerFieldText: {
    fontSize: 16
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

  pickerFieldSelectedContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },

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

  customPicker: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  uploadContainer: {
    // width: metrics.width - 2,
    height: metrics.height / 3,
    backgroundColor: "#E7EDEF",
    borderRadius: metrics.baseRadius,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: metrics.baseMargin
  },

  imagePost: {
    width: metrics.width,
    height: metrics.height / 3
  },

  uploadIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },

  descriptionTitle: {
    color: colors.worSky.black,
    fontSize: 20
  },

  descriptionInput: {
    paddingVertical: metrics.basePadding / 1.8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    marginBottom: metrics.baseMargin
  },

  publishButtomContainer: {
    marginVertical: metrics.baseMargin * 2,
    justifyContent: "center",
    alignItems: "center"
  },

  publishButtom: {
    width: metrics.width / 2,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.worSky.blue,
    borderRadius: metrics.baseRadius * 10,
    flexDirection: "row"
  },

  publishButtomDisabled: {
    width: metrics.width / 2,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.worSky.grey,
    borderRadius: metrics.baseRadius * 10,
    flexDirection: "row"
  },

  publishText: {
    color: colors.worSky.white,
    fontSize: 14,
    fontWeight: "bold"
  },

  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  optionsItem: {
    width: metrics.width / 3,
    height: metrics.width / 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: metrics.baseRadius
  },

  errorText: {
    fontSize: 11,
    // fontWeight: 'bold',
    color: colors.worSky.danger,
    paddingHorizontal: 2
  },

  loadMedia: {
    position: "absolute"
  }
});

export default styles;
