import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Keyboard,
  StatusBar,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { CustomPicker } from "react-native-custom-picker";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-picker";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as ProfileActions } from "~/store/ducks/profile";

import { colors } from "~/styles";

import styles from "./styles";

class EditProfile extends Component {
  state = {
    username: this.props.profile.username || null,
    email: this.props.profile.email || null,
    name: this.props.profile.name || null,
    selectedCountry: this.props.profile.country_id || 1,
    phone: this.props.profile.phone || "+5514998974249",
    bio: this.props.profile.bio || null,
    newPassword: null,
    confirmPassword: null
  };

  renderHeader = () => (
    <View style={styles.countryHeaderContainer}>
      <Text style={styles.countryHeaderText}>Select your country</Text>
    </View>
  );

  renderItem = settings => {
    const { item, getLabel } = settings;

    return <Text style={styles.countryItem}> {getLabel(item)} </Text>;
  };

  renderFooter(action) {
    return (
      <View style={styles.countryFooterContainer}>
        <TouchableOpacity
          onPress={action.close.bind(this)}
          style={styles.countryFooterButtom}
        >
          <Text style={styles.countryFooterText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderField = () => {
    const { countries } = this.props;
    const { selectedCountry } = this.state;

    return (
      <View style={styles.customPicker}>
        {countries.map(country =>
          country.country_id == selectedCountry ? (
            <Text key={country.country_id}>{country.name}</Text>
          ) : null
        )}
        <Icon name="chevron-down" />
      </View>
    );
  };

  handleSubmit = async () => {
    const { editProfile, avatar, profile } = this.props;
    let data = ({
      username,
      email,
      name,
      selectedCountry,
      phone,
      bio,
      newPassword,
      confirmPassword
    } = this.state);

    if (avatar != null && Object.keys(avatar).length > 0)
      data = { ...data, avatar: `data:image/jpeg;base64,${avatar.data}` };
    else data = { ...data, avatar: profile.avatar };

    await editProfile(data, avatar);
  };

  handleAvatar = () => {
    ImagePicker.showImagePicker(
      {
        title: "Select an image"
      },
      upload => {
        if (upload.didCancel) return upload.didCancel;
        this.props.handleAvatar(upload);
      }
    );
  };

  renderAvatar = () => {
    const { profile, avatarPreview, showAvatarLoading } = this.props;

    let showAvatar;

    if (avatarPreview != null) showAvatar = avatarPreview;
    else if (Object.keys(profile).length > 0 && profile.avatar)
      showAvatar = { uri: profile.avatar };

    if (showAvatar == null) {
      return (
        <Icon
          name="user-tie"
          size={90}
          color="black"
          backgroundColor="orange"
        />
      );
    }

    if (showAvatarLoading) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image source={showAvatar} style={styles.headerImage} />
          <ActivityIndicator
            size="small"
            color={colors.worSky.white}
            style={styles.imageLoading}
          />
        </View>
      );
    }

    return <Image source={showAvatar} style={styles.headerImage} />;
  };

  async componentDidMount() {
    const { getCountries, countries, cleanErrors } = this.props;

    await cleanErrors();

    if (countries.length == 0) await getCountries();
  }

  render() {
    const {
      username,
      email,
      name,
      phone,
      selectedCountry,
      bio,
      newPassword,
      confirmPassword
    } = this.state;
    const { loadButtom, errorField, countries, success } = this.props;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          backgroundColor: colors.worSky.white,
          flexGrow: 1
        }}
        scrollEnabled={true}
      >
        <StatusBar
          backgroundColor={colors.worSky.white}
          barStyle="dark-content"
        />
        <View style={styles.headerContainer}>
          <View style={styles.headerImageContainer}>
            <TouchableOpacity onPress={this.handleAvatar}>
              <this.renderAvatar />
            </TouchableOpacity>
            <Text style={styles.profileTitle}>Touch to change your avatar</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>USERNAME</Text>
          <TextInput
            placeholder="Choose a username"
            underlineColorAndroid="transparent"
            style={[
              styles.textInput,
              { backgroundColor: colors.worSky.grey, color: "#5e5d5d" }
            ]}
            autoCapitalize="none"
            onChangeText={text => this.setState({ username: text })}
            onSubmitEditing={() => this.secondTextInput.focus()}
            returnKeyType="next"
            value={username}
            editable={false}
          />
          {Object.keys(errorField.errors).length > 0 &&
          errorField.errors.username ? (
            <Text style={styles.errorText}>
              {errorField.errors.username[0]}
            </Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>EMAIL</Text>
          <TextInput
            placeholder="Enter your email"
            underlineColorAndroid="transparent"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => this.setState({ email: text })}
            ref={input => {
              this.secondTextInput = input;
            }}
            onSubmitEditing={() => this.thirdTextInput.focus()}
            returnKeyType="next"
            value={email}
          />
          {Object.keys(errorField.errors).length > 0 &&
          errorField.errors.email ? (
            <Text style={styles.errorText}>{errorField.errors.email[0]}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>NAME</Text>
          <TextInput
            placeholder="Enter your name"
            underlineColorAndroid="transparent"
            style={styles.textInput}
            autoCapitalize="words"
            onChangeText={text => this.setState({ name: text })}
            ref={input => {
              this.thirdTextInput = input;
            }}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
            value={name}
          />
          {Object.keys(errorField.errors).length > 0 &&
          errorField.errors.name ? (
            <Text style={styles.errorText}>{errorField.errors.name[0]}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>COUNTRY</Text>
          <CustomPicker
            placeholder="Select your country"
            options={countries}
            headerTemplate={this.renderHeader}
            getLabel={item => item.name}
            optionTemplate={this.renderItem}
            footerTemplate={this.renderFooter}
            fieldTemplate={this.renderField}
            modalStyle={styles.customPickerModal}
            onValueChange={value =>
              this.setState({ selectedCountry: value.country_id })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>PHONE</Text>
          <TextInputMask
            type={"cel-phone"}
            options={{
              maskType: selectedCountry == 30 ? "BRL" : "INTERNATIONAL",
              withDDD: true,
              dddMask: "(99) "
            }}
            value={this.state.phone}
            placeholder="Enter your phone number"
            underlineColorAndroid="transparent"
            style={styles.textInput}
            blurOnSubmit={false}
            autoCapitalize="none"
            onChangeText={text => this.setState({ phone: text })}
            value={phone}
            onSubmitEditing={() => this.fifthTextInput.focus()}
            returnKeyType="next"
          />
          {Object.keys(errorField.errors).length > 0 &&
          errorField.errors.phone ? (
            <Text style={styles.errorText}>{errorField.errors.phone[0]}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>BIOGRAPHY</Text>
          <TextInput
            placeholder="Enter your bio"
            underlineColorAndroid="transparent"
            style={styles.textInput}
            autoCapitalize="words"
            onChangeText={text => this.setState({ bio: text })}
            ref={input => {
              this.fifthTextInput = input;
            }}
            onSubmitEditing={() => this.sixthTextInput.focus()}
            returnKeyType="done"
            value={bio}
          />
          {Object.keys(errorField.errors).length > 0 &&
          errorField.errors.bio ? (
            <Text style={styles.errorText}>{errorField.errors.bio[0]}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>NEW PASSWORD</Text>
          <TextInput
            placeholder="Type your password"
            underlineColorAndroid="transparent"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={text => this.setState({ newPassword: text })}
            ref={input => {
              this.sixthTextInput = input;
            }}
            onSubmitEditing={() => this.seventhTextInput.focus()}
            returnKeyType="next"
            value={newPassword}
          />
          {Object.keys(errorField.errors).length > 0 &&
          errorField.errors.password
            ? errorField.errors.password.map(error => (
                <Text key={Math.random()} style={styles.errorText}>
                  {error}
                </Text>
              ))
            : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
          <TextInput
            placeholder="Repeat your password"
            underlineColorAndroid="transparent"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={text => this.setState({ confirmPassword: text })}
            ref={input => {
              this.seventhTextInput = input;
            }}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
            value={confirmPassword}
          />
        </View>
        <View style={styles.buttomContainer}>
          {success ? (
            <Text style={styles.successText}>
              Your profile has been updated successfuly
            </Text>
          ) : null}
          {loadButtom ? (
            <TouchableOpacity
              style={styles.submitButtom}
              onPress={() => {}}
              activeOpacity={1}
            >
              <ActivityIndicator size="small" color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.submitButtom}
              onPress={this.handleSubmit}
            >
              <Text style={styles.buttomLabel}> Save </Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loadButtom: state.profile.loadButtom,
  avatar: state.profile.avatar,
  avatarPreview: state.profile.avatarPreview,
  errorField: state.profile.errorField,
  countries: state.profile.countries,
  success: state.profile.success,
  showAvatarLoading: state.profile.showAvatarLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ProfileActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
