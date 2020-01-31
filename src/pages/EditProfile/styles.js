import { StyleSheet, Platform } from "react-native";
import { metrics, colors } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  headerContainer: {
    padding: metrics.basePadding,
    height: metrics.height / 3.2,
    marginBottom: metrics.baseMargin * 3
  },

  headerImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: metrics.baseMargin,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.2)",
    height: metrics.height / 3.2
  },

  headerImage: {
    width: metrics.width / 3.5,
    height: metrics.width / 3.5,
    borderRadius:
      Platform.OS == "ios" ? metrics.baseRadius * 14 : metrics.baseRadius * 20,
    resizeMode: "cover"
  },

  profileTitle: {
    marginVertical: metrics.baseMargin * 2,
    fontSize: 18,
    color: colors.worSky.black
  },

  inputContainer: {
    width: metrics.width,
    paddingHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin * 3
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.worSky.black,
    paddingHorizontal: 2
  },

  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.2)",
    fontSize: 15,
    paddingVertical: 8
  },

  buttomContainer: {
    marginTop: metrics.baseMargin * 5,
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
  },
  customPicker: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12
  },

  countryHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: metrics.basePadding
  },

  countryHeaderText: {
    fontSize: 16,
    fontWeight: "bold"
  },

  countryItem: {
    width: "100%",
    color: colors.worSky.black,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    paddingVertical: metrics.basePadding,
    alignSelf: "center"
  },

  customPickerModal: {
    borderRadius: metrics.baseRadius * 1.8,
    paddingHorizontal: metrics.basePadding / 2
  },

  countryFooterContainer: {
    height: 55,
    alignItems: "center",
    justifyContent: "center"
  },

  countryFooterButtom: {
    height: 40,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.worSky.blue,
    borderRadius: metrics.baseRadius * 10
  },

  countryFooterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.worSky.white
  },

  errorText: {
    color: colors.worSky.danger,
    fontSize: 10
  },

  successText: {
    color: colors.worSky.success,
    fontSize: 12,
    marginBottom: metrics.baseMargin
  },

  imageLoading: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: metrics.width / 3.5,
    height: metrics.width / 3.5,
    borderRadius:
      Platform.OS == "ios" ? metrics.baseRadius * 14 : metrics.baseRadius * 20
  }
});

export default styles;
