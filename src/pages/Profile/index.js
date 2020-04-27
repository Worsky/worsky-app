import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TabView, TabBar } from "react-native-tab-view";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as ProfileActions } from "~/store/ducks/profile";

import LoadingPage from "~/components/LoadingPage";
import ErrorPage from "~components/ErrorPage";

import { deleteToken } from "~/services/asyncStorageToken";
import { metrics, colors } from "~/styles";

import User from "./User";
import Worsky from "./Worsky";
import styles from "./styles";

class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    faliure: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    loadProfile: PropTypes.func.isRequired
  };

  state = {
    index: 0,
    routes: [
      {
        key: "first",
        title: "Profile",
        navigation: this.props.navigation
      },
      { key: "second", title: "About Us" }
    ]
  };

  logOut = async () => {
    const { navigation } = this.props;
    await deleteToken();

    navigation.navigate("Login");
  };

  tabBarRendered = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.worSky.blue }}
      style={{
        backgroundColor: colors.worSky.white
      }}
      tabStyle={{
        padding: 0,
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.2)"
      }}
      labelStyle={{ color: "black", fontSize: 10, fontWeight: "bold" }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={[
            { fontSize: 12 },
            focused
              ? { color: colors.worSky.blue }
              : { color: colors.worSky.black }
          ]}
        >
          {route.title.toUpperCase()}
        </Text>
      )}
    />
  );

  renderEachScene = ({ route, jumpTo }) => {
    const { profile } = this.props;

    switch (route.title) {
      case "Profile":
        return <User navigation={route.navigation} profile={profile} />;

      case "About Us":
        return <Worsky />;

      default:
        return false;
    }
  };

  async componentDidMount() {
    const { loadProfile, navigation } = this.props;

    this._navListener = await navigation.addListener("didFocus", () => {
      Platform.OS != "ios"
        ? StatusBar.setBackgroundColor(colors.worSky.white)
        : null;
      StatusBar.setBarStyle("dark-content");
      loadProfile();
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    const { faliure, loading, profile, navigation } = this.props;

    if (loading) return <LoadingPage />;

    let showAvatar = { uri: profile.avatar };

    if (profile.avatar == null) showAvatar = null;

    if (faliure)
      return (
        <View style={styles.headerContainer}>
          <View style={styles.headerIconContainer}>
            <TouchableOpacity
              onPress={this.logOut}
              style={styles.headerIconButtom}
            >
              <Icon name="sign-out-alt" style={styles.headerIcon} />
            </TouchableOpacity>
          </View>
          <ErrorPage />
        </View>
      );

    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerIconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={[styles.headerIconButtom, { width: 80 }]}
            >
              <Text>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.logOut}
              style={styles.headerIconButtom}
            >
              <Icon name="sign-out-alt" style={styles.headerIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerImageContainer}>
            {showAvatar == null ? (
              <Icon
                name="user-tie"
                size={90}
                color="black"
                backgroundColor="orange"
              />
            ) : (
              <Image source={showAvatar} style={styles.headerImage} />
            )}
          </View>
        </View>
        <TabView
          navigationState={this.state}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: metrics.width, height: 0 }}
          renderTabBar={props => this.tabBarRendered(props)}
          swipeEnabled={true}
          renderScene={this.renderEachScene}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.profile.loading,
  faliure: state.profile.faliure,
  profile: state.profile.profile,
  avatar: state.profile.avatarPreview
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ProfileActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
