import React, { Component, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Image, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline } from 'react-native-maps';
import { decode } from "@mapbox/polyline";
import { getDistance, getPreciseDistance } from 'geolib'; // tính khoảng cách giữa 2 điểm
// @ts-ignore
import carImage from '@assets/car.png';
import Geolocation from '@react-native-community/geolocation';
import Location from '@assets/location-svgrepo-comc.svg';
import LocationDelta from '@assets/location-svgrepo-com.svg';
import LocationPin from '@assets/location-pin-1-svgrepo-com.svg';

export default class Nmap extends Component {
  map;
  constructor(props) {
    super(props);
    this.state = {
      prevPos: null,
      curPos: { latitude: 37.420814, longitude: -122.081949 },
      curAng: 45,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    this.changePosition = this.changePosition.bind(this);
    this.getRotation = this.getRotation.bind(this);
    this.updateMap = this.updateMap.bind(this);
  }

  changePosition(latOffset, lonOffset) {
    const latitude = this.state.curPos.latitude + latOffset;
    const longitude = this.state.curPos.longitude + lonOffset;
    this.setState({
      prevPos: this.state.curPos,
      curPos: { latitude, longitude },
    });
    this.updateMap();
  }

  getRotation(prevPos, curPos) {
    if (!prevPos) {
      return 0;
    }
    const xDiff = curPos.latitude - prevPos.latitude;
    const yDiff = curPos.longitude - prevPos.longitude;
    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
  }

  updateMap() {
    const { curPos, prevPos, curAng } = this.state;
    const curRot = this.getRotation(prevPos, curPos);
    this.map.animateCamera({ heading: curRot, center: curPos, pitch: curAng });
  }

  render() {
    return (
      <View style={styles.flex}>
        <MapView
          ref={el => (this.map = el)}
          style={styles.flex}
          minZoomLevel={15}
          initialRegion={{
            ...this.state.curPos,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}>
          <Marker
            coordinate={this.state.curPos}
            anchor={{ x: 0.5, y: 0.5 }}
            image={carImage}
          />
        </MapView>
        <View style={styles.buttonContainerUpDown}>
          <TouchableOpacity
            style={[styles.button, styles.up]}
            onPress={() => this.changePosition(0.0001, 0)}>
            <Text>+ Lat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.down]}
            onPress={() => this.changePosition(-0.0001, 0)}>
            <Text>- Lat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerLeftRight}>
          <TouchableOpacity
            style={[styles.button, styles.left]}
            onPress={() => this.changePosition(0, -0.0001)}>
            <Text>- Lon</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.right]}
            onPress={() => this.changePosition(0, 0.0001)}>
            <Text>+ Lon</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export const Nmap2 = () => {
  const [region, setRegion] = useState({
    latitude: 21,
    longitude: 105.779,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004,
    focus: false
  });

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setRegion({
          ...region, latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
          focus: !region.focus
        })
      },
      (error) => {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        // setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };
  const [coords, setCoords] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(region);

  const getDirections = async (startLoc, destinationLoc) => {
    try {
      const KEY = "AIzaSyACd_uzOBcMiTI6ZR5FoWkTaazO0W7g924"; //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
      );
      let respJson = await resp.json();
      console.log('!!!!!!!!!!', respJson);
      let points = decode(respJson.routes[0].overview_polyline.points);
      console.log(points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    //fetch the coordinates and then store its value into the coords Hook.
    // getDirections("52.5200066,13.404954", "50.1109221,8.6821267")
    //   .then(coords => {
    //     console.log('*******', coords);
    //     setCoords(coords)
    //   })
    //   .catch(err => console.log("Something went wrong"));
  }, []);

  const onRegionChange = (regionValue, detail) => {
    setCurrentRegion(regionValue);
  };

  const calculateDistance = () => {
    var dis = getDistance(
      { latitude: 21.002338967434316, longitude: 105.77928006649017 },
      { latitude: 20.908891717604533, longitude: 105.86095333099365 }
    );
    return dis;
    // alert(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
  };

  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      { latitude: 20.0504188, longitude: 64.4139099 },
      { latitude: 51.528308, longitude: -0.3817765 }
    );
    alert(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);
  };

  // return (<>
  //   <MapView
  //     style={{ flex: 1 }}
  //     initialRegion={{
  //       latitude: 52.5200066,
  //       longitude: 13.404954,
  //       latitudeDelta: 0.1,
  //       longitudeDelta: 0.1
  //     }}
  //   >
  //     {/* finally, render the Polyline component with the coords data */}
  //     {coords.length > 0 && <Polyline coordinates={coords} />}
  //   </MapView>
  // </>)

  return (

    <View style={styles.container2}>
      <MapView
        onRegionChange={onRegionChange}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
        // liteMode={true}
        // mapType={'satellite'} // loai ban do
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => console.log('onpress map:', e.nativeEvent)}
        onMarkerPress={e => console.log('onMarkerPress map:', e.nativeEvent)}
        onLongPress={e => console.log('onLongPress map:', e.nativeEvent)}
        onPoiClick={e => {
          console.log('onPoiClick map:', e.nativeEvent);
          setCurrentRegion(e.nativeEvent.coordinate)
        }}
      >
        {/* danhs dau 1 diem  */}
        <Marker
          title='vn'
          draggable={true}
          coordinate={currentRegion}
          // image={{ uri: 'https://secure.gravatar.com/avatar/5e3d2edb8d65555a83ce87f41fc6560c?s=50&d=identicon&r=g' }}
          onDrag={(e) => { console.log('++++', e); }}
          onPress={e => console.log(e.nativeEvent)}
        >
          <LocationDelta width={25} height={25}></LocationDelta>
        </Marker>

        <Marker
          title='you are here'
          draggable={true}
          coordinate={region}
          onPress={e => console.log(e.nativeEvent)}
        >
          <LocationPin width={25} height={25} stroke="red"></LocationPin>
        </Marker>

      </MapView>
      <View>
        <Text>{currentRegion.latitude}</Text>
        <Text>{currentRegion.longitude}</Text>
        {/* <Text>{currentRegion.latitudeDelta}</Text>
        <Text>{currentRegion.longitudeDelta}</Text> */}
        <Text>{calculateDistance()} met</Text>
        <TouchableOpacity onPress={getOneTimeLocation} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Location width={40} height={40}></Location>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const Nmap3 = () => {
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.boldText}>
            {locationStatus}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Button
              title="Refresh"
              onPress={getOneTimeLocation}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Native Geolocation
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: '100%',
  },
  buttonContainerUpDown: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainerLeftRight: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(100,100,100,0.2)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 50,
    width: 50,
  },
  up: {
    alignSelf: 'flex-start',
  },
  down: {
    alignSelf: 'flex-end',
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#b58df1',
    borderRadius: 24,
    // marginVertical: 50,
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
    textAlign: 'center'
  },
});