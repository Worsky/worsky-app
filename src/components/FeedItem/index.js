import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as feedActions } from "~/store/ducks/feed";

import { like as likeInactive, likeActive } from "~/assets";
import { colors } from "~/styles";

import CustomModal from "~/components/CustomModal";
import ProgressiveImage from "~/components/ProgressiveImage";

import styles from "./styles";

class FeedItem extends Component {
  static propTypes = {
    post: PropTypes.any.isRequired,
    localImages: PropTypes.bool,
    single: PropTypes.bool,
    navigation: PropTypes.any
  };

  state = {
    visible: false,
    liked: false,
    likes: 0,
    text: null
  };

  handleLike = async () => {
    const { liked, likes } = this.state;
    const { post, handleLike } = this.props;

    await handleLike(post.report_id);

    const countLikes = !liked ? likes + 1 : likes - 1;

    this.setState({ liked: !liked, likes: countLikes });
  };

  notSinglePost = () => {
    const { post } = this.props;
    return (
      <View>
        <View style={styles.publishedContainer}>
          <Text style={{ fontWeight: "bold" }}>Published by: </Text>
          <Text>{post.user.name}</Text>
        </View>

        <View style={styles.categorySigleContainer}>
          <Image source={{ uri: post.icon }} style={styles.categoryIcon} />
          <Text style={styles.categorySigle}>
            {post.airport.name}, {post.airport.city}, {post.airport.state}
          </Text>
        </View>

        <Text style={styles.description}>{post.description} </Text>
      </View>
    );
  };

  singlePost = () => {
    const { post } = this.props;
    return (
      <View>
        <View style={styles.publishedContainer}>
          <Text style={{ fontWeight: "bold" }}>Published by: </Text>
          <Text>{post.user.name}</Text>
        </View>
        <Text style={styles.description}>{post.description} </Text>
        <Text style={styles.category}>{post.category}</Text>

        {post.location !== null && post.airport != null ? (
          <View style={styles.locationContainer}>
            <Icon name="map-marker" style={styles.locationIcon} />
            <Text style={styles.locationText}>
              {`${post.airport.name}, ${post.airport.city}, ${post.airport.state}`}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  changeVisibility = (visible = false) => this.setState({ visible });

  reportOnePost = async (post_id, text) => {
    const { reportPost, showToast } = this.props;
    // console.tron.log(showToast);

    await reportPost(post_id, text);

    await this.setState({ visible: false, text: null });

    setTimeout(() => showToast(), 1500);
  };

  modalContent = post_id => {
    const { text } = this.state;

    let extraStyle = null;
    let label = "Report it!";

    if (text == null || text.length < 8) {
      extraStyle = { backgroundColor: colors.worSky.grey };
      label = "Close";
    }

    return (
      <View style={styles.modalContainer}>
        <View style={styles.reportTextContainer}>
          <Text style={styles.reportText}>
            You are about to report this post. Type the report message
          </Text>
        </View>
        <TextInput
          placeholder="Type your report message"
          onChangeText={text => this.setState({ text })}
          style={styles.reportField}
        />
        <TouchableOpacity
          onPress={() =>
            text == null || text.length < 8
              ? this.setState({ visible: false })
              : this.reportOnePost(post_id.post_id, text)
          }
          style={[styles.reportButtom, extraStyle]}
        >
          <Text style={styles.reportTextButtom}>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  showToast = () =>
    this.refs.toast.show("Your report has been sent successfully!", 1000);

  componentDidMount() {
    const { liked, likes } = this.props.post;

    this.setState({ liked, likes });
  }

  render() {
    const { post, single, navigation } = this.props;
    const { visible, liked, likes } = this.state;

    return (
      <TouchableOpacity
        style={styles.feedItem}
        onPress={() =>
          single
            ? false
            : navigation.navigate("PostDetails", {
                reportId: post.report_id
              })
        }
        activeOpacity={1}
      >
        <View style={styles.feedItemHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: post.icon }}
              style={styles.userImage}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.name}>{post.type || "Broken Aircraft"}</Text>
              <Text style={styles.timesAgo}>{post.date}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.setState({ visible: true })}
            style={styles.moreButton}
          >
            <Icon name="ellipsis-v" style={styles.moreIcon} />
            <CustomModal
              visible={visible}
              changeVisibility={this.changeVisibility.bind(this)}
              content={<this.modalContent post_id={post.report_id} />}
              close={false}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <ProgressiveImage
            source={{ uri: post.image }}
            style={styles.feedImage}
          />
        </View>

        <View style={styles.feedItemFooter}>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.action}
              onPress={() => this.handleLike(post.report_id)}
              activeOpacity={0.7}
            >
              <Image
                source={liked ? likeActive : likeInactive}
                style={styles.likeImges}
              />
              <Text style={styles.likes}>{likes} LIKES</Text>
            </TouchableOpacity>
          </View>

          {!single ? <this.singlePost /> : <this.notSinglePost />}
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(feedActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);
