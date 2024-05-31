import {
  useCallback,
  useContext,
  useRef,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PaperDetailContext} from '../PaperContext';
import FormInput from '@elements/FormInput';
import {useComments} from '@hooks/usePapers';
import LoadingBtn from '@elements/LoadingBtn';
import {useSelector} from 'react-redux';

const CommentForm = ({parentId}) => {
  const {paperId, commentParent} = useContext(PaperDetailContext);
  const name = useRef(null);
  const email = useRef(null);
  const content = useRef(null);
  const {user_data} = useSelector(state => state.authenRe);
  const {addComment, isLoading} = useComments(paperId);

  const onChangeName = useCallback(text => {
    name.current = text;
  }, []);

  const onChangeEmail = useCallback(text => {
    email.current = text;
  }, []);

  const onChangeContent = useCallback(text => {
    content.current = text;
  }, []);

  return (
    <View style={css.container}>
      <Text style={css.title}>Send your comment:</Text>
      {user_data ? (
        <View>
          {user_data.name && <Text style={css.userInfo}>{user_data.name}</Text>}
          <Text style={css.userInfo}>{user_data.email}</Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row', gap: 2}}>
          <View style={{flex: 1, height: 50}}>
            <FormInput
              label={'User name'}
              placeholder={'user name'}
              onChangeText={onChangeName}
            />
          </View>

          <View style={{flex: 1, height: 50}}>
            <FormInput
              label={'Email'}
              placeholder={'user email'}
              onChangeText={onChangeEmail}
            />
          </View>
        </View>
      )}

      <View style={{height: 90}}>
        <FormInput
          label={'Content'}
          placeholder={'Content'}
          onChangeText={onChangeContent}
          numberOfLines={4}
          inputStyle={{flex: 1, color: 'white'}}
        />
      </View>
      <LoadingBtn
        style={css.btn}
        loading={isLoading}
        onPress={() => {
          // console.log(name.current, email.current, content.current, commentParent);
          addComment(paperId, {
            content: content.current,
            name: name.current,
            email: email.current,
            parent_id: commentParent,
          });
        }}>
        <Text style={css.submitLabel}>Send</Text>
      </LoadingBtn>
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  btn: {
    height: 40,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  title: {
    textDecorationLine: 'underline',
    color: 'white',
    fontSize: 16,
  },
  userInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default CommentForm;
