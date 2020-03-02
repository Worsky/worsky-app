import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import Autocomplete from "react-native-autocomplete-input";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as categoriesActions } from "~/store/ducks/categories";
import { Creators as searchActions } from "~/store/ducks/search";

import { textLogo } from "~/assets";

import FeedCategories from "~/components/FeedCategories";
import ErrorPage from "~/components/ErrorPage";
import LoadingPage from "~/components/LoadingPage";
import AutocompleteItem from "~/components/AutocompleteItem";

import { metrics } from "~/styles";

import styles from "./styles";

class FeedHeader extends Component {
  state = {
    search: "",
    showListState: true
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    faliure: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired,
    searchResult: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    scrollEnabled: PropTypes.func.isRequired,
    showList: PropTypes.bool
  };

  loadSearch = async (search, lat, lng) => {
    const { loadSearch } = this.props;
    await loadSearch(search, lat, lng);
    this.setState({ search, showListState: true });
  };

  cleanField = () => this.setState({ search: "" });

  renderAutocompleteList = item => {
    const { showListState } = this.state;
    const { navigation, showList } = this.props;

    if (showListState || showList)
      return (
        <AutocompleteItem
          item={item}
          navigation={navigation}
          cleanField={this.cleanField.bind(this)}
        />
      );

    return <View />;
  };

  async componentDidMount() {
    const { loadCategories } = this.props;

    await loadCategories();
  }

  render() {
    const {
      loading,
      faliure,
      categories,
      location,
      searchResult,
      scrollEnabled,
      showList
    } = this.props;
    const { search, showListState } = this.state;

    let result = [];
    if (typeof search !== null && search.length > 0) result = searchResult;

    return (
      <View style={styles.container}>
        <View style={styles.blueHeader}>
          <Image source={textLogo} style={styles.textLogo} />
        </View>
        <View style={styles.searchContainer}>
          {search.length > 0 ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => this.cleanField()}
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
            onChangeText={search =>
              this.loadSearch(search, location.latitude, location.longitude)
            }
            style={styles.searchInput}
            placeholder="Ex.: broken aircraft, airports, NY heliport..."
            value={search}
            renderItem={({ item }) => this.renderAutocompleteList(item)}
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
            // onStartShouldSetResponderCapture={() => scrollEnabled()}
            // hideResults={!showListState}
            onFocus={() =>
              search.length > 0 ? this.setState({ showListState: true }) : null
            }
            onBlur={() => this.setState({ showListState: false })}
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.categories.loadingCategories,
  faliure: state.categories.loadCategoriesFaliure,
  categories: state.categories.categories,
  searchResult: state.search.searchResult
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...categoriesActions, ...searchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FeedHeader);
