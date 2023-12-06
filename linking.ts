const linking = {
    prefixes: ['myapp://app',],
    config: {
      screens: {
        BottomTabs: {
          screens: {
            AccountScreen: {
              screens: {
                AccountDetail: "AccountDetail/:user_id",
                Login: "login",
                Wishlist: "Wishlist"
              }
            },
            MoreScreen: {
              screens: {
                ColorIcon: 'ColorIcon'
              }
            },
            HomeScreen: {
              screens: {
                Home: "Home"
              }
            },
            PaperScreen: {
              screens: {
                PaperList: 'PaperList',
                PaperDetail: 'PaperDetail/:paper_id', // pass param for screen(get by props.route.params.paper_id)
                WebInApp: 'WebInApp/:storeUrl?',      // WebInApp (dấu hỏi chấm là có thể không truyền giá trị để truyền 1 url làm param cần encode trước)
              }
            },
            CodeScreen: {
              screens: {
                Code: 'Code'
              }
            }
          },
        }
      },
    }
  };

export default linking;

// mở bằng cmd:             npx uri-scheme open "myapp://app/ColorIcon" --android (mở màn hình: ColorIcon trên android)
// chuyển màn bằng Linking Component:  Linking.openURL(`myapp://app/WebInApp/${props?.store?.store?.websiteUrl}`)
// npx uri-scheme open "myapp://app/WebInApp/https%3A%2F%2Fdev.to%2Fgie3d%2Fparameters-for-deep-link-in-react-navigation-6g0" --android (mở màn hình: ColorIcon trên android)
// decode url bằng: decodeURIComponent(props?.route?.params?.storeUrl)


// https://reactnavigation.org/docs/configuring-links/
// https://viblo.asia/p/deep-linking-voi-react-native-GrLZDXGVZk0
// https://viblo.asia/p/cach-su-dung-deep-linking-trong-react-native-Qbq5QEBL5D8
