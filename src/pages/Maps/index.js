import React, { Component } from "react";
import {
  StatusBar,
  Platform,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";

import { colors } from "~/styles";

import MapJoel from "./Map1";
import MapBruno from "./Map3";

class Maps extends Component {
  state = {
    witchMap: ""
  };

  componentDidMount() {
    const { navigation } = this.props;

    this._navListener = navigation.addListener("didFocus", () => {
      Platform.OS != "ios"
        ? StatusBar.setBackgroundColor(colors.worSky.white)
        : null;
      StatusBar.setBarStyle("dark-content");
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    const { navigation } = this.props;
    return (
      <>
        {!!!this.state.witchMap ? (
          <>
            <TouchableOpacity
              onPress={() => this.setState({ witchMap: "joel" })}
              style={styles.button}
            >
              <Text style={{ color: "white" }}>Joel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ witchMap: "bruno" })}
              style={styles.button}
            >
              <Text style={{ color: "white" }}>Bruno</Text>
            </TouchableOpacity>
          </>
        ) : this.state.witchMap == "joel" ? (
          <MapJoel navigation={navigation} />
        ) : (
          <MapBruno navigation={navigation} />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    marginBottom: 10,
    width: 200,
    paddingVertical: 25,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Maps;
