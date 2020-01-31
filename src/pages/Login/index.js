import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StatusBar,
  BackHandler,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Creators as SignInActions } from '~/store/ducks/signIn';

import HeaderLogin from '~/components/HeaderLogin';

import { colors } from '~/styles';

import styles from './styles';

class SignIn extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navagate: PropTypes.func,
    }).isRequired,
    singInRequest: PropTypes.func,
  };

  state = {
    email: null,
    password: null,
  };

  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid),
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid),
    );
  }

  onBackButtonPressAndroid = () => true;

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.cleanAll) {
      this.setState({ email: null, password: null });
      await nextProps.signInCleanAll();
    }
  }

  handleSubmit = () => {
    const username = this.state.email;
    const password = this.state.password;
    const { signInRequest } = this.props;

    signInRequest(username, password);
  };

  render() {
    const { navigation, error, loading } = this.props;
    const { email, password } = this.state;

    return (
      <GestureRecognizer onSwipeLeft={() => navigation.navigate('SignUp')}>
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor={colors.worSky.white} barStyle="dark-content" />
          <View style={styles.wrap}>
            <HeaderLogin active="login" navigation={navigation} />
            <View style={styles.body}>
              <View style={styles.wrapForm}>
                <View style={styles.textInputWrap}>
                  <Text style={styles.textLabel}>EMAIL</Text>
                  <TextInput
                    placeholder="Enter your email"
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => this.secondTextInput.focus()}
                    onChangeText={text => this.setState({ email: text })}
                    value={email}
                  />
                </View>

                <View style={styles.textInputWrap}>
                  <Text style={styles.textLabel}>PASSWORD</Text>
                  <TextInput
                    placeholder="Type your password"
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry
                    ref={input => {
                      this.secondTextInput = input;
                    }}
                    onChangeText={text => this.setState({ password: text })}
                    value={password}
                  />
                </View>
                {error ? <Text style={styles.errorText}>User or password invalid</Text> : null}
                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text>Forgot your pass?</Text>
                </TouchableOpacity>
              </View>
            </View>
            {loading ? (
              <TouchableOpacity style={styles.loginBotton} onPress={() => {}} activeOpacity={1}>
                <ActivityIndicator size="small" color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.loginBotton} onPress={this.handleSubmit}>
                <Text style={styles.loginBottonText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAwareScrollView>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = state => ({
  error: state.signIn.error,
  loading: state.signIn.loading,
  cleanAll: state.signIn.cleanAll,
});

const mapDispatchToProps = dispatch => bindActionCreators(SignInActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
