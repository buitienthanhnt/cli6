import { useSelector } from 'react-redux';
import PaperListFirebase from './PaperListFirebase';
import PaperList from './PaperList';

const PaperHome = ({ navigation }) => {
    const { useFirebase } = useSelector((state) => state.defRe);

    if (useFirebase) {
        return <PaperListFirebase navigation={navigation}></PaperListFirebase>
    }
    return <PaperList navigation={navigation}></PaperList>
}

export default PaperHome;