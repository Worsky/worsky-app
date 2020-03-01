import React, { useState } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Video from "react-native-video";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

export default function PublishPreview({ navigation }) {
  const { state: { params } } = navigation;
  const [paused, setPaused] = useState(false);

  handleFunction = navigation => {
    const { state: { params } } = navigation;

    navigation.navigate('Publish', { response: params.response, mediaType: params.mediaType });
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
        <Image source={{ uri: params.response.uri }} style={styles.preview} />
      }
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
