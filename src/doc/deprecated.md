để không log cảnh báo thư viện: deprecated:
b1: cài:
yarn add patch-package postinstall-postinstall
b2: cài: 
yarn add deprecated-react-native-prop-types
b3: vào: node_modules/react-native/index.js (dưới dòng: // Deprecated Prop Types)
xóa: 
console.error(
      'ViewPropTypes will be removed from React Native, along with all ' +
        'other PropTypes. We recommend that you migrate away from PropTypes ' +
        'and switch to a type system like TypeScript. If you need to ' +
        'continue using ViewPropTypes, migrate to the ' +
        "'deprecated-react-native-prop-types' package.",
    );
trong các hàm: ColorPropType(), EdgeInsetsPropType(), PointPropType(), ViewPropTypes()
