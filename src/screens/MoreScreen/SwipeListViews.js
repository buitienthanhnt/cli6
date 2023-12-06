import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// npm i react-native-swipe-list-view
import { SwipeListView } from 'react-native-swipe-list-view'; // examp: https://snack.expo.dev/@jemise111/react-native-swipe-list-view

export default function SwipeListViews() {

  const [resfresh, setRefresh] = useState(false);
  const [userData] = useState([
    {
      img: 'https://randomuser.me/api/portraits/men/55.jpg',
      name: 'Maurice Davis',
    },
    {
      img: 'https://randomuser.me/api/portraits/women/20.jpg',
      name: 'Bernice Alvarez',
    },
    {
      img: 'https://randomuser.me/api/portraits/men/55.jpg',
      name: 'Jennie Barnett',
    },
    {
      img: 'https://randomuser.me/api/portraits/men/55.jpg',
      name: 'Matthew Wagner',
    },
    {
      img: 'https://randomuser.me/api/portraits/men/71.jpg',
      name: 'Christian Wilson',
    },
    {
      img: 'https://randomuser.me/api/portraits/men/55.jpg',
      name: 'Sophia Fernandez',
    },
    {
      img: 'https://randomuser.me/api/portraits/men/55.jpg',
      name: 'Maurice Davis',
    },
    {
      img: 'https://randomuser.me/api/portraits/women/20.jpg',
      name: 'Bernice Alvarez',
    },
    {
      img: 'https://randomuser.me/api/portraits/men/55.jpg',
      name: 'Jennie Barnett',
    },
  ]);

  const onRefresh = useCallback(() => {
    // alert("refresh");
  })


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={resfresh} onRefresh={onRefresh} />}
      style={{ flex: 1, padding: 6, backgroundColor: "#baffd2" }}
    >
      <SwipeListView
        data={userData}
        renderItem={(data, rowMap) => (
          <TouchableWithoutFeedback
            onPress={() => { }}
          >
            <View style={styles.showItem}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 40, resizeMode: 'cover' }}
                source={{ uri: data.item.img }}
              />
              <Text style={styles.itemName}>{data.item.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.hiddenContainer}>
            <View style={styles.hiddenItem} >
              <TouchableOpacity
                onPress={() => {
                  setRefresh(true)
                }}
              >
                <Icon name='send' size={28} color='tomato' />
              </TouchableOpacity>
            </View>
            <View style={styles.hiddenItem} >
              <TouchableOpacity
                onPress={() => {
                  setRefresh(false)
                }}
              >
                <Icon name='bug' size={28} color='#00ffca' />
              </TouchableOpacity>
            </View>
          </View>
        )}
        leftOpenValue={50}
        rightOpenValue={-50}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  showItem: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginVertical: 4,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#c6c8ff",
  },
  itemName: {
    marginLeft: 10,
    fontWeight: '400',
    fontSize: 16,
  },
  hiddenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  hiddenItem: {
    width: 50,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#d493ff",
    borderRadius: 4,
  }
})