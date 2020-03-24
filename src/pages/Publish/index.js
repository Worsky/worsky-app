import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator
} from "react-native";
import { CustomPicker } from "react-native-custom-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";
import ImagePicker from "react-native-image-picker";
import Video from "react-native-video";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Creators as PublishActions } from "~/store/ducks/publish";

import CustomModal from "~/components/CustomModal";

import { camera } from "~/assets";
import { colors, metrics } from "~/styles";

import styles from "./styles";

class Publish extends Component {
  state = {
    entity_id: null,
    preview: null,
    description: null,
    image: {},
    visible: false,
    mediaType: null
  };

  static propTypes = {
    navigation: PropTypes.shape({
      addListener: PropTypes.func.isRequired
    }).isRequired,
    clear: PropTypes.bool.isRequired,
    disableClear: PropTypes.func.isRequired,
    reportTypes: PropTypes.array,
    uri: PropTypes.any,
    loadButton: PropTypes.bool.isRequired,
    mute: PropTypes.bool.isRequired,
    muteSound: PropTypes.func.isRequired
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
      return (
        <View style={styles.pickerFieldContainer}>
          <Text style={styles.pickerFieldText}>Categories</Text>
          <View style={styles.pickerFieldIconContainer}>
            <Icon name="chevron-down" style={styles.pickerFieldIcon} />
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
              <Text style={styles.pickerItemText}>{category.name}</Text>
            </View>
          ) : null
        )}
        <View style={styles.pickerFieldIconContainer}>
          <Icon name="chevron-down" style={styles.pickerFieldIcon} />
        </View>
      </View>
    );
  };

  handleMedia = media => {
    const {
      uploadAndroidImage,
      uploadAndroidVideo,
      uploadIosImage,
      uploadIosVideo
    } = this.props;

    let config = {
      title: "Select a Photo",
      cameraType: "front"
    };

    if (media == "video") {
      config = {
        title: "Select a Video",
        mediaType: "video",
        cameraType: "front",
        videoQuality: "low",
        durationLimit: 11,
        takePhotoButtonTitle: "Make a video"
      };
    }

    ImagePicker.showImagePicker(config, upload => {
      if (upload.didCancel || upload.error)
        return this.setState({ visible: true });

      this.setState({
        image: upload,
        preview: { uri: upload.uri },
        mediaType: media,
        visible: false
      });

      if (media == "video") {
        if (Platform.OS == "ios") return uploadIosVideo(upload);

        return uploadAndroidVideo(upload);
      }

      if (Platform.OS == "ios") return uploadIosImage(upload);

      console.log(upload);


      return uploadAndroidImage(upload);
    });
  };

  modalContent = () => (
    <View style={styles.optionsContainer}>
      <View style={styles.optionsItem}>
        <TouchableOpacity
          onPress={() => this.handleMedia("video")}
          style={[styles.optionsItem, { backgroundColor: "#E7EDEF" }]}
        >
          <Icon name="film" size={60} />
        </TouchableOpacity>
        <Text>Video</Text>
      </View>
      <View style={styles.optionsItem}>
        <TouchableOpacity
          onPress={() => this.handleMedia("photo")}
          style={[styles.optionsItem, { backgroundColor: "#E7EDEF" }]}
        >
          <Icon name="image" size={60} />
        </TouchableOpacity>
        <Text>Photo</Text>
      </View>
    </View>
  );

  changeVisibility = (visible = false) => this.setState({ visible });

  submitButton = () => {
    const { description, entity_id } = this.state;
    const { navigation, uri, loadButton, loadMedia } = this.props;

    if (loadButton || loadMedia) {
      return (
        <TouchableOpacity
          onPress={() => false}
          style={styles.publishButtomDisabled}
        >
          <ActivityIndicator size="small" color="#fff" />
        </TouchableOpacity>
      );
    } else if (entity_id == null) {
      return (
        <TouchableOpacity
          onPress={() => { }}
          style={styles.publishButtomDisabled}
          activeOpacity={1}
        >
          <Text style={[styles.publishText, { marginRight: 10 }]}>
            Location
          </Text>
          <Icon name="arrow-right" style={styles.publishText} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SelectLocation", {
              description,
              media_url: uri,
              entity_id
            })
          }
          style={styles.publishButtom}
        >
          <Text style={[styles.publishText, { marginRight: 10 }]}>
            Location
          </Text>
          <Icon name="arrow-right" style={styles.publishText} />
        </TouchableOpacity>
      );
    }
  };

  async componentWillMount() {
    const { loadReportTypes } = this.props;

    await loadReportTypes();
  }

  componentDidMount() {
    const { navigation, disableClear } = this.props;

    this._navListener = navigation.addListener("didFocus", () => {
      const { clear } = this.props;

      Platform.OS != "ios"
        ? StatusBar.setBackgroundColor(colors.worSky.white)
        : null;
      StatusBar.setBarStyle("dark-content");
      if (clear) {
        this.setState({
          entity_id: null,
          preview: null,
          description: null,
          image: {}
        });

        disableClear();
      }
    });
  }

  componentWillUnmount() {
    const { muteSound } = this.props;
    this._navListener.remove();
    muteSound();
  }

  render() {
    const { preview, description, visible, mediaType } = this.state;
    const { reportTypes, uri, mute, muteSound, loadMedia } = this.props;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          backgroundColor: colors.worSky.white,
          flexGrow: 1,
          paddingHorizontal: metrics.basePadding / 2
        }}
        scrollEnabled={true}
      >
        <Text style={styles.title}>Publish</Text>
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
        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={
            preview
              ? [styles.uploadContainer, { backgroundColor: "white" }]
              : styles.uploadContainer
          }
        >
          {mediaType !== "video" ? (
            <Image
              source={preview ? preview : camera}
              style={
                preview
                  ? [
                    styles.imagePost,
                    { resizeMode: "contain", opacity: loadMedia ? 0.5 : 1 }
                  ]
                  : styles.uploadIcon
              }
            />
          ) : (
              <Video
                source={preview}
                style={[styles.imagePost, { marginTop: 10 }]}
                volume={mute ? 1.0 : 0.0}
                posterResizeMode="center"
                repeat={true}
                resizeMode="contain"
              />
            )}
          {loadMedia ? (
            <ActivityIndicator
              size="large"
              color={colors.worSky.white}
              style={styles.loadMedia}
            />
          ) : null}
        </TouchableOpacity>
        {mediaType === "video" ? (
          <TouchableOpacity
            onPress={() => muteSound(!mute)}
            style={{
              width: metrics.width,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10
            }}
          >
            {mute ? (
              <Icon name="volume-up" size={20} />
            ) : (
                <Icon name="volume-mute" size={20} />
              )}
          </TouchableOpacity>
        ) : null}
        <Text style={styles.descriptionTitle}>Description:</Text>
        <TextInput
          placeholder="Report text example..."
          style={styles.descriptionInput}
          onChangeText={description => this.setState({ description })}
          value={description}
        />
        <Text style={styles.errorText}>
          {uri === false ? "The media failed to upload" : null}
        </Text>
        <View style={styles.publishButtomContainer}>
          <this.submitButton />
        </View>

        <CustomModal
          visible={visible}
          changeVisibility={this.changeVisibility.bind(this)}
          content={<this.modalContent />}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  reportTypes: state.publish.reportTypes,
  clear: state.publish.clear,
  uri: state.publish.uri,
  loadButton: state.publish.loadButton,
  mute: state.publish.mute,
  loadMedia: state.publish.loadMedia
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PublishActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Publish);
