import {Text, View, StyleSheet, ViewStyle, Pressable} from 'react-native';
import BottomTabIcon from './BottomTabIcon';

import ShareIcon from '../../assets/share.png';
import BookmarkIcon from '../../assets/bookmark.png';
import FilledBookmarkIcon from '../../assets/bottom-tab/bookmark.png';

interface PopoverProps {
  style?: ViewStyle;
  bookmarkScreen?: boolean;
  onBookmark?: () => void;
  onRemoveBookmark?: () => void;
  onShare: () => void;
}

export default function PopoverMenu({
  style,
  onBookmark,
  onRemoveBookmark,
  onShare,
  bookmarkScreen,
}: PopoverProps) {
  const bookmarkPressHandler = function () {
    if (bookmarkScreen) {
      onRemoveBookmark?.();
    } else {
      onBookmark?.();
    }
  };

  return (
    <View style={[styles.modal, style]}>
      <View style={styles.modalContent}>
        <Pressable
          onPress={onShare}
          style={({pressed}) => [
            styles.modalInnerFlexbox,
            pressed && styles.pressed,
          ]}>
          <BottomTabIcon source={ShareIcon} style={styles.icon} />
          <Text style={styles.modalText}>Share</Text>
        </Pressable>
        <View style={styles.horizontalLine}></View>
        <Pressable
          onPress={bookmarkPressHandler}
          style={({pressed}) => [
            styles.modalInnerFlexbox,
            pressed && styles.pressed,
          ]}>
          <BottomTabIcon
            source={bookmarkScreen ? FilledBookmarkIcon : BookmarkIcon}
            style={styles.icon}
          />
          <Text style={styles.modalText}>
            {bookmarkScreen ? 'Remove bookmark' : 'Bookmark'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
  modal: {
    width: 140,
    height: 80,
    borderRadius: 10,

    // Box shadow Android
    elevation: 4,
    // Box shadow IOS
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  modalInnerFlexbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 15,
    gap: 10,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#ddd',
  },
  modalText: {
    fontSize: 15,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
