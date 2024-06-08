import {Dimensions, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {LineChart} from 'react-native-chart-kit';
import React, {FunctionComponent} from 'react';

interface DemoChartProps {
  map: any;
}

const DemoChart: FunctionComponent<DemoChartProps> = ({map}) => {
  if (!map) {
    return null;
  }

  return (
    <View style={{paddingHorizontal: 5}}>
      <View
        style={{
          flexDirection: 'row',
          gap: 6,
          alignItems: 'center',
          paddingLeft: 5,
        }}>
        <Text style={{fontSize: 20, color: '#00afef', fontWeight: '600'}}>
          Thống kê
        </Text>
        <FontAwesome5Icon name="chart-pie" size={16} color="#00afef" />
      </View>
      <LineChart
        {...map}
        width={Dimensions.get('window').width - 10} // from react-native
        height={220}
        chartConfig={{
          ...map.chartConfig,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 8,
          },
          propsForDots: {
            r: '2',
            strokeWidth: '2',
            stroke: 'white',
          },
          // backgroundColor: "#e26a00",
          // backgroundGradientFrom: "#ff7cc0", // 82baff
          // backgroundGradientTo: "#82baff",   // ffa726
          // decimalPlaces: 2, // optional, defaults to 2dp
        }}
        style={{
          marginVertical: 4,
          borderRadius: 16,
        }}
        onDataPointClick={({index, dataset, value, x, y}) => {
          console.log('....', index, dataset, value, x, y);
        }}
        renderDotContent={({x, y, index, indexData}) => {
          return (
            <View
              key={index}
              style={{position: 'absolute', left: x + 4, top: y - 4}}>
              <Text style={{fontSize: 11}}>{Math.floor(indexData)}</Text>
            </View>
          );
        }}
        // yAxisInterval={1} // số các đường thằng chia ô, defaults to 1
        // yAxisLabel="$"
        // yAxisSuffix="k"
        // hidePointsAtIndex={[1,2]} // ẩn các nút trong mảng này.
        // bezier={false} // true sẽ làm cong các đường dẫn.
      />
    </View>
  );
};

export default DemoChart;
