import {useSelector} from 'react-redux';
import PaperListFirebase from './PaperListFirebase';
import PaperList from './PaperList';

const PaperHome = ({navigation}) => {
  const {useFirebase} = useSelector(state => state.defRe);

  if (useFirebase) {
    return <PaperListFirebase navigation={navigation} />;
  }
  return <PaperList navigation={navigation} />;
};

export default PaperHome;
