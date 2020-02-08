import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar
} from "react-native";
import Carousel from "react-native-snap-carousel";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

import WizardPaginator from "~/components/WizardPaginator";

import { slider1, slider2, slider3, slider4, slider5, slider6 } from "~/assets";
import { metrics, colors } from "~/styles";

import styles from "./styles";

export default class Wizard extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    tutorial: [
      {
        title: "Make reports",
        text: "Lorem ipsum dolor sit amer",
        image: slider1
      },
      {
        title: "Make and share",
        text: "Weather airport videos and photos",
        image: slider2
      },
      {
        title: "Get real time weather information",
        text: "Lorem ipsum dolor sit amer",
        image: slider4
      },
      {
        title: "Follow airports",
        text: "And get real time notification",
        image: slider5
      },
      {
        title: "Fuel prices and fuel available",
        text: "Airport services",
        image: slider3
      },
      {
        title: "Platform oils, airports and heliport",
        text: "AIP suplements, notams, and RMKs",
        image: slider6
      }
    ],
    finish: false
  };

  componentDidMount() {
    Platform.OS != "ios"
      ? StatusBar.setBackgroundColor(colors.worSky.white)
      : null;
    StatusBar.setBarStyle("dark-content");
  }

  _renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.paginationContainer}>
        <WizardPaginator feel={index == 0} />
        <WizardPaginator feel={index == 1} />
        <WizardPaginator feel={index == 2} />
        <WizardPaginator feel={index == 3} />
        <WizardPaginator feel={index == 4} />
        <WizardPaginator feel={index == 5} />
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  skipWizard = async () => {
    const { navigation } = this.props;

    await AsyncStorage.setItem("@wizardDone", "true");

    navigation.navigate("Feed");
  };

  render() {
    const { tutorial, finish } = this.state;

    return (
      <View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={tutorial}
          renderItem={this._renderItem}
          sliderWidth={metrics.width}
          itemWidth={metrics.width}
          onSnapToItem={index =>
            index == tutorial.length - 1
              ? this.setState({ finish: true })
              : this.setState({ finish: false })
          }
        />
        {!finish ? (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => this.skipWizard()}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this._carousel.snapToNext()}
              style={styles.nextButton}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => this.skipWizard()}
              style={styles.finishButton}
            >
              <Text style={styles.nextText}>Start</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
