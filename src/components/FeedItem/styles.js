import { StyleSheet, Platform } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  feedItem: {
    marginTop: metrics.baseMargin,
    marginBottom: metrics.baseMargin * 3
  },

  feedItemHeader: {
    paddingHorizontal: metrics.basePadding - 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },

  userInfo: {
    flexDirection: "row"
  },

  userImage: {
    width: 42,
    height: 42,
    borderRadius:
      Platform.OS === "ios" ? metrics.baseRadius * 5 : metrics.baseRadius * 10,
    marginRight: metrics.baseMargin
  },

  name: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginTop: metrics.baseMargin / 2
  },

  timesAgo: {
    fontSize: 10,
    color: "#666",
    marginTop: 1
  },

  moreButton: {
    marginRight: metrics.baseMargin,
    backgroundColor: colors.worSky.white,
    justifyContent: "center",
    alignItems: "flex-end",
    width: 30,
    height: 30
  },

  moreIcon: {
    color: colors.worSky.black,
    fontSize: 18
  },

  modalAroundContainer: {
    flex: 1,
    width: metrics.width,
    height: metrics.height,
    backgroundColor: "rgba(53, 53, 53, 0.6)",
    justifyContent: "center",
    alignItems: "center"
  },

  reportField: {
    marginTop: metrics.baseMargin,
    width: metrics.width / 1.4,
    borderBottomColor: colors.worSky.grey,
    borderBottomWidth: 1,
    paddingVertical: metrics.basePadding / 2
  },

  publishedContainer: {
    flexDirection: "row",
    width: metrics.width / 1.1,
    justifyContent: "flex-end"
  },

  modalContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  reportTextContainer: {
    height: 60,
    padding: metrics.basePadding / 1.5,
    borderBottomColor: colors.worSky.grey,
    borderBottomWidth: 1
  },

  reportText: {
    color: colors.worSky.black,
    fontSize: 12
  },

  reportButtom: {
    width: metrics.width / 2,
    borderRadius: metrics.baseRadius * 6,
    backgroundColor: colors.worSky.blue,
    paddingVertical: metrics.basePadding / 2,
    paddingHorizontal: metrics.basePadding,
    alignItems: "center",
    justifyContent: "center",
    marginTop: metrics.baseMargin * 2
  },

  reportTextButtom: {
    color: colors.worSky.white,
    fontSize: 16,
    fontWeight: "bold"
  },

  imageContainer: {
    alignItems: "center"
  },

  feedImage: {
    width: metrics.width - 26,
    height: metrics.height / 2.5,
    borderRadius: metrics.baseRadius
  },

  feedItemFooter: {
    marginTop: 15,
    paddingHorizontal: 15
  },

  actions: {
    flexDirection: "row"
  },

  action: {
    flexDirection: "row",
    alignItems: "center"
  },

  likeImges: {
    marginRight: 12,
    width: 20,
    height: 20,
    resizeMode: "contain"
  },

  likes: {
    color: "#000",
    fontSize: 12
  },

  description: {
    lineHeight: 18,
    color: "#000",
    marginTop: metrics.baseMargin
  },

  category: {
    color: "#89b43f"
  },

  locationContainer: {
    flexDirection: "row"
  },

  locationIcon: {
    color: colors.worSky.blue,
    fontSize: 20,
    marginRight: 5
  },

  locationText: {
    color: colors.worSky.black
  },

  categorySigleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrics.baseMargin
  },

  categoryIcon: {
    width: 30,
    height: 30,
    marginRight: metrics.baseMargin / 2,
    resizeMode: "contain"
  },

  categorySigle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.worSky.black
  }
});

export default styles;
