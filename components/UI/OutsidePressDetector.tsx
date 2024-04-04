import React, {PropsWithChildren, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

type OutsideProps = {onPressOutside: () => void};

const OutsidePressDetector = ({
  children,
  onPressOutside,
}: PropsWithChildren<OutsideProps>) => {
  const handlePress = (event: GestureResponderEvent) => {
    const {locationX, locationY} = event.nativeEvent;

    const isOutside = locationX < 0 || locationY < 0;
    if (isOutside) {
      onPressOutside();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default OutsidePressDetector;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
