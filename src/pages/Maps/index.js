import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as MapTypes } from "~/store/ducks/maps";

import { colors } from "~/styles";

import Map from "./Map2";

class Maps extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      addListener: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    faliure: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired
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
    return <Map navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  loading: state.maps.loading,
  faliure: state.maps.faliure,
  posts: state.maps.posts
});

const mapDispatchToProps = dispatch => bindActionCreators(MapTypes, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
