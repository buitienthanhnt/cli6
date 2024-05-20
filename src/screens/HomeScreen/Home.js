import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  RefreshControl,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import CarolParax from '../CodeScreen/components/animated/CarolParax';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import PaperInfo from '@screens/PaperScreen/element/PaperInfo';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'; // https://github.com/indiespirit/react-native-chart-kit
//https://blog.logrocket.com/top-8-react-native-chart-libraries-2023/
import TimelineTwo from './TimelineTwo';
import YoutubePlayer from 'react-native-youtube-iframe'; // https://lonelycpp.github.io/react-native-youtube-iframe/
import {openDetail, openSearch} from '@utils/paper';
import {Navigate} from '@hooks/Navigate';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatDate} from '@utils/helper';
import Carousel from '@elements/Carousel';
import {useHomeInfo} from '@hooks/usePapers';
import {
  ListCarousel,
  Forward,
  SearchAll,
  Yvideo,
  PopularNews,
  ListWriter,
  TopSearch,
  ProposeList,
  ImageParacel,
  DemoChart,
  TimeLine,
  TopNew,
} from '@screens/HomeScreen/components';

const Home = ({navigation}) => {
  const {isLoading, data, isError, error} = useHomeInfo();

  return (
    <ScrollView
      style={{flex: 1, paddingHorizontal: 2, paddingTop: 4}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={async () => {
            // fetchData();
          }}
        />
      }>
      <TopNew hit={data?.hit} />
      <PopularNews data={data?.mostRecents} />
      <TopSearch search={data?.search} />
      <Forward value={data?.forward} />
      <ProposeList most={data?.mostPopulator} />
      <TimeLine timeLine={data?.timeLine} />
      <Yvideo video={data?.video} />
      <ImageParacel listImages={data?.listImages} />
      <DemoChart map={data?.map} />
      <ListWriter writers={data?.writers} />
      <SearchAll />
      <ListCarousel data={data?.mostRecents} />

      <Button
        title="to Process"
        onPress={() => {
          navigation.navigate('ExampleOne');
        }}
      />
      {/* <Button title="to ExampleTwo" onPress={()=>{
                navigation.navigate("ExampleTwo")
            }}></Button> */}
      <Text />
      {/*<Button*/}
      {/*  title="to screen modal"*/}
      {/*  onPress={() => {*/}
      {/*    navigation.navigate('ExAnimated5');*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="to Login"*/}
      {/*  onPress={() => {*/}
      {/*    navigation.navigate('Login');*/}
      {/*  }}*/}
      {/*/>*/}
    </ScrollView>
  );
};

export default Home;
