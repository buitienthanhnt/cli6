import {Text, ScrollView, RefreshControl, Button} from 'react-native';
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
  const {isLoading, data, isError, error, refetch} = useHomeInfo();

  return (
    <ScrollView
      style={{flex: 1, paddingHorizontal: 2, paddingTop: 4}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
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
    </ScrollView>
  );
};

export default Home;
