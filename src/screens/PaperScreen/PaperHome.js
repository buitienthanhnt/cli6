import {useSelector} from 'react-redux';
import PaperListFirebase from './PaperListFirebase';
import PaperListFunc from './PaperListFunc';

const PaperHome = ({navigation}) => {
  const {useFirebase} = useSelector(state => state.defRe);

  if (useFirebase) {
    return <PaperListFirebase navigation={navigation} />;
  }
  return <PaperListFunc navigation={navigation} />;
};

export default PaperHome;
