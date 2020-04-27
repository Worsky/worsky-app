import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";

import { colors } from "~/styles";

import Map from "./Map3";

class Maps extends Component {
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
    return <Map navigation={navigation} />;
  }
}

// const mapStateToProps = state => ({
//   loading: state.maps.loading,
//   faliure: state.maps.faliure,
//   posts: state.maps.posts
// });

// const mapDispatchToProps = dispatch => bindActionCreators(MapTypes, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Maps);

export default Maps;
