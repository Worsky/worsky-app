import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from "./styles";

export default function PublishPreview({ navigation }) {
  const { state: { params } } = navigation;

  handleFunction = navigation => {
    const { state: { params } } = navigation;

    navigation.navigate('Publish', { response: params.response, mediaType: params.mediaType });
  }

  return (
    <View style={styles.viewPreview} >
      <Image source={{ uri: params.response.uri }} style={styles.preview} />
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
