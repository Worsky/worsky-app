import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  annotationContainer: {
    flex: 1,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15
  },

  annotationFill: {
    width: 25,
    height: 25,
    zIndex: 999
  }
});

export default styles;
