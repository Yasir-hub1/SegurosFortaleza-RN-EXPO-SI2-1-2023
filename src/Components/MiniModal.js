import React from 'react';
import { View, Modal, Image, StyleSheet } from 'react-native';
import { urlImgVehiculo } from '../Util/Api';

const MinimalModal = ({ visible, imageSource, onRequestClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{uri:urlImgVehiculo+imageSource}} style={styles.image} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

export default MinimalModal;
