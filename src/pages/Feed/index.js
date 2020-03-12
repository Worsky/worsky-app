import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  BackHandler,
  Platform,
  Image,
  TouchableOpacity,
  PermissionsAndroid
} from "react-native";
import PropTypes from "prop-types";
import Toast from "react-native-easy-toast";
import Icon from "react-native-vector-icons/FontAwesome";
import Autocomplete from "react-native-autocomplete-input";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as feedActions } from "~/store/ducks/feed";
import { Creators as categoriesActions } from "~/store/ducks/categories";
import { Creators as searchActions } from "~/store/ducks/search";

import { textLogo } from "~/assets";

import FeedCategories from "~/components/FeedCategories";
import ErrorPage from "~/components/ErrorPage";
import LoadingPage from "~/components/LoadingPage";
import AutocompleteItem from "~/components/AutocompleteItem";
import FeedHeader from "~/components/FeedHeader";
import FeedItem from "~/components/FeedItem";

import { colors, metrics } from "~/styles";

import styles from "./styles";

class Feed extends Component {
  state = {
    refreshing: false,
    location: {
      latitude: 0,
      longitude: 0
    },
    scrollEnabled: true,
    search: "",
    hideResults: true,
    keyboardPersist: "never",
    scrollEnabled: true
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    faliure: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    searchResult: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    showList: PropTypes.bool,
    loadPosts: PropTypes.func,
    loadingPosts: PropTypes.bool
  };

  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      payload =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  async componentDidMount() {
    const { loadPosts, loadCategories } = this.props;

    await loadCategories();

    this._navListener = await this.props.navigation.addListener(
      "didFocus",
      () => {
        Platform.OS != "ios"
          ? StatusBar.setBackgroundColor(colors.worSky.blue)
          : null;
        StatusBar.setBarStyle("light-content");
        navigator.geolocation.getCurrentPosition(position =>
          this.setState({
            location: {
              ...this.state.location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          })
        );
        loadPosts();
      }
    );

    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Read Store Permission",
        message: "This app needs access to your files",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Write Store Permission",
        message: "This app needs use your local storage",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
  }

  onBackButtonPressAndroid = () => true;

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();

    this._navListener.remove();
  }

  loadSearch = async (search, lat, lng) => {
    const { loadSearch } = this.props;
    await loadSearch(search, lat, lng);
    this.setState({ search, hideResults: false });
  };

  _keyExtractor = (item, index) => String(item.report_id);

  feedItem = ({ item }) => (
    <FeedItem
      post={item}
      navigation={this.props.navigation}
      showToast={this.showToast.bind(this)}
    />
  );

  _refreshAction = async () => {
    this.setState({ refreshing: true });

    const { loadPosts } = this.props;

    await loadPosts();

    this.setState({ refreshing: false });
  };

  _refreshControl = refreshing => (
    <RefreshControl refreshing={refreshing} onRefresh={this._refreshAction} />
  );

  showToast = (message = "Your report has been sent successfully!") =>
    this.refs.toast.show(message, 1000);

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

  render() {
    const {
      loadingPosts,
      posts,
      faliure,
      navigation,
      loading,
      categories,
      searchResult
    } = this.props;
    const {
      refreshing,
      search,
      hideResults,
      location,
      scrollEnabled
    } = this.state;

    let result = [];

    if (typeof search !== null && String(search).length > 0)
      result = searchResult;

    if (navigation.getParam("toastMessage")) {
      this.showToast(navigation.getParam("toastMessage"));
      navigation.setParams({ toastMessage: null });
    }

    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={scrollEnabled}
      >
        <Toast ref="toast" />

        <ScrollView
          style={styles.headerContainer}
          scrollEnabled={!scrollEnabled}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.blueHeader}>
            <Image source={textLogo} style={styles.textLogo} />
          </View>
          <View style={styles.searchContainer}>
            {String(search).length > 0 ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() =>
                  this.setState({ search: "", scrollEnabled: true })
                }
              >
                <Icon name="times" style={styles.searchIcon} />
              </TouchableOpacity>
            ) : (
                <View style={styles.iconContainer}>
                  <Icon name="search" style={styles.searchIcon} />
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
          <View style={styles.categoriesContainer}>
            <Text style={styles.helpText}>What can we help you find?</Text>
            <View style={styles.categoriesCards}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.initialSpace} />
                {loading ? (
                  <LoadingPage size="small" />
                ) : faliure ? (
                  <ErrorPage
                    color="grey"
                    size={14}
                    text="Something went wrong, refresh please."
                  />
                ) : (
                      categories.map(category => (
                        <FeedCategories
                          key={category.point_type_id}
                          category={{
                            id: category.point_type_id,
                            name: category.name,
                            image: category.icon
                          }}
                          location={location}
                        />
                      ))
                    )}
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <View style={styles.recentContainer}>
          <Text style={styles.recentsText}>Recents</Text>
        </View>
        {loadingPosts ? (
          <ActivityIndicator size="large" color={colors.worSky.blue} />
        ) : faliure ? (
          <Text style={styles.internalErrorText}>
            Something went wrong, refresh please.
          </Text>
        ) : (
              <FlatList
                data={posts}
                keyExtractor={this._keyExtractor}
                renderItem={this.feedItem}
                onRefresh={this.refreshSimulator}
                refreshing={refreshing}
              />
            )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loadingPosts: state.feed.loadingPosts,
  posts: state.feed.posts,
  faliure: state.feed.loadFaliure,
  loading: state.categories.loadingCategories,
  faliureCategory: state.categories.loadCategoriesFaliure,
  categories: state.categories.categories,
  searchResult: state.search.searchResult
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...feedActions, ...categoriesActions, ...searchActions },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
