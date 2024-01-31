import { Component } from "react";
import { Text, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PaperInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { info } = this.props;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text>{info?.view_count} </Text>
                    <FontAwesome5Icon name='eye' size={12} color='#2ec2ff' />
                </View>

                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text> | </Text>
                    <FontAwesome5Icon name='thumbs-up' size={12} color='#ff2290' />
                    <Text> {info?.like}</Text>
                </View>

                <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
                    <Text> | {info?.comment_count} </Text>
                    <Icon name='comment' size={12} color='tomato' />
                </View>
            </View>
        )
    }
}