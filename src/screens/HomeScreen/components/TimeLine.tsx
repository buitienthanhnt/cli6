import {Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TimelineTwo from '@screens/HomeScreen/TimelineTwo';
import React, {FunctionComponent} from 'react';

interface TimeLineProps {
  timeLine: any;
}

const TimeLine: FunctionComponent<TimeLineProps> = ({timeLine}) => {
  if (!timeLine) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          paddingHorizontal: 5,
          alignItems: 'baseline',
          paddingBottom: 0,
        }}>
        <Text style={{fontSize: 20, color: '#00afef', fontWeight: '600'}}>
          Sự Kiện
        </Text>
        <FontAwesome5Icon
          name="assistive-listening-systems"
          size={20}
          color="#00afef"
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TimelineTwo timeLine={timeLine} />
      </View>
    </View>
  );
};
export default TimeLine;
