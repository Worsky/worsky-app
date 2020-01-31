import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as AirportActions } from "~/store/ducks/airport";

import Slider from "~/components/Slider";
import ErrorPage from "~/components/ErrorPage";
import LoadingPage from "~/components/LoadingPage";

import { colors, metrics } from "~/styles";

import About from "./About";
import Location from "./Location";
import Reports from "./Reports";
import OthersTabs from "./OthersTabs";
import styles from "./styles";
import { StackRouter } from "react-navigation";

class Airport extends Component {
  static propTypes = {
    loadInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    airport: PropTypes.object,
    navigation: PropTypes.shape().isRequired,
    loadFaliure: PropTypes.bool.isRequired,
    follow: PropTypes.any.isRequired,
    followed: PropTypes.bool.isRequired,
    onIndexChange: PropTypes.func.isRequired,
    allAirport: PropTypes.object
  };

  tabBarRendered = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.worSky.blue }}
      style={{
        backgroundColor: colors.worSky.white
      }}
      tabStyle={{ padding: 0 }}
      labelStyle={{ color: "black", fontSize: 10, fontWeight: "bold" }}
      scrollEnabled={true}
    />
  );

  renderEachScene = ({ route, jumpTo }) => {
    const { airport, navigation } = this.props;
    const about = {
      description: airport.rmk,
      address: airport.address,
      tel: airport.phone,
      websiteUrl: airport.website
    };
    const location = {
      latitude: airport.latitude,
      longitude: airport.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    switch (route.title) {
      case "About":
        return <About data={about} />;

      case "Location":
        return <Location data={location} />;

      case "Reports":
        return <Reports data={airport.reports} navigation={navigation} />;

      default:
        return route.content.map(data => <OthersTabs data={data} />);
    }
  };

  async componentWillMount() {
    const { loadInfo, navigation } = this.props;
    const id = navigation.getParam("id");

    await loadInfo(id);
  }

  render() {
    const {
      loading,
      airport,
      loadFaliure,
      follow,
      followed,
      onIndexChange,
      allAirport
    } = this.props;

    if (loading) return <LoadingPage />;

    if (loadFaliure) return <ErrorPage />;

    return (
      <ScrollView style={styles.container}>
        <StatusBar
          backgroundColor={colors.worSky.white}
          barStyle="dark-content"
        />
        <Slider images={airport.images} />
        <View style={styles.titleContainer}>
          <View style={styles.titleFollowContainer}>
            <Text style={styles.titleAirport}>{airport.name}</Text>
            <TouchableOpacity
              onPress={() => follow(1)}
              style={styles.titleFollowButtom}
            >
              <Text style={styles.titleFollowTextButtom}>
                {followed ? "Followed" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleInfoContainer}>
            <View style={styles.titleInfoLocationContainer}>
              <Image
                source={{ uri: airport.flag_file }}
                style={styles.titleInfoIconLocation}
              />
              <Text style={styles.titleInfoLocation}>
                {airport.city}, {airport.country}
              </Text>
            </View>
            <View style={styles.titleInfoDataContainer}>
              <View style={styles.titleInfoDataBlock}>
                <Text style={styles.titleInfoData}>{airport.followers}</Text>
                <Text style={styles.titleInfoDataLabel}>Followers</Text>
              </View>
              <View style={styles.titleInfoDataBlock}>
                <Text style={styles.titleInfoData}>
                  {airport.reports.length}
                </Text>
                <Text style={styles.titleInfoDataLabel}>Reports</Text>
              </View>
            </View>
          </View>
        </View>
        <TabView
          navigationState={allAirport}
          onIndexChange={index => onIndexChange(index)}
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
  loading: state.airport.loading,
  airport: state.airport.airport,
  loadFaliure: state.airport.loadFaliure,
  followed: state.airport.followed,
  allAirport: state.airport
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AirportActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Airport);
