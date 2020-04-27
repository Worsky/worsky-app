import { StyleSheet, Platform } from "react-native";
import { metrics, colors } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  headerContainer: {
    padding: metrics.basePadding / 2,
    height: metrics.height / 3,
    marginTop: Platform.OS == "ios" ? metrics.baseMargin * 1.2 : 0
  },

  headerIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  headerIconButtom: {
    alignItems: "flex-end",
    justifyContent: "center",
    height: 40,
    width: 40
  },

  headerIcon: {
    fontSize: 18,
    color: colors.worSky.black
  },

  headerImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: metrics.baseMargin
  },

  headerImage: {
    width: metrics.width / 3.5,
    height: metrics.width / 3.5,
    borderRadius:
      Platform.OS == "ios" ? metrics.baseRadius * 14 : metrics.baseRadius * 20,
    resizeMode: "cover"
  }
});

export default styles;
