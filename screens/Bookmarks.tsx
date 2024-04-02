import {Button, Text, View} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {countActions} from '../store/count-slice';
import {RootState} from '../store';

export default function BookmarksScreen(): React.JSX.Element {
  const count = useSelector<RootState>(state => state.count.count) as number;
  const dispatch = useDispatch();

  const changeOtherHandler = function () {
    dispatch(countActions.changeOther());
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>Bookmarks Page</Text>
      <Text>{count}</Text>
      <Button title="Change Other" onPress={changeOtherHandler} />
    </View>
  );
}
