import { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Icon from 'react-native-vector-icons/FontAwesome';
import {debounce} from 'lodash'
import { addLike } from "@queries/paper";
import { PaperDetailContext } from "../PaperContext"

export default class DetailLike extends Component {
    static contextType = PaperDetailContext
    constructor(props) {
        super(props)
        this.state = {
            liked: false,
            hearted: false
        }
    }

    addAction = debounce(function(type){
        console.log(this.context);
        if(type === 'like'){
            if (this.state.liked) {
                addLike(this.context.paperId, {type: 'like', action: 'sub'})
            }else{
                addLike(this.context.paperId, {type: 'like', action: 'add'})
            }
            this.setState({...this.state, liked: !this.state.liked});
            return;
        }
        if(type === 'heart'){
            if (this.state.heart) {
                addLike(this.context.paperId, {type: 'heart', action: 'sub'})
            }else{
                addLike(this.context.paperId, {type: 'heart', action: 'add'})
            }
            this.setState({...this.state, hearted: !this.state.hearted})
            return;
        }
    }, 400)

    render() {
        const { info } = this.props;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity 
                    onPress={()=>{this.addAction('like')}}
                    style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'baseline' }}>
                    {this.state.liked ?
                        <Icon name='thumbs-up' size={14} color='red' />
                        :
                        <FontAwesome5Icon name='thumbs-up' size={14} color='red' />}
                    <Text> { Number(info?.like) + (this.state.liked ? 1 : 0)}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>{this.addAction('heart')}}
                    style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text> | {Number(info?.heart) + (this.state.hearted ? 1 : 0)} </Text>
                    {this.state.hearted ?
                        <Icon name='heart' size={14} color='red' />
                        :
                        <FontAwesome5Icon name='heart' size={14} color='red' />}
                </TouchableOpacity>
            </View>
        )
    }
}