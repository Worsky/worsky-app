import React, { Component } from 'react';
import { ScrollView, FlatList, Text, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as NotificationCreators } from '~/store/ducks/notifications';

import ReportList from '~/components/ReportList';
import LoadingPage from '~/components/LoadingPage';
import ErrorPage from '~/components/ErrorPage';

import { colors } from '~/styles';

import styles from './styles';

class Notification extends Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    faliure: PropTypes.bool.isRequired,
    notifications: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { loadNotifications } = this.props;

    this._navListener = this.props.navigation.addListener('didFocus', () => {
      Platform.OS != 'ios' ? StatusBar.setBackgroundColor(colors.worSky.white) : null;
      StatusBar.setBarStyle('dark-content');
      loadNotifications();
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    const { navigation, loading, faliure, notifications } = this.props;

    if (loading) return <LoadingPage />;

    if (faliure) return <ErrorPage />;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Notification</Text>
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <ReportList data={item} navigation={navigation} back="Notifications" />
          )}
          keyExtractor={item => String(item.report_id)}
          extraData={navigation}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.notifications.loading,
  faliure: state.notifications.faliure,
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators(NotificationCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification);
