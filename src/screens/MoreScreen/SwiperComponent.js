import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

import Swiper from 'react-native-swiper' // https://github.com/leecade/react-native-swiper

export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true} loop={true} autoplay={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
		
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
	wrapper: {},
	slide1: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#9DD6EB'
	},
	slide2: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#97CAE5'
	},
	slide3: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#92BBD9'
	},
	text: {
	  color: '#fff',
	  fontSize: 30,
	  fontWeight: 'bold'
	}
  })
// =================================================================
// import React, { Component } from 'react'
// import { Text, View, Image, Dimensions } from 'react-native'
// import Swiper from 'react-native-swiper'
// const { width } = Dimensions.get('window')

// const styles = {
//   wrapper: {},
//   slide: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'transparent'
//   },
//   text: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold'
//   },
//   image: {
//     width,
//     flex: 1
//   },
//   paginationStyle: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10
//   },
//   paginationText: {
//     color: 'white',
//     fontSize: 20
//   }
// }

// const renderPagination = (index, total, context) => {
//   return (
//     <View style={styles.paginationStyle}>
//       <Text style={{ color: 'grey' }}>
//         <Text style={styles.paginationText}>{index + 1}</Text>/{total}
//       </Text>
//     </View>
//   )
// }

// export default class SwiperComponent extends Component {
//   render() {
//     return (
//       <Swiper
//         style={styles.wrapper}
//         renderPagination={renderPagination}
// 		loadMinimal={true}
//         // loop={true}
// 		autoplayTimeout={4}
// 		// autoplay={true}
// 		// autoplayDirection={false}
//       >
//         <View
//           style={styles.slide}
//           title={
//             <Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>
//           }
//         >
// 			{/* <Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text> */}
//           <Image style={styles.image} source={require('../../assets/hinh-ke-ga-3307-1684226630.jpg')} />
//         </View>
//         <View
//           style={styles.slide}
//           title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}
//         >
//           <Image style={styles.image} source={require('../../assets/6623ThuydienLaiChau1_1.jpg')} />
//         </View>
//         <View
//           style={styles.slide}
//           title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}
//         >
//           <Image style={styles.image} source={require('../../assets/Ripple-1s-200px.gif')} />
//         </View>
//         <View
//           style={styles.slide}
//           title={
//             <Text numberOfLines={1}>Learn from Kim K to land that job</Text>
//           }
//         >
//           <Image style={styles.image} source={require('../../assets/hinh-ke-ga-3307-1684226630.jpg')} />
//         </View>
//       </Swiper>
//     )
//   }
// }
