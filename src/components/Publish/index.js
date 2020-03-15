import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform
} from 'react-native';
import { CustomPicker } from "react-native-custom-picker";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from "@react-native-community/geolocation";
import CompassHeading from "react-native-compass-heading";
import Autocomplete from "react-native-autocomplete-input";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Creators as PublishActions } from "~/store/ducks/publish";
import { Creators as searchActions } from "~/store/ducks/search";

import CameraRollHeader from "~/components/CameraRollHeader";
import AutocompleteItem from "~/components/AutocompleteItem";
import MapMarker from "~/components/MapMarker";

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAw from "react-native-vector-icons/FontAwesome5";

import styles from "./styles";

import { colors, metrics } from "~/styles";
import api from "../../pages/Maps/Map3/api";

MapboxGL.setAccessToken(
  "sk.eyJ1Ijoiam9lbGJhbnphdHRvIiwiYSI6ImNrNDk2cmkzNzAwdHkzZHMyY2x2ZGh0eXYifQ.EeAfcaGLuGKv0FV90GT27g"
);

// export default function Publish({ navigation }) {
class Publish extends Component {
  state = {
    entity_id: null,
    preview: null,
    description: null,
    image: {},
    visible: false,
    mediaType: null,
    follow: true,
    search: "",
    hideResults: true,
    location: {
      latitude: 0,
      longitude: 0
    },
    scrollEnabled: true,
    mapCamera: null,
    mapView: null,
    categories: [],
    compassHeading: 0,
    userPosition: {},
    infoPoint: {},
    infoModalVisible: false,
    mapLoaded: false,
    filters: { all: true },
    posts: []
  };

  handleMapPan = async () => {
    try {
      const { mapLoaded, mapView, filters } = this.state;
      console.log('apiResponse');

      if (!mapLoaded) return;

      const [[lng1, lat1], [lng2, lat2]] = await mapView.getVisibleBounds();
      const zoom = await mapView.getZoom();

      let pointIds = Object.keys(filters)
        .filter(k => k !== "all" && filters[k] === true)
        .map(key => key.replace("point", ""))
        .join(",");

      if (filters.all === true)
        pointIds = Object.keys(filters)
          .filter(k => k !== "all")
          .map(key => key.replace("point", ""))
          .join(",");

      const apiResponse = await api.loadPosts(
        lat1,
        lng1,
        lat2,
        lng2,
        zoom,
        pointIds
      );

      console.log(apiResponse);


      this.setState({ posts: apiResponse.data.data })
    } catch (error) {
      return error;
    }
  };

  handleFunction = () => {

    Alert.alert(
      'Publish',
      'You will publish this now, are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => { } },
      ],
      { cancelable: false },
    );
  }

  renderAutocomplete = ({ item }) => {

    const { navigation } = this.props;

    return (
      <AutocompleteItem
        item={item}
        navigation={navigation}
        cleanField={() => this.setState({ search: "" })}
      />
    );
  };

  renderHeader = () => (
    <View style={styles.pickerHeaderContainer}>
      <Text style={styles.pickerHeaderText}>Categories</Text>
    </View>
  );

  renderItem = settings => {
    const { item, getLabel } = settings;

    return (
      <View style={styles.pickerItemContainer}>
        <Image source={{ uri: item.icon }} style={styles.pickerItemIcon} />
        <Text style={styles.pickerItemText}> {getLabel(item)} </Text>
      </View>
    );
  };

  renderField = () => {
    const { entity_id } = this.state;
    const { reportTypes } = this.props;

    if (entity_id === null) {
      // return (
      //   <View style={styles.pickerFieldContainer}>
      //     <Text style={styles.pickerFieldText}>Categories</Text>
      //     <View style={styles.pickerFieldIconContainer}>
      //       <IconAw name="chevron-down" style={styles.pickerFieldIcon} />
      //     </View>
      //   </View>
      // );
      return (
        <View style={styles.pickerFieldContainer}>
          <Text>Categories</Text>
          <View style={styles.pickerFieldIconContainer}>
            <IconAw name="chevron-down" style={styles.pickerFieldIcon} />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.pickerFieldContainer}>
        {reportTypes.map(category =>
          category.entity_id == entity_id ? (
            <View
              key={category.entity_id}
              style={styles.pickerFieldSelectedContainer}
            >
              <Image
                source={{ uri: category.icon }}
                style={styles.pickerItemIcon}
              />
              <Text >{category.name}</Text>
            </View>
          ) : null
        )}
        <View style={styles.pickerFieldIconContainer}>
          <IconAw name="chevron-down" style={styles.pickerFieldIcon} />
        </View>
      </View>
    );
  };

  handleBack = () => {
    const { navigation } = this.props;
    navigation.navigate('Feed');
  };

  loadSearch = async (search, lat, lng) => {
    const { loadSearch } = this.props;

    await loadSearch(search, lat, lng);
    this.setState({ search, hideResults: false });
  };

  handleUserPosition = async () => {
    Geolocation.watchPosition(
      position => this.setState({ userPosition: position.coords }),
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    const { data: response } = await api.loadCategories();
    this.setState({ categories: response.data });

    if (CompassHeading)
      CompassHeading.start(3, degree => {
        this.setState({ compassHeading: degree })
      });
  };

  openInfoModal = point => {
    this.setState({
      infoPoint: point,
      infoModalVisible: true,
    });

    this.mapCenterOnPoint(point);
  };

  mapCenterOnPoint = async point => {
    try {
      if (!mapLoaded) return;

      const goToCoords = [
        Number(point.point_type.longitude || point.longitude),
        Number(point.point_type.latitude || point.latitude)
      ];

      if (mapCamera) {
        await setFollow(false);

        await mapCamera.flyTo(goToCoords);
      } else {
        handleNavigation(point);
      }
    } catch (error) {
      return error;
    }
  };

  async componentWillMount() {
    const { navigation } = this.props;
    const { state: { params } } = navigation;

    if (params) {
      this.setState({
        image: params.response,
        preview: { uri: params.response.uri },
        mediaType: params.mediaType
      })
    }

    this.setState({
      description: "",
      entity_id: null,
      preview: null
    })

    const { loadReportTypes } = this.props;

    await loadReportTypes();
  }

  componentDidMount() {
    this.handleUserPosition();
  }

  render() {
    const { follow, description, search, hideResults, location, mapCamera, mapView, posts } = this.state
    const { navigation, reportTypes, searchResult } = this.props;
    const { state: { params } } = navigation;
    console.log(mapView);

    let result = [];

    if (typeof search !== null && String(search).length > 0)
      result = searchResult;

    return (
      <View style={styles.container} >
        <CameraRollHeader
          title="Publish"
          handleFunction={() => this.handleFunction()}
          handleBack={() => this.handleBack()}
        />
        <View style={styles.inputsContainer}>
          <View style={styles.inputView}>
            {params && <Image source={{ uri: params.response.uri }} style={styles.imagePreviewContainer} />}
            <TextInput
              style={styles.input}
              placeholder="Write a thing..."
              multiline={true}
              onChangeText={description => this.setState({ description })}
              value={description}
            >
            </TextInput>
          </View>

          <View style={styles.viewPickerModal}>
            <CustomPicker
              placeholder="Select your country"
              options={reportTypes}
              headerTemplate={this.renderHeader}
              getLabel={item => item.name}
              optionTemplate={this.renderItem}
              fieldTemplate={this.renderField}
              modalStyle={styles.customPickerModal}
              onValueChange={value => this.setState({ entity_id: value.entity_id })}
            />
          </View>

          <View style={styles.inputAutocomplete}>
            {String(search).length > 0 ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() =>
                  this.setState({ search: "", scrollEnabled: true })
                }
              >
                <IconAw name="times" style={styles.searchIcon} />
              </TouchableOpacity>
            ) : (
                <View style={styles.iconContainer}>
                  <IconAw name="search" style={styles.searchIcon} />
                </View>
              )}
            <Autocomplete
              data={result}
              onChangeText={search => {
                this.loadSearch(search, location.latitude, location.longitude);
                this.setState({ scrollEnabled: false });
              }}
              style={styles.searchInput}
              placeholder="Ex.: broken aircraft, airports, NY heliport..."
              value={search}
              renderItem={this.renderAutocomplete}
              listStyle={{
                maxHeight: metrics.height / 3,
                width: metrics.width / 1.2 + 19,
                left: Platform.OS == "ios" ? -40 : -50,
                borderColor: "white"
              }}
              keyExtractor={(item, i) => String(i)}
              inputContainerStyle={{
                borderColor: "white"
              }}
              hideResults={hideResults}
              onFocus={() =>
                String(search).length > 0
                  ? this.setState({
                    hideResults: false,
                    scrollEnabled: false
                  })
                  : this.setState({ scrollEnabled: true })
              }
              onBlur={() =>
                this.setState({ hideResults: true, scrollEnabled: true })
              }
            />
          </View>

          <View style={styles.mapView}>
            <MapboxGL.MapView
              rotateEnabled={true}
              showUserLocation={false}
              style={{ flex: 1 }}
              ref={mapView => this.mapView = mapView}
              styleURL={MapboxGL.StyleURL.Light}
              logoEnabled={false}
              onDidFinishLoadingMap={() => this.setState({ mapLoaded: true })}
              // onPress={cleanSearchAndCenterMap}
              onRegionDidChange={() => this.handleMapPan()}
            >
              <MapMarker posts={posts} openInfoModal={() => this.openInfoModal()} />
              <MapboxGL.UserLocation visible />
              <MapboxGL.Camera
                zoomLevel={12}
                followUserLocation={follow}
                followUserMode={follow ? "course" : "normal"}
                followHeading={1}
                ref={mapCamera => this.mapCamera = mapCamera}
              />
            </MapboxGL.MapView>
          </View>

        </View>
      </View >
    );
  }

}

Publish.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Icon name="publish" size={20} color={tintColor} />
}

const mapStateToProps = state => ({
  reportTypes: state.publish.reportTypes,
  clear: state.publish.clear,
  uri: state.publish.uri,
  loadButton: state.publish.loadButton,
  mute: state.publish.mute,
  loadMedia: state.publish.loadMedia,
  searchResult: state.search.searchResult
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...PublishActions, ...searchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Publish);