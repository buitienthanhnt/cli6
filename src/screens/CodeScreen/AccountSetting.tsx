import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {formatDate} from '@utils/helper';
import LoadingBtn from '@elements/LoadingBtn';
import useLogout from '@hooks/useLogout';
import {Navigate} from '@hooks/Navigate';

const AccountSetting = () => {
  // @ts-ignore
  const {user_data} = useSelector(state => state.authenRe);
  const {mutate, isLoading} = useLogout();

  useEffect(() => {
    // if (!user_data) {
    //   Navigate('Login', {});
    // }
  }, [user_data]);

  if (!user_data) {
    return (
      <TouchableOpacity
        style={{padding: 16, alignItems: 'center'}}
        onPress={() => {
          Navigate('Login', {});
        }}>
        <Text style={{fontSize: 16, fontWeight: '600'}}>
          please <Text style={{color: '#009cff'}}>login</Text> to continue this
          process
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Account Setting</Text>
      <Text>name: {user_data.name}</Text>
      <Text>email: {user_data.email}</Text>
      <Text>last updated: {formatDate(user_data.updated_at)}</Text>
      <LoadingBtn
        loading={isLoading}
        onPress={() => {
          console.log(user_data);
          if (user_data) {
            mutate();
          }
        }}
        style={{
          borderRadius: 5,
          backgroundColor: '#fff',
          borderColor: 'green',
          borderWidth: 1,
          width: '100%',
          marginVertical: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#009cff'}}>
          Logout now
        </Text>
      </LoadingBtn>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
export default AccountSetting;
