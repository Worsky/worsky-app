import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const CustomModal = ({
  visible,
  changeVisibility,
  content,
  minHeight = 230,
  close = true
}) => {
  if (Platform.OS == "ios")
    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => changeVisibility()}
      >
        <KeyboardAvoidingView
          style={styles.modalAroundContainer}
          behavior="padding"
          enabled
        >
          <View style={[styles.modalContainer, { minHeight }]}>
            {content}
            {close ? (
              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={() => changeVisibility()}
                  style={styles.closeButtom}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => changeVisibility()}
    >
      <View style={styles.modalAroundContainer} behavior="padding" enabled>
        <View style={[styles.modalContainer, { minHeight }]}>
          {content}
          {close ? (
            <View style={styles.closeContainer}>
              <TouchableOpacity
                onPress={() => changeVisibility()}
                style={styles.closeButtom}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  changeVisibility: PropTypes.func.isRequired,
  content: PropTypes.any.isRequired,
  close: PropTypes.bool,
  minHeight: PropTypes.number
};

export default CustomModal;
