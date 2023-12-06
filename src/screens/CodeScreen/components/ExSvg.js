import Svg, {
    Circle,
    SvgUri,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';
  // import Call from '@assets/svgIcon/call/call.svg'; // **** https://github.com/kristerkari/react-native-svg-transformer

  import React from 'react';
  import { View, StyleSheet } from 'react-native';

  export default class ExSvg extends React.Component {
    render() {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
          ]}>
          <Svg height="50%" width="50%" viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="blue"
              strokeWidth="2.5"
              fill="green"
            />
            <Rect
              x="15"
              y="15"
              width="70"
              height="70"
              stroke="red"
              strokeWidth="2"
              fill="yellow"
            />
          </Svg>

            <Svg
                width="130"
                height="130"
                fill="blue"
                stroke="red"
                color="green"
                viewBox="-16 -16 544 544">
                    <Path
                        d="M318.37,85.45L422.53,190.11,158.89,455,54.79,350.38ZM501.56,60.2L455.11,13.53a45.93,45.93,0,0,0-65.11,0L345.51,58.24,449.66,162.9l51.9-52.15A35.8,35.8,0,0,0,501.56,60.2ZM0.29,497.49a11.88,11.88,0,0,0,14.34,14.17l116.06-28.28L26.59,378.72Z"
                        strokeWidth="32"
                    />
                    <Path d="M0,0L512,512" stroke="currentColor" strokeWidth="32" />
            </Svg>

            <Svg height="100" width="110">
                <Ellipse
                    cx="55"
                    cy="55"
                    rx="50"
                    ry="30"
                    stroke="purple"
                    strokeWidth="2"
                    fill="yellow"
                />
            </Svg>
            {/*<Call stroke='red'></Call>*/}
        </View>
      );
    }
  }
