import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur'; // Importar BlurView desde expo-blur

const CustomSelect = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>{selectedOption ? selectedOption.label : 'Select an option'}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView
            intensity={Platform.OS === 'ios' ? 100 : 80} // Ajustar la intensidad del desenfoque según la plataforma
            tint="light"
            style={styles.blurContainer}
          >
            <View style={styles.optionsContainer}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  onPress={() => handleSelectOption(option.value)}
                >
                  <Text>{option.value}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    width: '80%',
    borderRadius: 10,
    padding: 10,
  },
  optionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
  },
});

export default CustomSelect;