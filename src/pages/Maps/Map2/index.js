import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  Switch
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import Autocomplete from "react-native-autocomplete-input";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as MapActions } from "~/store/ducks/maps";
import { Creators as SearchActions } from "~/store/ducks/search";
import { Creators as CategoriesActions } from "~/store/ducks/categories";

import ErrorPage from "~/components/ErrorPage";
import AutocompleteItem from "~/components/AutocompleteItem";

import { metrics, colors } from "~/styles";
import styles from "./styles";

import {
  magnetometer as Magnetometer,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";
import Geolocation from "@react-native-community/geolocation";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { plane } from "~/assets";
import CustomModal from "~/components/CustomModal";

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
    accelerometer: {},
    magnetometer: 0,
    filterModalVisible: false,
    infoModalVisible: false,
    infoPoint: {},
    filters: {}
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

    await loadSearch(data, latitude, longitude);
    this.setState({ search: data });
  };

  handleMapPan = async () => {
    if (!this.state.mapLoaded) return;

    const { loadPosts } = this.props;
    const { filters } = this.state;
    const [[lng1, lat1], [lng2, lat2]] = await this.mapView.getVisibleBounds();
    const zoom = await this.mapView.getZoom();

    let pointIds = "";

    if (filters.all === true) {
      pointIds = Object.keys(filters)
        .filter(k => k !== "all" && filters[k] === true)
        .map(key => {
          return key.replace("point", "");
        })
        .join(",");
    }

    await loadPosts(lat1, lng1, lat2, lng2, zoom, pointIds);
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

  openInfoModal(point) {
    this.setState({ infoPoint: point, infoModalVisible: true });
  }

  renderAnnotations(point) {
    return (
      <MapboxGL.PointAnnotation
        key={point.entity_id + Date()}
        id={"post-" + point.entity_id}
        coordinate={[Number(point.longitude), Number(point.latitude)]}
        title={point.title}
        snippet={
          point.description.substring(0, 35) + "... [Veja mais detalhes]"
        }
        onSelected={() => {
          this.openInfoModal(point);
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
      </MapboxGL.PointAnnotation>
    );
  }

  loadSearch = async (search, lat, lng) => {
    const { loadSearch } = this.props;
    await loadSearch(search, lat, lng);
    // this.setState({ search });
  };

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
    if (
      nextProps.categories !== null &&
      (this.props.categories === null || this.props.categories === undefined)
    ) {
      let filters = { all: true };
      for (cat of nextProps.categories) {
        filters[`point${cat.point_type_id}`] = true;
      }
      this.setState({ filters });
    }
  }

  async componentDidMount() {
    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization();
    } else {
      // Geolocation.requestAndroidLocationPermissions();
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
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    if (Magnetometer) {
      setUpdateIntervalForType(SensorTypes.magnetometer, 400); // defaults to 100ms
      this._subscription = Magnetometer.subscribe(
        data => {
          console.log({ data });
          this.setState({ magnetometer: this._degree(this._angle(data)) });
        },
        error => {
          console.log("The sensor is not available", { error });
        }
      );
    }

    const { loadCategories } = this.props;
    await loadCategories();
  }

  _angle = magnetometer => {
    if (magnetometer) {
      let { x, y, z } = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }

    return Math.round(angle);
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  _degree = magnetometer => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  componentWillUnmount() {
    Geolocation.stopObserving();

    this._subscription && this._subscription.stop();
    this._subscription = null;
  }

  toggleFilter(id, value) {
    let { filters } = this.state;
    const { categories } = this.props;

    if (id === "all") {
      filters["all"] = value;
      for (cat of categories) {
        filters[`point${cat.point_type_id}`] = value;
      }
    } else {
      filters[`point${id}`] = value;

      const keys = Object.keys(filters).filter(k => k !== "all");
      if (keys.map(k => filters[k]).includes(false)) {
        filters["all"] = false;
      } else {
        filters["all"] = true;
      }
    }

    this.setState({ filters }, () => {
      setTimeout(this.handleMapPan, 500);
    });
  }

  mapCenterOnPoint = point => {
    const goToCoords = [
      Number(point.longitude || -49.06056),
      Number(point.latitude || -22.31472)
    ];

    if (this.mapCamera) {
      this.mapCamera.setCamera({
        centerCoordinate: goToCoords,
        zoomLevel: 12
      });
    } else {
      this.handleNavigation(point);
    }
  };

  render() {
    const { faliure, posts, navigation, searchResult, categories } = this.props;
    const {
      search,
      userPosition,
      follow,
      magnetometer,
      filterModalVisible,
      infoModalVisible,
      filters,
      infoPoint
    } = this.state;

    let result = [];
    let hasSearch = typeof search !== null && search.length > 0;
    if (hasSearch) result = searchResult;

    // if (faliure) return <ErrorPage />;

    return (
      <View style={styles.container}>
        <CustomModal
          close={false}
          visible={infoModalVisible}
          changeVisibility={() => this.setState({ infoModalVisible: false })}
          maxHeight={100}
          content={
            <>
              <Text>{infoPoint.name}</Text>
              <Text>{infoPoint.description}</Text>
              <TouchableOpacity
                style={[styles.moreDetailButton, { marginTop: 20 }]}
                onPress={() => {
                  this.setState({ infoModalVisible: false }, () => {
                    this.handleNavigation(infoPoint);
                  });
                }}
              >
                <Text style={styles.moreDetailButtonText}>More details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.moreDetailButton,
                  { backgroundColor: "#ddd", marginTop: 8 }
                ]}
                onPress={() => this.setState({ infoModalVisible: false })}
              >
                <Text style={[styles.moreDetailButtonText, { color: "#333" }]}>
                  Close
                </Text>
              </TouchableOpacity>
            </>
          }
        />
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
            onUserLocationUpdate={() => {
              console.log({ map: this.mapView });
            }}
          >
            {posts.map(post => this.renderAnnotations(post))}
            <MapboxGL.UserLocation visible />
            <MapboxGL.Camera
              zoomLevel={12}
              followHeading={1}
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
            clearButtonMode="while-editing"
            value={search}
            style={styles.autocomplete}
            placeholder="Search by location"
            renderItem={({ item }) => (
              <AutocompleteItem
                item={item}
                handleClick={this.mapCenterOnPoint}
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

          <TouchableOpacity
            style={styles.filterIconContainer}
            onPress={() => this.setState({ filterModalVisible: true })}
          >
            <Icon name="filter" style={styles.filterIcon} size={24} />
          </TouchableOpacity>
          <CustomModal
            visible={filterModalVisible}
            changeVisibility={() =>
              this.setState({ filterModalVisible: false })
            }
            content={
              <View style={styles.checkboxForm}>
                <Text>Show on map these point types: </Text>
                <View style={styles.checkboxField}>
                  <Switch
                    value={
                      filters[`all`] == null || filters[`all`] == undefined
                        ? true
                        : filters[`all`]
                    }
                    onValueChange={value => this.toggleFilter("all", value)}
                  />
                  <Text style={styles.filterLabel}>All types</Text>
                </View>
                {categories.map((item, index) => (
                  <View key={`category${index}`} style={styles.checkboxField}>
                    <Switch
                      value={
                        filters[`point${item.point_type_id}`] == null ||
                        filters[`point${item.point_type_id}`] == undefined
                          ? true
                          : filters[`point${item.point_type_id}`]
                      }
                      onValueChange={value =>
                        this.toggleFilter(item.point_type_id, value)
                      }
                    />
                    <Text style={styles.filterLabel}>{item.name}</Text>
                  </View>
                ))}
              </View>
            }
            close={true}
          />
        </View>
        {userPosition && (
          <>
            <Image
              source={plane}
              style={styles.planeOnMap}
              height={64}
              width={64}
            />
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
                {Math.round(magnetometer || 0)}º
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
    borderRadius: 15
  },
  annotationFill: {
    width: 30,
    height: 30
  }
});

const mapStateToProps = state => ({
  region: state.maps.region,
  posts: state.maps.posts,
  faliure: state.maps.faliure,
  loading: state.maps.loading,
  searchResult: state.search.searchResult,
  categories: state.categories.categories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...MapActions, ...SearchActions, ...CategoriesActions },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Maps2);
