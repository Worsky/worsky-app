import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import ModalHeader from "~/components/ModalHeader";

import styles from "./styles";

const MoreInfoModalContent = ({ infoPoint, closeModal, handleNavigation }) => {
  console.tron.log(infoPoint);
  return (
    <View style={styles.container}>
      <ModalHeader />
      <Text style={styles.title}>{infoPoint.point_type.name}</Text>
      <Text style={styles.description}>{infoPoint.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonShape, styles.closeButton]}
          onPress={() => closeModal(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonShape, styles.detailsButton]}
          onPress={() => {
            closeModal(false);
            handleNavigation(infoPoint);
          }}
        >
          <Text style={styles.detailsButtonText}>More details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MoreInfoModalContent;
