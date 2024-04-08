import {PropsWithChildren} from 'react';
import {Modal, Pressable} from 'react-native';

type ModalOverlay = {onPress: () => void};

export default function ModalOverlay({
  children,
  onPress,
}: PropsWithChildren & ModalOverlay) {
  return (
    <Modal transparent>
      <Pressable
        onPressIn={onPress}
        style={{flex: 1, backgroundColor: 'transparent'}}>
        {children}
      </Pressable>
    </Modal>
  );
}
