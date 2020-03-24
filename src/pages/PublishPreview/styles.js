import { StyleSheet, Dimensions } from 'react-native';
import { colors, metrics } from '~/styles';
const { height, width } = Dimensions.get("screen");


const styles = StyleSheet.create({
  preview: {
    width: metrics.width,
    height: metrics.height - 320
  },
  viewPreview: {
    flex: 1,
    alignContent: "center",
    marginTop: 45,
    // opacity: 0.25
  },
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  imagePreviewContainer: {
    height: height / 2,
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5"
  },
  playIcon: {
    zIndex: 999,
    fontSize: 40,
    color: "white"
  },
  uploadIcon: {
    // width: 80,
    // height: 80,
    // resizeMode: "contain"
  },
  loadMedia: {
    position: "absolute"
  }
});

export default styles;
