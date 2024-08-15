import {Text} from 'react-native';
import React, {useContext} from 'react';
import {PaperDetailContext} from '@screens/PaperScreen/PaperContext';

const Title = () => {
  const {title} = useContext(PaperDetailContext);

  return (
    <Text
      style={{
        fontSize: 18,
        fontWeight: '600',
        color: 'green',
        // textDecorationLine: 'underline',
        paddingVertical: 4,
        borderRadius: 4,
      }}>
      {title}
    </Text>
  );
};

export default Title;
