import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth, {GoogleAuthProvider, firebase} from '@react-native-firebase/auth'; // https://rnfirebase.io/reference/auth/user
import {GoogleSignin} from '@react-native-google-signin/google-signin'; // yarn add @react-native-google-signin/google-signin
import Icon from 'react-native-vector-icons/FontAwesome';
import useDispatchState from '@hooks/redux/useDispatchState';
import {useSelector} from 'react-redux';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useLogin from '@hooks/useLogin';

// https://codingpr.com/react-firebase-auth-tutorial/
// https://codingpr.com/react-firebase-password-reset-feature/

GoogleSignin.configure({
  webClientId:
    '515691323092-skujhelipo5161lqdtoif44qa759q3ha.apps.googleusercontent.com',
});

const Login = props => {
  const top = useSharedValue(Dimensions.get('screen').height);
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [fullName, setFullName] = useState({
    name: 'name',
    familyName: 'family',
  });
  const [title, setTitle] = useState({value: 'useEffect() i a Hooks'});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const {mutate, isLoading} = useLogin(
    {email: email, password: password},
    () => {
      console.log('___________login success');
    },
  );

  const {user_data} = useSelector(state => state.authenRe);
  const {actionReducer, updateState} = useDispatchState();

  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onAuthStateChanged = user => {
    setUser(user);
    if (user) {
      props.navigation.navigate('UserDetail');
    }
  };

  useEffect(() => {
    top.value = withTiming(0, {
      duration: 1200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [top]);

  const updateEmail = () => {
    const authen = auth().currentUser;
    authen
      .updateEmail('thanh.bui@jmango360.com')
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  };

  // useEffect gọi khi có sư thay đổi trong component
  // setState() nếu là 1 object thì sẽ luôn luôn là thay đổi(nên sẽ gọi: useEffect)(object không đại diện cho các giá trị trong nó) cho nên thông thường cần lắng nghe 1 giá trị cụ thể trong đó,
  // nếu là 1 value đơn thì sẽ thay đổi khi value thực thay đổi cho nên sẽ gọi useEffect khi giá trị thực thay đổi.
  // nếu để  dependence là: [] sẽ chỉ gọi 1 lần duy nhất.
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    // console.log("=======>", title);
    // crashlytics().log('App mounted.');
    // setFullName({name:'TrungHC',familyName: 'HCT'});
    // setValue(value+1);
    // setTitle({value: "bbbbbbbbbbbbb"});

    auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
  }, [error, onAuthStateChanged]); // dependence phải lắng nghe giá trị cụ thể còn dạng object: {} sẽ không được vì 1 object có thể có nhiều thuộc tính và nó không liên quan.

  // hàm tính: trả về giá trị cụ thể dựa vào lần tính trước đó.
  // nó sẽ lắng nghe có sự thay đổi để xác định xem có thực hiện tính toán lại hay không. Nếu không sẽ trả về  value luôn mà không cần tính toán lại.
  // useMemo(() => {
  //     // các phần xử lý trước để trả về giá trị.
  //     return {
  //         value: "opopopo"
  //     };
  // }, [value]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message]);

  useEffect(() => {
    if (user_data) {
      return () => {
        props.route.params.onSuccess();
      };
    }
  }, [props.route.params, user_data]);

  if (user) {
    console.log(user);
    return (
      <View style={{padding: 12}}>
        <Text>Logined</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          user: {user.email}
        </Text>
        <Text />
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(119, 193, 145, 0.8)',
            borderRadius: 18,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'));
          }}>
          <Text>LogOut</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // open windown login by google account.
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  /**
   * Update password by email.
   */
  const passwordReset = async () => {
    if (email) {
      await auth().sendPasswordResetEmail(email); // send link change password to email and change in open link.
      console.log('running');
      setMessage({
        type: 'success',
        value:
          'sended email to change password, Please change and login with new password',
      });
    } else {
      setError(true);
    }
  };

  const verifyPhoneNumber = () => {
    firebase
      .auth()
      .verifyPhoneNumber('+1 650-555-3434', 60)
      .on('state_changed', phoneAuthSnapshot => {
        console.log(phoneAuthSnapshot);
        console.log('+1 650-555-3434');
        console.log('Snapshot state: ', phoneAuthSnapshot.state);
        //    return Promise.reject(
        //       new Error('Code not sent!')
        //     );
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  const signInPhone = () => {
    return auth()
      .signInWithPhoneNumber('+84702032201')
      .then(result => {
        console.log('11111', result);
      });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onClose = useCallback(() => {
    top.value = withTiming(Dimensions.get('screen').height, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
    setTimeout(() => {
      props.navigation.goBack();
    }, 1000);
  }, [props.navigation, top]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onLogin = useCallback(() => {
    if (!email || !password) {
      setMessage({
        type: 'error',
        value: 'email & password is required!',
      });
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      if (reg.test(email) === false) {
        console.log('Email is Not Correct');
        return false;
      }
      updateState(actionReducer.setUser, {
        email: email,
        password: password,
      });
      onClose();
      return;
      // use google firebase
      // auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then(() => {
      //     console.log('User account created & signed in!');
      //   })
      //   .catch(error => {
      //     if (error.code === 'auth/email-already-in-use') {
      //       console.log('That email address is already in use!');
      //     }
      //
      //     if (error.code === 'auth/invalid-email') {
      //       console.log('That email address is invalid!');
      //     }
      //
      //     console.error(error);
      //   });
    }
  }, [actionReducer.setUser, email, onClose, password, updateState]);

  return (
    <Animated.View style={{top: top, flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={{height: (Dimensions.get('screen').width * 3) / 5}}
          onPress={onClose}
        />
        <TouchableWithoutFeedback
          style={{
            backgroundColor: 'red',
          }}
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <ImageBackground
            style={{
              flex: 1,
              padding: 20,
            }}
            imageStyle={{
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            source={require('../../assets/pexels-brakou-abdelghani-1723637.jpg')}>
            {message && (
              <Text
                style={{color: message.type === 'success' ? 'green' : 'red'}}>
                {message.value}
              </Text>
            )}
            {error && <Text style={{color: 'red'}}>email is required!</Text>}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'rgba(0, 174, 215, 0.7)',
                padding: 10,
              }}
              placeholder="input email"
              placeholderTextColor={'rgba(0, 174, 215, 0.7)'}
              onChangeText={value => {
                setEmail(value);
              }}
            />
            <TextInput
              className={'mt-3'}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'rgba(0, 174, 215, 0.7)',
                padding: 10,
              }}
              placeholder="input password"
              secureTextEntry={true}
              placeholderTextColor={'rgba(0, 174, 215, 0.7)'}
              onChangeText={value => {
                setPassword(value);
              }}
            />
            <TouchableOpacity
              className={'mt-3'}
              style={{
                backgroundColor: 'rgba(119, 193, 145, 0.8)',
                borderRadius: 18,
                height: 36,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={mutate}>
              <Text style={{fontSize: 16}}>
                {isLoading ? 'loading...' : 'Login'}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 1.0)',
                  borderRadius: 18,
                  height: 36,
                  shadowColor: '#52006A',
                  elevation: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  onGoogleButtonPress().then(() => {
                    console.log('Signed in with Google!');
                    console.log(auth().currentUser);
                  })
                }>
                <Text style={{color: 'tomato'}}>
                  <Icon name="google" size={18} color="tomato" /> google
                </Text>
              </TouchableOpacity>
              <Text />

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0, 174, 215, 0.7)',
                  borderRadius: 18,
                  height: 36,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  console.log('forgot password');
                  passwordReset();
                }}>
                <Text>forgot password e</Text>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(119, 193, 145, 0.8) ',
                    borderRadius: 8,
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: 'white',
                    elevation: 20,
                    padding: 8,
                  }}
                  onPress={() => {
                    verifyPhoneNumber();
                  }}>
                  <Text>verify phoneNumber</Text>
                </TouchableOpacity>

                <Text />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(119, 193, 145, 0.8)',
                    borderRadius: 8,
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                  }}
                  onPress={() => {
                    signInPhone();
                  }}>
                  <Text>signIn by phoneNumber</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <Image
                // source={require("../../assets/trail-5yOnGsKUNGw-unsplash.jpg")}
                style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, resizeMode: 'cover' }}
                defaultSource={require("../../assets/trail-5yOnGsKUNGw-unsplash.jpg")}
            ></Image> */}
            {/* <Text>
                login screen 1
            </Text> */}

            {/* <Button title="add value" onPress={() => {
                setValue(value + 1);
            }}></Button> */}

            {/* <Text></Text> */}

            {/* <Button title="call crashlytics" onPress={()=>{
                console.log('crashlytics');
                crashlytics().crash();
            }}></Button> */}

            {/* <Text>{value}</Text>
            <Button title="change title" onPress={() => {
                // setTitle({value: "aaaaaa"});
                setFullName({ name: 'TrungHC', familyName: 'HCT' });
                // setValue(value);
            }}></Button>
            <Text>{title.value}</Text>

            <Text>{fullName.name}</Text>
            <Text>{fullName.familyName}</Text> */}
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default Login;

// currentUser
// {
//     "displayName":null,
//     "email":"jane.doe@example.com",
//     "emailVerified":false,
//     "isAnonymous":false,
//     "metadata":{
//        "creationTime":1698676501083,
//        "lastSignInTime":1698676501083
//     },
//     "multiFactor":{
//        "enrolledFactors":[
//           "Array"
//        ]
//     },
//     "phoneNumber":null,
//     "photoURL":null,
//     "providerData":[
//        [
//           "Object"
//        ]
//     ],
//     "providerId":"firebase",
//     "tenantId":null,
//     "uid":"wnwXEnEIPFMAjOCYbZq38Yuss532"
//  }
