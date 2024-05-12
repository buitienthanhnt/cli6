import {View, Text, Button} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import useDemo from '@hooks/useDemo';
import rApi from '@netWork/rApi';

const DemoMemo = () => {
  const [count, setCount] = useState(0);
  const {val, d} = useDemo();

  // const getData = ()=>{}; // can dung useCallBack do co dung trong ChildrentComponent
  const getData = useCallback(() => {}, []);

  useEffect(() => {
    console.log('====================================');
    console.log('run useEffect');

    return () => {
      console.log('====================================');
      console.log('run return function in useEffect');
    };
  }, [count]);

  return (
    <View>
      <Text>DemoMemo count: {count}</Text>
      <Button
        title="click"
        onPress={() => {
          setCount(old => old + 1);
        }}
      />
      <Childrent val={count} getData={getData} />

      <Text>gia tri cua val:: n {val}</Text>
      <Button
        title={'call resresh token'}
        onPress={() => {
          rApi.setRefreshToken();
        }}
      />
    </View>
  );
};

// const Childrent = ()=>{
//     console.log('====================================');
//     console.log("Childrent 123");
//     console.log('====================================');
//     return(<View>
//         <Text>Childrent Childrent</Text>
//     </View>)
// }

// so sanh nong" https://stackoverflow.com/questions/36084515/how-does-shallow-compare-work-in-react
const Childrent = React.memo(
  () => {
    console.log('Childrent 123');
    console.log('====================================');
    return (
      <View>
        <Text>Childrent Childrent</Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return true;
    // return prevProps.count === nextProps.count // true sẽ không reRender, false sẽ reRender
    // mặc định hàm này nếu khai báo hàm này sẽ return false nên sẽ bị reRender do đó không nên đưa hàm này vào nếu không cần
  },
);

export default DemoMemo;
