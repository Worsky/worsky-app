import React from "react";

import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import CameraInterface from "../../components/CameraInterface";

function Video({ navigation }) {
  const { isFocused } = navigation;

  return (
    <>
      {isFocused() && <CameraInterface navigation={navigation} only="video" />}
    </>
  )
};

Video.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Icon name="videocam" size={20} color={tintColor} />
}

export default withNavigationFocus(Video);
