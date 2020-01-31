import React, { Component } from "react";
import { ScrollView, Text, StatusBar, FlatList, View } from "react-native";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as categoriesActions } from "~/store/ducks/categories";

import CategoryItem from "~/components/CategoryItem";
import ErrorPage from "~/components/ErrorPage";
import LoadingPage from "~/components/LoadingPage";

import { post } from "~/assets";
import { colors } from "~/styles";

import styles from "./styles";

class Category extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired
    }).isRequired
  };

  async componentWillMount() {
    const { navigation, loadList } = this.props;
    const { id } = navigation.getParam("category");
    const location = navigation.getParam("location");

    await loadList(id, location);
  }

  renderListItem = ({ item }) => <CategoryItem category={item} />;

  render() {
    const { navigation, loading, faliure, list } = this.props;
    const { name } = navigation.getParam("category");

    if (loading) return <LoadingPage />;

    if (faliure) return <ErrorPage />;

    return (
      <ScrollView style={styles.container}>
        <StatusBar
          backgroundColor={colors.worSky.white}
          barStyle="dark-content"
        />
        <Text style={styles.category}>{name}</Text>
        {Object.keys(list).length > 0 ? (
          <FlatList
            data={list}
            keyExtractor={item => String(item.entity_id)}
            renderItem={this.renderListItem}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
          />
        ) : (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>
              There is no results for this category!
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.categories.loadingCategories,
  faliure: state.categories.loadCategoriesFaliure,
  list: state.categories.list
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(categoriesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Category);
