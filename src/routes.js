import React from "react";
import { StyleSheet, View, Image, Animated, Easing, Button, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import {
  home,
  homeActive,
  location,
  locationActive,
  notification,
  notificationActive,
  profile,
  profileActive,
  publish
} from "~/assets";

import { colors, metrics } from "~/styles";

import Login from "~/pages/Login";
import ForgotPassword from "~/pages/ForgotPassword";
import SignUp from "./pages/SignUp";
/**
 * Logged in
 */
import Wizard from "./pages/Wizard";
import Feed from "./pages/Feed";
import Category from "~/pages/Category";
import Maps from "~/pages/Maps";
import Notifications from "~/pages/Notifications";
import Profile from "~/pages/Profile";
import Publish2 from "~/pages/Publish";
import Airport from "~/pages/Airport";
import PostDetails from "~/pages/PostDetails";
import EditProfile from "~/pages/EditProfile";
import SelectLocation from "~/pages/SelectLocation";

import Gallery from "./pages/Gallery";
import Photo from "./pages/Photo";
import Video from "./pages/Video";
import Publish from './components/Publish';
import PublishPreview from './pages/PublishPreview';


const styles = StyleSheet.create({
  profileIcon: {
    backgroundColor: colors.worSky.blue,
    padding: metrics.basePadding - 10,
    borderRadius: metrics.baseRadius * 10,
    justifyContent: "center",
    alignItems: "center"
  },

  publishIconMenu: {
    width: 20,
    height: 20,
    marginLeft: 2,
    resizeMode: "contain"
  },

  iconMenu: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});

const defineInitialRoute = (token, reportId, wizardDone) => {
  if (token) {
    if (reportId === null) {
      if (wizardDone === "true") return "Feed";

      return "Wizard";
    }
    return "PostDetails";
  }
  return "Login";
};

const feedTabNavigator = createBottomTabNavigator(
  {
    Gallery: {
      screen: Gallery
    },
    Photo: {
      screen: createStackNavigator(
        {
          Photo,
          PublishPreview: {
            screen: PublishPreview,
          },
        },
        {
          defaultNavigationOptions: {
            headerTransparent: true,
            headerRightContainerStyle: {
              marginRight: 10,
            },
          },
        }
      ),
      navigationOptions: () => {
        return {
          tabBarVisible: true,
          tabBarIcon: () => (
            <Icon
              name="camera"
              size={20}
              color="#000"
            />
          ),
        }
      },
    },
    Video: {
      screen: Video
    },
    Publish: {
      screen: Publish
    }
  }, {
  resetOnBlur: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: colors.worSky.black,
    inactiveTintColor: colors.worSky.black,
    style: {
      backgroundColor: colors.worSky.white
    }
  },
  navigationOptions: () => ({
    header: null,
    tabBarVisible: false,
  })
})

const tabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ focused }) => {
          let _home = home;

          if (focused) _home = homeActive;

          return <Image source={_home} style={styles.iconMenu} />;
        }
      }
    },
    Maps: {
      screen: Maps,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          let _location = location;

          if (focused) _location = locationActive;

          return <Image source={_location} style={styles.iconMenu} />;
        }
      }
    },
    Publish: {
      screen: feedTabNavigator,
      navigationOptions: {
        tabBarIcon: () => (
          <View style={styles.profileIcon}>
            <Image source={publish} style={styles.publishIconMenu} />
          </View>
        )
      }
    },
    // Publish2: {
    //   screen: Publish2,
    //   navigationOptions: {
    //     tabBarIcon: () => (
    //       <View style={styles.profileIcon}>
    //         <Image source={publish} style={styles.publishIconMenu} />
    //       </View>
    //     )
    //   }
    // },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          let _notification = notification;

          if (focused) _notification = notificationActive;

          return <Image source={_notification} style={styles.iconMenu} />;
        }
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          let _profile = profile;

          if (focused) _profile = profileActive;

          return <Image source={_profile} style={styles.iconMenu} />;
        }
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.worSky.black,
      inactiveTintColor: colors.worSky.black,
      style: {
        backgroundColor: colors.worSky.white
      },
    },
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
        tabBarVisible: false
      }
    }
  }
);

const stackNavigator = (usersToken = false, reportId, wizardDone) =>
  createAppContainer(
    createStackNavigator(
      {
        Login: {
          screen: Login,
          navigationOptions: () => ({
            header: null,
            headerLayoutPreset: "left"
          })
        },
        ForgotPassword: {
          screen: ForgotPassword,
          navigationOptions: () => ({
            header: null
          })
        },
        SignUp: {
          screen: SignUp,
          navigationOptions: () => ({
            header: null
          })
        },
        Category: {
          screen: Category,
          navigationOptions: () => ({
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0
            },
            headerTintColor: "#000"
          })
        },
        Airport: {
          screen: Airport,
          navigationOptions: () => ({
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0
            },
            headerTintColor: "#000"
          })
        },
        PostDetails: {
          screen: PostDetails,
          navigationOptions: () => ({
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0
            },
            headerTintColor: "#000"
          })
        },
        EditProfile: {
          screen: EditProfile,
          navigationOptions: () => ({
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0
            },
            headerTintColor: "#000"
          })
        },
        SelectLocation: {
          screen: SelectLocation,
          navigationOptions: () => ({
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0
            },
            headerTintColor: "#000"
          })
        },
        Wizard: {
          screen: Wizard,
          navigationOptions: () => ({
            header: null
          })
        },
        Feed: {
          screen: tabNavigator
        }
      },
      {
        initialRouteName: defineInitialRoute(usersToken, reportId, wizardDone),
        initialRouteParams: { reportId, backButton: true },
        transitionConfig: () => ({
          transitionSpec: {
            duration: 0,
            timing: Animated.timing,
            easing: Easing.step0
          }
        })
      }
    )
  );

export default stackNavigator;
