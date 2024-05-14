import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline,
} from 'react-native-maps';
import {usePlaceDetail, usePlaceSearch, useGetCoords} from '@hooks/useMap';
const Stanstacks = () => {
  // hook search detail
  const {
    placeData: {value, isLoading, isSuccess, error, status},
    setPlaceId,
  } = usePlaceDetail('ChIJSzCx8cesNTER5nQ3fDSKkVE');

  // hook search places
  const {placeDatas, setSearchText} = usePlaceSearch('nam dinh');

  if (placeDatas.isLoading) {
    return (
      <View>
        <Text>stansk query demo</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {placeDatas.value.predictions.map((item, index) => {
        return <Text key={index}>{item.description}</Text>;
      })}

      <Button
        title="search = ha noi"
        onPress={() => {
          setSearchText('ha noi');
        }}
      />

      <DerectionMap />
    </View>
  );
};

const DerectionMap = React.memo(() => {
  const {coords, setFrom, setTo, from, to} = useGetCoords();

  useEffect(() => {
    // "20.988978804384576,105.79468131065369", "20.956239757848277,105.80954074859619"
    setFrom({
      lat: 20.988978804384576,
      lng: 105.79468131065369,
    });

    setTo({
      lat: 20.956239757848277,
      lng: 105.80954074859619,
    });
  }, [setFrom, setTo]);

  return (
    <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: 20.988978804384576,
        longitude: 105.79468131065369,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}>
      {from && (
        <Marker
          title="you are here"
          draggable={true}
          coordinate={{
            latitude: from.lat,
            longitude: from.lng,
          }}
          onPress={e => console.log(e.nativeEvent)}
        />
      )}

      {to && (
        <Marker
          title="you are here"
          draggable={true}
          coordinate={{
            latitude: to.lat,
            longitude: to.lng,
          }}
          onPress={e => console.log(e.nativeEvent)}
        />
      )}
      {coords?.value.length > 0 && <Polyline coordinates={coords?.value} />}
    </MapView>
  );
});

export {Stanstacks};
