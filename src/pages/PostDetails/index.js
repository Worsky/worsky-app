import React, { Component } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Image,
  Text,
  View,
  StatusBar
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import Toast from "react-native-easy-toast";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as FeedActions } from "~/store/ducks/feed";

import { backButtonIos } from "~/assets";
import { colors, metrics } from "~/styles";
import FeedItem from "~/components/FeedItem";
import ErrorPage from "~/components/ErrorPage";

class PostDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#fff",
      elevation: 0
    },
    headerTintColor: "#000",
    headerLeft: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            navigation.getParam("back") || "Feed",
            navigation.getParam("params")
          )
        }
        style={{ padding: metrics.basePadding }}
      >
        {Platform.OS == "ios" ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={backButtonIos}
              style={{ width: 18, height: 18, resizeMode: "cover" }}
            />
            <Text style={{ color: "black" }}>Back</Text>
          </View>
        ) : (
          <Icon name="arrow-left" size={15} color="black" />
        )}
      </TouchableOpacity>
    )
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired
    }).isRequired,
    loadOnePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  showToast = () =>
    this.refs.toast.show("Your report has been sent successfully!", 1000);

  async componentDidMount() {
    const { navigation, loadOnePost } = this.props;
    const reportId = navigation.getParam("reportId");

    this._navListener = this.props.navigation.addListener("didFocus", () => {
      Platform.OS != "ios"
        ? StatusBar.setBackgroundColor(colors.worSky.white)
        : null;
      StatusBar.setBarStyle("dark-content");
    });

    await loadOnePost(reportId);
  }

  render() {
    const { post, loading } = this.props;

    if (loading)
      return (
        <ActivityIndicator
          size="large"
          color={colors.worSky.blue}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      );

    if (Object.entries(post).length === 0) return <ErrorPage />;

    return (
      <View>
        <Toast ref="toast" positionValue={180} />
        <FeedItem
          localImages={false}
          single
          post={post}
          showToast={this.showToast.bind(this)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  post: state.feed.post,
  loading: state.feed.loadingPosts
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FeedActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
