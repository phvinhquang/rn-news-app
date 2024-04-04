import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OutsidePressDetector from '../components/UI/OutsidePressDetector';

const ParentComponent: React.FC = () => {
  const handlePressOutside = () => {
    console.log('Pressed outside the component');
    // Add your logic here for handling the press outside event
  };

  return (
    <View style={styles.container}>
      <OutsidePressDetector onPressOutside={handlePressOutside}>
        <View style={styles.innerContainer}>
          <Text>Press outside this area to trigger the event</Text>
        </View>
      </OutsidePressDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 200,
    backgroundColor: 'transparent',
  },
  innerContainer: {
    backgroundColor: 'lightblue',
    padding: 20,
  },
});

export default ParentComponent;
