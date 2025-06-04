import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerTrainerMenuScreen = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerbalTrainerLessons')}>
      <Text style={styles.buttonText}>Тренировка</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    // Add your styles here
  },
  buttonText: {
    // Add your styles here
  },
};

export default VerTrainerMenuScreen; 