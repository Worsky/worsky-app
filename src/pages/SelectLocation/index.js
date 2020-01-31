import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
// import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome5";
import Autocomplete from "react-native-autocomplete-input";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as PublishTypes } from "~/store/ducks/publish";
import { Creators as searchActions } from "~/store/ducks/search";

import AutocompleteItem from "~/components/AutocompleteItem";

import MapStyle from "~/config/MapStyle";
import { metrics, colors } from "~/styles";

import styles from "./styles";

class SelectLocation extends Component {
  state = {
    region: {
      longitudeDelta: 63.28128419816494,
      latitudeDelta: 90.3343088643281,
      longitude: -58.590280674397945,
      latitude: -24.560743966104944
    },
    regionFixed: {},
    handlePoint: false,
    image: {},
    reportTypeId: null,
    userId: 1,
    description: this.props.navigation.getParam("description"),
    media_url: this.props.navigation.getParam("media_url"),
    entity_id: this.props.navigation.getParam("entity_id"),
    showList: false,
    search: "Custom",
    pointSelected: false
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired
    }).isRequired,
    publishNow: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    faliure: PropTypes.bool.isRequired
  };

  onRegionChange = region => this.setState({ region });

  handlePublish = async () => {
    const { publishNow } = this.props;
    const {
      description,
      media_url,
      entity_id,
      userId,
      region,
      regionFixed
    } = this.state;

    await publishNow(
      regionFixed.latitude || region.latitude,
      regionFixed.longitude || region.longitude,
      description,
      media_url,
      entity_id,
      userId
    );
  };

  cleanField = () => this.setState({ search: "" });

  renderAutocompleteList = item => {
    const { showList } = this.state;

    if (showList)
      return (
        <AutocompleteItem
          item={item}
          cleanField={this.cleanField.bind(this)}
          callbackCoordinate={this.callbackCoordinate.bind(this)}
        />
      );

    return <View />;
  };

  loadSearch = async (search, lat, lng) => {
    const { loadSearch } = this.props;
    await loadSearch(search, lat, lng);
    this.setState({ search, showList: true });
  };

  callbackCoordinate = (latitude, longitude, name, clean = false) => {
    const currentPosition = {
      longitudeDelta: 0.009885616600513458,
      latitudeDelta: 0.010114622243776239,
      latitude,
      longitude
    };

    let updateState = {
      region: currentPosition,
      handlePoint: true
    };

    if (clean) {
      updateState = {
        region: currentPosition,
        handlePoint: true,
        search: name,
        showList: false,
        pointSelected: true
      };
      this.searchInput.blur();
    }

    this.setState(updateState);

    this.mapView.animateToRegion(currentPosition);
  };

  onRegionChangeComplete = () => {
    const { pointSelected, search } = this.state;

    if (pointSelected) this.setState({ pointSelected: false });
    else if (search != "") this.setState({ search: "Custom" });
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position =>
      this.callbackCoordinate(
        position.coords.latitude,
        position.coords.longitude
      )
    );
  }

  render() {
    const {
      region,
      handlePoint,
      regionFixed,
      search,
      region: { latitude, longitude }
    } = this.state;
    const { loading, faliure, searchResult } = this.props;

    let markerColor = colors.worSky.danger;
    let markerPosition = region;
    let markerUpdate = region;

    if (Object.keys(regionFixed).length > 0) {
      markerColor = colors.worSky.blue;
      markerPosition = regionFixed;
      markerUpdate = {};
    }

    let result = [];
    if (typeof search !== null && search.length > 0) result = searchResult;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Location</Text>
        {/* <MapView
          style={styles.mapContainer}
          customMapStyle={MapStyle}
          initialRegion={region}
          ref={map => (this.mapView = map)}
          showsPointsOfInterest={false}
          showBuilding={false}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {handlePoint ? (
            <Marker
              coordinate={markerPosition}
              onPress={() =>
                this.setState({
                  regionFixed: markerUpdate
                })
              }
              pinColor={markerColor}
            />
          ) : null}
        </MapView> */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => (search.length > 0 ? this.cleanField() : false)}
            style={styles.iconContainer}
          >
            <Icon
              name={search.length > 0 ? "times" : "map-marked-alt"}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
          <Autocomplete
            data={result}
            onChangeText={search =>
              this.loadSearch(search, latitude, longitude)
            }
            style={styles.searchInput}
            placeholder="Search for some location..."
            value={search}
            renderItem={({ item }) => this.renderAutocompleteList(item)}
            listStyle={{
              maxHeight: metrics.height / 2,
              width: metrics.width / 1.2 + 19,
              borderColor: "white",
              position: "absolute",
              zIndex: 999
            }}
            keyExtractor={(item, i) => String(i)}
            inputContainerStyle={{
              borderColor: "white"
            }}
            keyboardShouldPersistTaps="always"
            ref={input => {
              this.searchInput = input;
            }}
          />
        </View>
        {faliure ? (
          <Text style={{ color: colors.worSky.danger }}>
            Something is wrong with publish action. Try again!
          </Text>
        ) : null}
        <View style={styles.buttomContainer}>
          {loading ? (
            <TouchableOpacity
              style={styles.submitButtom}
              onPress={() => {}}
              activeOpacity={1}
            >
              <ActivityIndicator size="small" color={colors.worSky.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.submitButtom}
              onPress={this.handlePublish}
            >
              <Text style={styles.buttomLabel}> Publish </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.publish.loading,
  faliure: state.publish.faliure,
  searchResult: state.search.searchResult
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...PublishTypes, ...searchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocation);
