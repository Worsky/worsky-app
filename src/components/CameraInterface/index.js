import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { RNCamera } from "react-native-camera";
import Icon from "react-native-vector-icons/FontAwesome5";

import CameraRollHeader from "../../components/CameraRollHeader";

import styles from "./styles";

class CameraInterface extends Component {
  state = {
    camera: "back",
    flash: "off",
    recording: false,
    timer: 0,
    visible: true
  };

  recordVideo = async () => {
    try {
      this.setState({ recording: true });

      const options = {
        quality: "780p",
        maxDuration: 10,
        pauseAfterCapture: true,
      };

      this.setState({ recording: false });

      return await this.camera.recordAsync(options);
    } catch (error) {
      this.setState({ recording: false });

      // console.log(error);
    }
  };

  stopRecording = () => {
    this.camera.stopRecording();
  };

  takePhoto = async (camera) => {
    try {
      if (camera) {
        const options = { quality: 0.5, base64: true };

        return await this.camera.takePictureAsync(options);
      }

    } catch (error) {
      // console.log(error);
    }
  }

  dispachAction = async () => {
    const { only, navigation } = this.props;
    const { recording, camera } = this.state;

    if (only == "video") {
      if (recording) return this.stopRecording();

      const response = await this.recordVideo();

      navigation.navigate('PublishPreview', { response, mediaType: "video" });
    }

    if (only == "photo") {
      const response = await this.takePhoto(camera);

      // await CameraRoll.saveToCameraRoll(response.uri)

      navigation.navigate('PublishPreview', { response, mediaType: "photo" });
    }
  };

  changeCamera = () => {
    const { camera } = this.state;

    let obj = { camera: "back" };

    if (camera == "back") obj = { camera: "front", flash: "auto" };

    this.setState(obj);
  };

  switchFlash = () => {
    const { flash } = this.state;

    let obj = { flash: "on" };

    if (flash == "on") obj = { flash: "off" };

    this.setState(obj);
  };

  handleBack = () => {
    const { navigation } = this.props;
    navigation.navigate('Feed');
  };

  onStart = () => {
    this.count = setInterval(() => {
      if (this.state.timer < 10) {
        this.setState({
          timer: this.state.timer + 1
        });
      }
    }, 1000)
  }

  onPause = () => {
    clearInterval(this.count);
  }

  toHHMMSS = secs => {
    // console.log(secs);

    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v, i) => v !== "00" || i > 0)
      .join(":")
  }

  componentWillUnmount() {
    this.state.camera = null;
    this.onPause();
    this.setState({ timer: 0 });
  }


  render() {
    const { camera, flash, recording, timer } = this.state;
    const { only } = this.props;
    const { Type, FlashMode } = RNCamera.Constants;

    const androidCameraPermissionOptions = {
      title: "Permission to use camera",
      message: "We need your permission to use your camera",
      buttonPositive: "Ok",
      buttonNegative: "Cancel"
    };

    const androidRecordAudioPermissionOptions = {
      title: "Permission to use audio recording",
      message: "We need your permission to use your audio",
      buttonPositive: "Ok",
      buttonNegative: "Cancel"
    };

    return (
      <View style={styles.container}>
        <CameraRollHeader
          title={only == "video" ? "Video" : "Photo"}
          nextEnabled={false}
          handleBack={() => this.handleBack()}
        />

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={camera == "back" ? Type.back : Type.front}
          flashMode={flash == "on" ? FlashMode.on : FlashMode.off}
          record={only == "video" ? true : false}
          androidCameraPermissionOptions={androidCameraPermissionOptions}
          androidRecordAudioPermissionOptions={
            androidRecordAudioPermissionOptions
          }
        />

        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={() => this.changeCamera()}>
            <Icon name="sync" color="white" size={20} />
          </TouchableOpacity>
          {only == "photo" ? (
            <TouchableOpacity
              onPress={() => this.switchFlash()}
              style={[
                styles.flashButton,
                {
                  backgroundColor: flash == "on" ? "white" : "transparent"
                }
              ]}
            >
              <Icon
                name="bolt"
                color={flash == "on" ? "black" : "white"}
                size={20}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.footer}>
          <View>
            {only == "video" &&
              <View style={styles.timer}>
                <Text>{this.toHHMMSS(timer)}</Text>
              </View>
            }
            <TouchableOpacity
              onPress={() => { this.dispachAction(); this.onStart() }}
              onLongPress={() => { this.dispachAction(); this.onStart() }}
              onPressOut={() => { (recording ? this.stopRecording() : false); this.onPause() }}
              style={styles.capture}
            // disabled={true}
            >
              <View style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default CameraInterface
