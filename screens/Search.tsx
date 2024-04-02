import {Button, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

import {useSelector, useDispatch} from 'react-redux';
import {countActions} from '../store/count-slice';
import {RootState} from '../store';

export default function SearchScreen(): React.JSX.Element {
  const count = useSelector<RootState>(state => state.count.count) as number;
  const dispatch = useDispatch();

  const incrementHandler = function () {
    dispatch(countActions.increment());
  };

  return (
    <View style={styles.container}>
      {/* <WebView style={{height: '80%'}} source={{uri: 'https://google.com'}} /> */}
      <Text>{count}</Text>
      <Button title="Increment" onPress={incrementHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
