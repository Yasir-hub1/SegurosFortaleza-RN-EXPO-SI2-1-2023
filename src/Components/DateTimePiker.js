import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TimePicker = ({ onTimeSelect, tittle, isMode }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {

    setSelectedTime(time);
    hideTimePicker();
    onTimeSelect(obtenerFecha(time));
  };


  function obtenerFecha(fechaString) {
    const fecha = new Date(fechaString);
    const year = fecha.getUTCFullYear();
    const month = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getUTCDate().toString().padStart(2, '0');
    const hours = fecha.getUTCHours().toString().padStart(2, '0');
    const minutes = fecha.getUTCMinutes().toString().padStart(2, '0');
    const seconds = fecha.getUTCSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  
  


  return (
    <View>
      <Button title={tittle} onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode={isMode}
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      {selectedTime  &&(
        <View>
          <Text>{tittle}:{obtenerFecha(selectedTime)}</Text>
        </View>
      )}

    
    </View>
  );
};

export default TimePicker;
