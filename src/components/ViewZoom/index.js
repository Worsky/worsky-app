import React, { Component } from "react";
import { Image, View, Dimensions } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

export default class ViewZoom extends Component {
  state = {
    offset: { x: 0, y: 0 }
  };

  getOffset = () => this.state.offset;

  render() {
    const { width, height, uri } = this.props;

    return (
      <View>
        <ImageZoom
          cropWidth={Dimensions.get("window").width}
          cropHeight={Dimensions.get("window").height}
          imageWidth={width}
          imageHeight={height}
          minScale={0.1}
          enableCenterFocus={false}
          onMove={({ positionX: x, positionY: y }) =>
            this.setState({ offset: { x, y } })
          }
        >
          <Image source={{ uri }} style={{ height, width }} />
        </ImageZoom>
      </View>
    );
  }
}
