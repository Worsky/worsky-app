import React from "react";

import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import CameraInterface from "../../components/CameraInterface";

function Photo({ navigation }) {
  const { isFocused } = navigation;

  return (
    <>
      {isFocused() && <CameraInterface navigation={navigation} only="photo" />}
    </>
  )
};

Photo.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Icon name="camera" size={20} color={tintColor} />
}

export default withNavigationFocus(Photo);
