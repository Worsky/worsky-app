import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  controlsContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  flashButton: {
    width: 30,
    height: 30,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  capture: {
    alignSelf: "center",
    borderWidth: 18,
    borderColor: "#e1e4e8",
    borderRadius: 100
  },
  timer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonIcon: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 100
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
