import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StatusBar, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as resetPasswordActions } from '~/store/ducks/resetPassword';

import { logo } from '~/assets';
import { colors } from '~/styles';

import styles from './styles';

class ForgotPassword extends Component {
  state = {
    email: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navagate: PropTypes.func,
    }).isRequired,
    successType: PropTypes.any,
    successMessage: PropTypes.string,
  };

  handleSubmit = async () => await this.props.resetPassword(this.state.email);

  render() {
    const { navigation, successMessage, successType } = this.props;

    let callbackStyle = styles.recoverMessageSuccess;

    if (!successType) callbackStyle = styles.recoverMessageFaliure;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.imageContainer}>
          <Image style={styles.imageLogo} source={logo} />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>EMAIL</Text>
            <TextInput
              placeholder="Enter your email"
              underlineColorAndroid="transparent"
              style={styles.textInput}
              blurOnSubmit={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <Text style={callbackStyle}>{successMessage ? successMessage : null}</Text>
          <View style={styles.submitContainer}>
            <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.submitButton}>
              <Text style={styles.submitLabel}>Recover</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text>
                <Icon
                  name="arrow-left"
                  color="#000"
                  size={12}
                  color="#303030"
                  style={{ marginLeft: 10 }}
                />{' '}
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  successType: state.resetPassword.successType,
  successMessage: state.resetPassword.successMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators(resetPasswordActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
