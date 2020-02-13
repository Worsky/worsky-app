import { StyleSheet } from "react-native";
import { metrics } from "~/styles";

const styles = StyleSheet.create({
  instrumentItem: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 22,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: metrics.baseMargin / 1.2,
    marginHorizontal: metrics.baseMargin / 2,
    textAlign: "center",
    lineHeight: 40,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export default styles;
