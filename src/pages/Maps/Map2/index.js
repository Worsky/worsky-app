import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import Autocomplete from "react-native-autocomplete-input";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as MapActions } from "~/store/ducks/maps";
import { Creators as SearchActions } from "~/store/ducks/search";

import ErrorPage from "~/components/ErrorPage";
import AutocompleteItem from "~/components/AutocompleteItem";

import { metrics, colors } from "~/styles";

import styles from "./styles";

import Geolocation from "@react-native-community/geolocation";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { accelerometer } from "react-native-sensors";
import { plane } from "~/assets";

MapboxGL.setAccessToken(
  "sk.eyJ1Ijoiam9lbGJhbnphdHRvIiwiYSI6ImNrNDk2cmkzNzAwdHkzZHMyY2x2ZGh0eXYifQ.EeAfcaGLuGKv0FV90GT27g"
);

class Maps2 extends Component {
  state = {
    region: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
      speed: 0,
      head: 0
    },
    headFixed: true,
    follow: true,
    userPosition: null,
    currentIndex: 0,
    firstRenderPosition: false,
    search: "",
    mapCenter: [],
    mapLoadded: false,
    accelerometer: {}
  };

  static propTypes = {
    posts: PropTypes.array.isRequired,
    faliure: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    loadPosts: PropTypes.func.isRequired
  };

  onRegionChange = async ({ latitude, longitude }) => {
    const { region } = this.state;

    await this.setState({
      region: {
        ...region,
        latitude,
        longitude
      }
    });
  };

  renderItem = ({ item, currentIndex, itemIndex }) => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PostDetails", { reportId: item.entity_id })
        }
        key={item.entity_id}
        style={[
          styles.carouselItemContainer,
          itemIndex == currentIndex
            ? { width: metrics.width / 2.8 }
            : { width: metrics.width / 3.2 }
        ]}
      >
        <Image
          source={{ uri: item.image }}
          style={[
            styles.carouselItemImage,
            itemIndex == currentIndex
              ? { width: metrics.width / 2.8, height: metrics.height / 6 }
              : { width: metrics.width / 3.2 }
          ]}
        />
        <Text style={styles.carouselItemCategory}>{item.point_type.name}</Text>
        <Text style={styles.carouselItemDescription}>
          {item.description.substring(0, 11)}...
        </Text>
      </TouchableOpacity>
    );
  };

  handleSearch = async data => {
    if (!this.state.mapLoaded) return;

    const { loadSearch } = this.props;
    const [longitude, latitude] = await this.mapView.getCenter();

    // await loadSearch(data, latitude, longitude);
    this.setState({ search: data });
  };

  handleMapPan = async () => {
    if (!this.state.mapLoaded) return;

    const { loadPosts } = this.props;
    const [[lng1, lat1], [lng2, lat2]] = await this.mapView.getVisibleBounds();
    const zoom = await this.mapView.getZoom();
    // await loadPosts(lat1, lng1, lat2, lng2, zoom);
  };

  centerMapOnMe = () => {
    let newFollow = !this.state.follow;
    this.setState(
      {
        follow: newFollow,
        mapCenter: [
          this.state.userPosition.longitude,
          this.state.userPosition.latitude
        ]
      },
      () => {
        if (newFollow) {
          this.mapCamera.flyTo([
            this.state.userPosition.longitude,
            this.state.userPosition.latitude
          ]);
        }
      }
    );
  };

  fixHead = () => {
    this.setState({
      headFixed: !this.state.headFixed
    });
  };

  renderAnnotations(point) {
    return (
      <MapboxGL.PointAnnotation
        key={point.entity_id + Date()}
        id={"post-" + point.entity_id}
        coordinate={[Number(point.longitude), Number(point.latitude)]}
        onSelected={() => {
          this.handleNavigation(point);
        }}
      >
        <View style={stylesMap.annotationContainer}>
          <Image
            source={{
              uri: point.point_type.icon
            }}
            resizeMode="contain"
            style={stylesMap.annotationFill}
          />
        </View>
        <MapboxGL.Callout title="Rocketseat House" />
      </MapboxGL.PointAnnotation>
    );
  }

  loadSearch = async (search, lat, lng) => {
    const { loadSearch } = this.props;
    await loadSearch(search, lat, lng);
    // this.setState({ search });
  };

  constructor(props) {
    super(props);

    accelerometer.subscribe(({ x, y, z, timestamp }) =>
      this.setState({ accelerometer: { x, y, z, timestamp } })
    );

    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization();
    }

    Geolocation.watchPosition(
      position => {
        let newState = { userPosition: position.coords };
        if (this.state.mapCenter.length === 0) {
          newState["mapCenter"] = [
            position.coords.longitude,
            position.coords.latitude
          ];
        }
        this.setState(newState, this.handleMapPan);
      },
      error => {
        Alert.alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  }

  handleNavigation = post => {
    const {
      point_type: { entity },
      entity_id: id
    } = post;
    const { navigation } = this.props;

    let destination;
    let params;

    switch (entity) {
      case "reports":
        destination = "PostDetails";
        params = {
          reportId: post.report_id,
          back: "Maps"
        };
        break;

      case "airports":
        destination = "Airport";
        params = { id };
        break;

      default:
        destination = null;
        params = null;
        break;
    }

    return destination && params
      ? navigation.navigate(destination, params)
      : false;
  };

  cleanField = () => {
    this.setState({ search: "" });
  };

  componentWillReceiveProps(nextProps) {
    const {
      region: { latitudeDelta, longitudeDelta },
      firstRenderPosition
    } = this.state;
    const { latitude, longitude } = nextProps.region;
    const currentRegion = {
      latitude,
      longitude,
      longitudeDelta,
      latitudeDelta
    };

    if (!firstRenderPosition) {
      this.setState({ firstRenderPosition: true });
    }
  }

  render() {
    const { faliure, posts, navigation, searchResult } = this.props;
    const {
      region,
      search,
      userPosition,
      mapCenter,
      follow,
      headFixed
    } = this.state;

    let result = [];
    let hasSearch = typeof search !== null && search.length > 0;
    if (hasSearch) result = searchResult;

    if (faliure) return <ErrorPage />;

    return (
      <View style={styles.container}>
        {userPosition && (
          <MapboxGL.MapView
            style={stylesMap.container}
            onDidFinishLoadingMap={() => {
              this.setState({ mapLoaded: true }, this.handleMapPan);
            }}
            rotateEnabled={false}
            compassEnabled
            animated
            ref={map => (this.mapView = map)}
            showUserLocation
            styleURL={MapboxGL.StyleURL.Light}
            logoEnabled={false}
            compassEnabled={true}
            onRegionDidChange={() => {
              this.handleMapPan();
            }}
          >
            {posts.map(post => this.renderAnnotations(post))}
            <MapboxGL.UserLocation visible />
            <MapboxGL.Camera
              zoomLevel={12}
              followUserLocation={follow || true}
              followUserMode="course"
              ref={map => (this.mapCamera = map)}
            />
          </MapboxGL.MapView>
        )}
        <View style={styles.searchContainer}>
          <Autocomplete
            data={result}
            onChangeText={search => {
              this.setState({ search });
              if (search.length < 3) return;
              this.handleSearch(search);
            }}
            value={search}
            style={styles.autocomplete}
            placeholder="Search by location"
            renderItem={({ item }) => (
              <AutocompleteItem
                item={item}
                navigation={navigation}
                cleanField={this.cleanField.bind(this)}
              />
            )}
            listStyle={{
              maxHeight: metrics.height / 1.6,
              borderColor: "white",
              width: metrics.width / 1.1
            }}
            keyExtractor={(item, i) => String(i)}
            inputContainerStyle={{ borderColor: "white" }}
            keyboardShouldPersistTaps="always"
          />
          {search.length > 0 ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => this.cleanField()}
            >
              <Icon name="times" style={styles.searchIcon} />
            </TouchableOpacity>
          ) : null}
        </View>
        {userPosition && (
          <>
            <Image
              source={plane}
              style={styles.planeOnMap}
              height={64}
              width={64}
            />
            {/* <TouchableOpacity
              style={styles.myHeadButton}
              onPress={() => this.fixHead()}
            >
              <Icon
                name="compass"
                size={22}
                color={headFixed ? "black" : "#bbb"}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.myPositionButton}
              onPress={() => this.centerMapOnMe()}
            >
              <Icon
                name="crosshairs"
                size={22}
                color={follow ? "black" : "#bbb"}
              />
            </TouchableOpacity>
            <View style={styles.instruments}>
              <Text style={styles.instrumentItem}>
                {Math.round(
                  (userPosition.speed < 0 ? 0 : userPosition.speed) * 1.94384
                )}{" "}
                kt
              </Text>
              <Text style={styles.instrumentItem}>
                {Math.round(this.state.accelerometer.x || 0)}º
                {JSON.stringify(this.state.accelerometer)}
              </Text>
              <Text style={styles.instrumentItem}>
                {Math.round(userPosition.altitude * 3.28084)} ft
              </Text>
            </View>
          </>
        )}
      </View>
    );
  }
}

const stylesMap = StyleSheet.create({
  container: {
    flex: 1
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
    borderRadius: 15
  },
  annotationFill: {
    width: 30,
    height: 30
    // borderRadius: 15,
    // backgroundColor: "#7159C1"
    // transform: [{ scale: 0.8 }]
  }
});

const mapStateToProps = state => ({
  region: state.maps.region,
  posts: state.maps.posts,
  faliure: state.maps.faliure,
  loading: state.maps.loading,
  searchResult: state.search.searchResult
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...MapActions, ...SearchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Maps2);
