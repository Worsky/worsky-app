import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { CustomPicker } from 'react-native-custom-picker';
import PropTypes from 'prop-types';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as SignUpActions } from '~/store/ducks/signUp';

import HeaderLogin from '~/components/HeaderLogin';

import { colors } from '~/styles';

import styles from './styles';

class SignUp extends Component {
  state = {
    username: null,
    email: null,
    name: null,
    selectedCountry: 1,
    phone: null,
    password: null,
    confirmPassword: null,
  };

  static propTypes = {
    signUpRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    countries: PropTypes.array,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleSubmit = () => {
    const { username, email, name, selectedCountry, phone, password, confirmPassword } = this.state;
    const { signUpRequest } = this.props;

    signUpRequest(username, email, name, selectedCountry, phone, password, confirmPassword);
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
        <TouchableOpacity onPress={action.close.bind(this)} style={styles.countryFooterButtom}>
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
          ) : null,
        )}
        <Icon name="chevron-down" />
      </View>
    );
  };

  async componentDidMount() {
    const { getCountries } = this.props;

    await getCountries();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.cleanAll) {
      this.setState({
        username: null,
        email: null,
        name: null,
        selectedCountry: 1,
        phone: null,
        password: null,
        confirmPassword: null,
      });
      await nextProps.signUpCleanAll();
    }
  }

  render() {
    const { username, email, name, selectedCountry, phone, password, confirmPassword } = this.state;

    const { loading, countries, errors, navigation } = this.props;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ backgroundColor: colors.worSky.white, flexGrow: 1 }}
        scrollEnabled={true}
      >
        <GestureRecognizer onSwipeRight={() => navigation.navigate('Login')}>
          <StatusBar backgroundColor={colors.worSky.white} barStyle="dark-content" />
          <HeaderLogin active="signUp" navigation={navigation} />

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>USERNAME</Text>
            <TextInput
              placeholder="Choose a username"
              underlineColorAndroid="transparent"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={text => this.setState({ username: text })}
              onSubmitEditing={() => this.secondTextInput.focus()}
              returnKeyType="next"
              value={username}
            />
            {errors && errors.username
              ? errors.username.map(error => (
                  <Text style={styles.errorText} key={Math.random()}>
                    {error}
                  </Text>
                ))
              : null}
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
            {errors && errors.email
              ? errors.email.map(error => (
                  <Text style={styles.errorText} key={Math.random()}>
                    {error}
                  </Text>
                ))
              : null}
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
              onValueChange={value => this.setState({ selectedCountry: value.country_id })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>PHONE</Text>
            <TextInputMask
              type={'cel-phone'}
              options={{
                maskType: selectedCountry == 30 ? 'BRL' : 'INTERNATIONAL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              value={this.state.phone}
              placeholder="Enter your phone number"
              underlineColorAndroid="transparent"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={text => this.setState({ phone: text })}
              value={phone}
              onSubmitEditing={() => this.fourthTextInput.focus()}
              returnKeyType="next"
            />
            {errors && errors.phone
              ? errors.phone.map(error => (
                  <Text style={styles.errorText} key={Math.random()}>
                    {error}
                  </Text>
                ))
              : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>PASSWORD</Text>
            <TextInput
              placeholder="Type your password"
              underlineColorAndroid="transparent"
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              ref={input => {
                this.fourthTextInput = input;
              }}
              onSubmitEditing={() => this.fifthTextInput.focus()}
              returnKeyType="next"
              value={password}
            />
            {errors && errors.password
              ? errors.password.map(error => {
                  if (error != 'The password errorText does not match.')
                    return (
                      <Text style={styles.errorText} key={Math.random()}>
                        {error}
                      </Text>
                    );
                })
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
                this.fifthTextInput = input;
              }}
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="done"
              value={confirmPassword}
            />
            {errors && errors.password
              ? errors.password.map(error => {
                  if (error == 'The password errorText does not match.')
                    return (
                      <Text style={styles.errorText} key={Math.random()}>
                        {error}
                      </Text>
                    );
                })
              : null}
          </View>

          {typeof errors == 'undefined' ? (
            <Text style={styles.errorText}>Ops, somethig went wrong</Text>
          ) : null}

          <View style={styles.buttomContainer}>
            {loading ? (
              <TouchableOpacity style={styles.submitButtom} onPress={() => {}} activeOpacity={1}>
                <ActivityIndicator size="small" color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.submitButtom} onPress={this.handleSubmit}>
                <Text style={styles.buttomLabel}> Sign Up </Text>
              </TouchableOpacity>
            )}
          </View>
        </GestureRecognizer>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.signUp.loading,
  errors: state.signUp.errors,
  countries: state.signUp.countries,
  cleanAll: state.signUp.cleanAll,
});

const mapDispatchToProps = dispatch => bindActionCreators(SignUpActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
