import React, { Component } from "react";
import { View, TouchableWithoutFeedback, ScrollView, Dimensions } from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/FontAwesome";
import ImageEditor from "@react-native-community/image-editor";

import ViewZoom from "../../components/ViewZoom";
import CameraRollList from "../../components/CameraRollList";
import CameraRollHeader from "../../components/CameraRollHeader";

import styles from "./styles";

export default class Gallery extends Component {
  state = {
    current: {},
    groupTypes: "All",
    paused: false
  };
  mediaContainer = () => {
    const {
      current: { width, height, uri, type },
      paused
    } = this.state;

    if (type == "video/mp4")
      return (
        <TouchableWithoutFeedback
          onPress={() => this.setState({ paused: !paused })}
        >
          <Video
            source={{ uri }}
            resizeMode="cover"
            repeat={true}
            paused={paused}
            style={styles.video}
          />
        </TouchableWithoutFeedback>
      );

    return (
      <ViewZoom
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height}
        uri={uri}
        ref={viewZoom => (this.viewZoom = viewZoom)}
      />
    );
  };

  handleMedia = image => {
    this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
    this.setState({ current: image });
  };

  handleCrop = async () => {
    const { current } = this.state;
    const offset = this.viewZoom.getOffset();
    const cropData = {
      offset,
      size: { width: current.width, height: current.height }
    };
    return await ImageEditor.cropImage(current.uri, cropData);
  };

  handleFunction = async () => {
    const { current } = this.state;
    const { navigation } = this.props;

    const mediaType = current.type === "video/mp4" ? "video" : "photo";

    let response = current.type === "video/mp4" ? current : await this.handleCrop();

    response = { ...current, uri: current.type === "video/mp4" ? current.uri : response };

    navigation.navigate('Publish', { response, mediaType });
  }

  handleBack = () => {
    const { navigation } = this.props;

    navigation.navigate('Feed');
  }

  render() {
    const { paused } = this.state;

    return (
      <ScrollView style={styles.container} ref="_scrollView">
        <CameraRollHeader
          handleFunction={this.handleFunction.bind(this)}
          handleBack={this.handleBack.bind(this)}
        />
        <View style={styles.imagePreviewContainer}>
          {paused ? (
            <TouchableWithoutFeedback
              onPress={() => this.setState({ paused: !paused })}
            >
              <Icon name="play" style={styles.playIcon} />
            </TouchableWithoutFeedback>
          ) : null}
          <this.mediaContainer />
        </View>
        <CameraRollList handleMedia={this.handleMedia.bind(this)} />
      </ScrollView>
    );
  }
}

Gallery.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Icon name="home" size={20} color={tintColor} />
}
