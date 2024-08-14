import React, {useContext} from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
import {PaperDetailContext} from '@screens/PaperScreen/PaperContext';
const Nguon = () => {
  const {paper} = useContext(PaperDetailContext);
  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 4,
        marginTop: 4,
        borderRadius: 4,
      }}>
      <Pressable
        onPress={async () => {
          await Linking.openURL(paper.url);
        }}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          Nguồn: <Text style={{color: 'blue'}}>{paper?.title}</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default Nguon;
