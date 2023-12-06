import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  ScrollView
} from 'react-native';
import { FlashList } from "@shopify/flash-list";

const data = function (length, from = 0) {
  const arr = [];
  for (let index = from; index < length+from; index++) {
    arr.push({
      id: index + "",
      title: "title item: " + index,
      img: ""
    })
  }
  return arr;
}

const Item = ({ title, index }) => {
  return (
    <View style={[styles.item, index % 2 ? { backgroundColor: "rgba(208, 145, 0, 0.7)" } : {}]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const getItem = (_data, index) => _data[index];

const renderItem = ({ item, index }) => {
  return <Item {...item} index={index} />;
}

const ExFlash = () => {
  const [values, setValues] = useState(data(20));
  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={values}
        renderItem={renderItem}
        estimatedItemSize={120}
        refreshing={false}
        onRefresh={()=>{

        }}
        onEndReached={()=>{
            let newValue = values;
            let ar = data(20, newValue.length);
            setValues(newValue.concat(ar));
        }}
        onEndReachedThreshold={0.5}
        extraData={values}
      />
    </View>
  )
}

const ExVirtualizedlist = () => {
  const len = 30;
  return (<ExFlash></ExFlash>);

  return (
    <View style={styles.container}>
      <VirtualizedList
        style={{ flex: 1 }}
        data={data(len)}
        getItem={getItem}
        renderItem={renderItem}
        getItemCount={() => { return len }}
        keyExtractor={(itew, id) => "key_" + id}
        initialNumToRender={12}
        showsVerticalScrollIndicator={false}
        windowSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
  item: {
    height: 120,
    padding: 20,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 18,
  },
});

export default ExVirtualizedlist;