import { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import PaperInfo from './PaperInfo';

export class ProductItemHost extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { data } = this.props;
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate(this.props.isFirebase ? "PaperDetailFirebase" : "PaperDetail", { data: data });
            }}>
                <View style={css.pro_item_host}>
                    <Image
                        source={{ uri: data.image_path || remoteConfig().getValue('default_image').asString() }}
                        style={{ flex: 1, borderRadius: 6 }} resizeMode="cover"
                        defaultSource={require('@assets/defaul.png')}
                    ></Image>
                    <Text style={css.pro_item_host_title} ellipsizeMode='tail' numberOfLines={2}>
                        {data.title}
                    </Text>
                    <View style={{ paddingLeft: 8 }}>
                        <Text ellipsizeMode='tail' numberOfLines={2}>
                            {data.short_conten}
                        </Text>
                    </View>
                    {data?.info && <PaperInfo info={data.info}></PaperInfo>}
                </View>
            </TouchableOpacity>
        );
    }
}

export class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    render() {
        const { data } = this.props;
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate(this.props.isFirebase ? "PaperDetailFirebase" : "PaperDetail", { data: data });
            }}
            >
                <View style={css.pro_item}>
                    <View style={{ width: "40%" }}>
                        <Image
                            source={{ uri: data.image_path || remoteConfig().getValue('default_image').asString() }}
                            defaultSource={require('@assets/defaul.png')}
                            style={{ flex: 1, borderRadius: 6 }}>
                        </Image>
                    </View>
                    <View style={css.pro_item_title}>
                        <Text style={{ color: "green", fontSize: 16 }} ellipsizeMode='tail' numberOfLines={2}>
                            {data.title}
                        </Text>
                        <View style={{ paddingLeft: 5 }}>
                            <Text ellipsizeMode='tail' numberOfLines={3}>
                                {data?.short_conten}
                            </Text>
                        </View>
                        {data?.info && <PaperInfo info={data.info}></PaperInfo>}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const css = StyleSheet.create({
    pro_item: {
        width: "100%",
        height: Dimensions.get("screen").height / 7,
        flexDirection: "row",
        padding: 5,
        elevation: 3, //: zindex (works on android)
    },
    pro_item_host: {
        width: "100%",
        height: Math.floor(Dimensions.get("screen").height / 3.5), 
        padding: 5
    },
    pro_item_host_title: {
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        color: "blue"
    },
    pro_item_title: {
        width: "60%",
        paddingLeft: 8,
        paddingRight: 8
    }
});