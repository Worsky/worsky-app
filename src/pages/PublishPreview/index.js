import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Video from "react-native-video";
import Icon from "react-native-vector-icons/FontAwesome";

import LoadingPage from "../../components/LoadingPage";

import { Creators as PublishActions } from "~/store/ducks/publish";

import styles from "./styles";
import { colors } from "~/styles";


export default function PublishPreview({ navigation }) {
  const dispatch = useDispatch();
  const loadButton = useSelector(state => state.publish.loadButton);
  const loadMedia = useSelector(state => state.publish.loadMedia);
  const faliure = useSelector(state => state.publish.faliure);

  const { state: { params } } = navigation;
  const [paused, setPaused] = useState(true);
  const [visible, setVisible] = useState(true);

  handleFunction = async navigation => {
    setVisible(false);
    const { state: { params } } = navigation;

    await handleMediaUrl(params.response, params.mediaType);

    console.log(faliure);


    if (!faliure)
      navigation.navigate('Publish', { response: params.response, mediaType: params.mediaType });
  }

  handleMediaUrl = async (media, mediaType) => {
    if (mediaType === "video") {
      return dispatch(PublishActions.uploadAndroidVideo(media));
    }

    return dispatch(PublishActions.uploadAndroidImage(media));
  }

  return (
    <View style={styles.viewPreview} >
      {params.mediaType === "video" ?
        <View style={styles.imagePreviewContainer}>
          {paused &&
            <TouchableWithoutFeedback
              onPress={() => setPaused(!paused)}
            >
              <Icon name="play" style={styles.playIcon} />
            </TouchableWithoutFeedback>
          }

          <TouchableWithoutFeedback
            onPress={() => setPaused(!paused)}
          >
            <Video
              source={{ uri: params.response.uri }}
              resizeMode="cover"
              repeat={true}
              paused={paused}
              style={styles.video}
            />
          </TouchableWithoutFeedback>
        </View>
        :
        <Image source={{ uri: params.response.uri }} style={[styles.preview, styles.uploadIcon]} />
      }
      {loadMedia && <LoadingPage color={colors.worSky.white} style={styles.loadMedia} />}
    </View>
  );
}

PublishPreview.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <Text
        onPress={() => handleFunction(navigation)}
        style={{
          color: "blue",
          fontSize: 18,
          marginLeft: 10,
        }}>
        Next
      </Text>
    ),
  }
}
