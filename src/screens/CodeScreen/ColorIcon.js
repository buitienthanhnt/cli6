import React, { Component, useState } from "react";
import {
    StyleSheet, View, Text, TextInput, Clipboard, TouchableOpacity, Button,
    ScrollView, ToastAndroid, Platform, Dimensions, LogBox,
} from "react-native";
import { Tooltip } from 'react-native-elements';                                     // npm i react-native-elements
import { ColorPicker, TriangleColorPicker, toHsv } from 'react-native-color-picker'; // npm install react-native-color-picker --save & npm install @react-native-community/slider --save
import { SketchPicker, SwatchesPicker, PhotoshopPicker } from 'react-color';         // npm install react-color --save :: https://casesandberg.github.io/react-color/
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';                            // // xem icon https://oblador.github.io/react-native-vector-icons/
//import { Ionicons } from '@expo/vector-icons';                  // chạy được cả trên web và android. xem icon: https://icons.expo.fyi || install: npm i @expo/vector-icons
import ColorPickerWheel from 'react-native-wheel-color-picker';   // npm install react-native-wheel-color-picker
import { icons } from "./icons";
import {debounce} from 'lodash'
// Ignore log notification by message
// LogBox.ignoreLogs(['Warning: ...']); // ẩn các lỗi có dạng:
// https://loading.io/ xem ảnh gif động.

//Ignore all log notifications
LogBox.ignoreAllLogs();                 // ẩn thộng báo tất cả các lỗi cảnh báo màu vàng hiện trên màn hình.

class ColorIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FindIcon></FindIcon>
                <View style={{ backgroundColor: "black", height: 1 }}></View>
                {(() => {
                    if (Platform.OS == 'web') {
                        return <FindColor></FindColor>;
                    } else {
                        return <FindColorMobile />;
                    }
                })()}
                {/* <More></More> */}
            </View>
        );
    }
}

class FindIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon_name: "bug", // bug analytics
            color: "tomato",
            size: "28",
            copiedText: "",
            find_icon: false,
            use_find_icon: 0,
            searchText: 'bug',
            currrenText: '',
            searchIcon: [],
        };
    }

    fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
    };

    componentDidUpdate(nextProps, nextState, nextContext) {
        if (this.state.searchText.length >= 3 && this.state.searchText !== nextState.searchText) {
            const searchValue = icons.filter((val) => {
                return val.includes(this.state.searchText)
            });
            if (searchValue.length > 0) {
                this.setState({ ...this.state, searchIcon: searchValue })
            }
        }
    }

    setColor = debounce((text)=>{
        this.setState({ ...this.state, color: text });
    }, 400)

    setSize = debounce((text)=>{
        this.setState({ ...this.state, size: text });
    }, 400)

    render() {
        return (
            <View style={{ padding: 6 }}>
                <Text style={css.title}>Find Icon image</Text>
                {/* <Icon name={"home"} size={26} color={'red'} /> */}
                <View style={css.icon}>
                    <Text style={{ fontSize: 18 }}>icon name:</Text>
                    <TextInput
                        value={(this.state.icon_name)}
                        style={css.icon_input_name}
                        onChangeText={(text) => {
                            this.setState({ ...this.state, searchText: text.toLowerCase(), icon_name: text.toLowerCase() });
                        }}
                        onFocus={() => {
                            this.setState({ ...this.state, find_icon: false });
                        }}
                    ></TextInput>
                    {this.state.searchIcon.length > 0 &&
                        <View style={css.resultView}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {this.state.searchIcon.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index+'_icon'} onPress={() => {
                                            this.setState({ ...this.state, icon_name: item, searchText: '' });
                                        }}>
                                            <Text style={{ fontSize: 16, color: '#ce00ff', lineHeight: 24, textAlign: 'right' }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                                <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={() => {
                                    this.setState({ ...this.state, searchIcon: [] })
                                }}>
                                    <Icon name='remove' size={24} color='#878787'/>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    }
                </View>
                <View style={css.icon}>
                    <Text style={{ fontSize: 18 }}>icon color:</Text>
                    <TextInput
                        value={this.state.color}
                        style={css.icon_input_size}
                        onChangeText={(text) => {
                            this.setColor(text);
                        }}
                    ></TextInput>
                </View>

                <View style={css.icon}>
                    <Text style={{ fontSize: 18 }}>icon size:</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={this.state.size}
                        style={css.icon_input_size}
                        onChangeText={(text) => {
                            this.setSize(text)
                        }}
                    ></TextInput>
                </View>
                <View>
                    {/* <Button title="find icon" onPress={() => {
                        this.setState({ find_icon: true });
                    }}></Button> */}
                </View>

                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
                        {/* // copyToClipboard */}
                        <TouchableOpacity onPress={() => {
                            copyToClipboard("import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';");
                            alert('coppied!!')
                        }}>
                            <FontAwesome5Icon name='copy' size={16} color='tomato' />
                        </TouchableOpacity>
                        <Text style={{ color: '#c500ff' }}> import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';</Text>
                    </ScrollView>
                    <View >
                        <View style={css.icon}>
                            <Tooltip popover={<Text>coppied to Clipboard</Text>}
                                withOverlay={false}
                                skipAndroidStatusBar={true}
                                onOpen={() => {
                                    copyToClipboard(`<FontAwesome5Icon name='${this.state.icon_name}' size={${this.state.size}} color='${this.state.color}'/>`);
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>FontAwesome5Icon(size={this.state.size}): <FontAwesome5Icon name='copy' size={16} color='tomato' /></Text>
                            </Tooltip>
                            {(() => {
                                if (this.state.use_find_icon) {
                                    return (<FontAwesome5Icon name={this.state.find_icon ? this.state.icon_name : null} size={Number(this.state.size)} color={this.state.color} style={{ marginLeft: 10 }} />);
                                } else {
                                    return (<FontAwesome5Icon name={this.state.icon_name} size={Number(this.state.size)} color={this.state.color} style={{ marginLeft: 10 }} />);
                                }
                            })()}
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <Text style={{}}>
                                {`<FontAwesome5Icon name='${this.state.icon_name}' size={${this.state.size}} color='${this.state.color}'/>`}
                            </Text>
                        </ScrollView>
                        <View style={{ backgroundColor: "black", height: 1 }}></View>
                    </View>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
                        <TouchableOpacity onPress={() => {
                            copyToClipboard("import Icon from 'react-native-vector-icons/FontAwesome';");
                            alert('coppied!!');
                        }}>
                            <FontAwesome5Icon name='copy' size={16} color='tomato' />
                        </TouchableOpacity>
                        <Text style={{ color: '#0089ff' }}> import Icon from 'react-native-vector-icons/FontAwesome';</Text>
                    </ScrollView>
                    <View >
                        <View style={css.icon}>
                            <Tooltip popover={<Text>coppied to Clipboard</Text>}
                                withOverlay={false}
                                skipAndroidStatusBar={true}
                                onOpen={() => {
                                    copyToClipboard(`<Icon name='${this.state.icon_name}' size={${this.state.size}} color='${this.state.color}'/>`);
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>Icon(size={this.state.size}): <FontAwesome5Icon name='copy' size={16} color='tomato' /></Text>
                            </Tooltip>
                            {(() => {
                                if (this.state.use_find_icon) {
                                    return (<Icon name={this.state.find_icon ? this.state.icon_name : null} size={Number(this.state.size)} color={this.state.color} style={{ marginLeft: 10 }} />);
                                } else {
                                    return (<Icon name={this.state.icon_name} size={Number(this.state.size)} color={this.state.color} style={{ marginLeft: 10 }} />);
                                }
                            })()}
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <Text>
                                {`<Icon name='${this.state.icon_name}' size={${this.state.size}} color='${this.state.color}'/>`}
                            </Text>
                        </ScrollView>
                        <View style={{ backgroundColor: "black", height: 1 }}></View>
                    </View>
                </View>
            </View>
        );
    }
}

const FindColorMobile = () => {
    const [colorselect, setColorselect] = useState(null);
    const [colorwheel, setColorwheel] = useState("");
    function onColorChange(color) {
        setColorwheel(color);
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}  // ẩn thanh trượt
            showsHorizontalScrollIndicator={false}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ColorPicker
                    onColorSelected={(color) => {
                        //    alert(`Color selected: ${color}`)
                        setColorselect(color);
                    }}
                    style={{ width: "80%", height: Dimensions.get("window").width / 10 * 8 }}
                />
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 18 }}>Color selected: {colorselect} </Text>
                    <TouchableOpacity onPress={() => {
                        copyToClipboard(colorselect);  // #36ff00
                        ToastAndroid.show(`coppied: ${colorselect}`, 2000);
                    }}>
                        <FontAwesome5Icon name='copy' size={28} color='tomato' />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ backgroundColor: "black", height: 1, marginTop: 8, marginBottom: 8 }}></View>

            <View style={{ alignItems: "center", paddingLeft: 10 }}>
                <ColorPickerWheel
                    color={colorwheel}
                    onColorChange={(color) => onColorChange(color)}
                    // onColorChangeComplete={color => alert(`Color selected: ${color}`)}
                    thumbSize={20}
                    sliderSize={20}
                    noSnap={true}
                    row={false}
                    style={{ width: "80%" }}
                />
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ fontSize: 18 }}>Color selected: {colorwheel} </Text>
                    <TouchableOpacity onPress={() => {
                        copyToClipboard(colorwheel);  // #36ff00
                        ToastAndroid.show(`coppied: ${colorwheel}`, 2000);
                    }}>
                        <FontAwesome5Icon name='copy' size={28} color='tomato' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ backgroundColor: "black", height: 1, marginTop: 8, marginBottom: 8 }}></View>
        </ScrollView >
    );
}

class FindColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: null,
            background: '#fff',
            swatch_color: null
        };
    }

    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}  // ẩn thanh trượt
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 6, padding: 6, flex: 1 }}>
                <View style={{ alignItems: "center" }}>
                    <SketchPicker
                        width={"100%"}
                        color={this.state.background}
                        onChangeComplete={(color) => {
                            this.setState({ color: color, background: color.hex }); //JSON.stringify(obj)
                            console.log(color);
                        }}
                    />
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 20 }}>Hex: {this.state.color ? this.state.background : ""}</Text>
                        <FontAwesome5Icon style={{ marginLeft: 8 }} name='copy' size={24} color='tomato' onPress={() => {
                            copyToClipboard(this.state.background);
                            if (Platform.OS != "web") {
                                ToastAndroid.show("coppied!", 2000);
                            } else {
                                alert("coppied!");
                            }
                        }} />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 20 }}>rgb: {this.state.color ? JSON.stringify(this.state.color.rgb) : ""}</Text>
                        <FontAwesome5Icon style={{ marginLeft: 8 }} name='copy' size={24} color='tomato' onPress={() => {
                            if (this.state.color) {
                                copyToClipboard(JSON.stringify(this.state.color.rgb));
                            }
                            if (Platform.OS != "web") {
                                ToastAndroid.show("coppied!", 2000);
                            } else {
                                alert("coppied!");
                            }
                        }} />
                    </View>
                </View>

                <View style={{ marginTop: 6, padding: 6 }}>
                    <SwatchesPicker width={"100%"} onChange={(color, event) => {
                        this.setState({ swatch_color: color });
                    }} />

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 20 }}>Hex: {this.state.swatch_color ? this.state.swatch_color.hex : ""}</Text>
                        <FontAwesome5Icon style={{ marginLeft: 8 }} name='copy' size={24} color='tomato' onPress={() => {
                            copyToClipboard(this.state.swatch_color.hex);
                            if (Platform.OS != "web") {
                                ToastAndroid.show("coppied!", 2000);
                            } else {
                                alert("coppied!");
                            }
                        }} />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 20 }}>rgb: {this.state.swatch_color ? JSON.stringify(this.state.swatch_color.rgb) : ""}</Text>
                        <FontAwesome5Icon style={{ marginLeft: 8 }} name='copy' size={24} color='tomato' onPress={() => {
                            if (this.state.swatch_color) {
                                copyToClipboard(JSON.stringify(this.state.swatch_color.rgb));
                            }
                            if (Platform.OS != "web") {
                                ToastAndroid.show("coppied!", 2000);
                            } else {
                                alert("coppied!");
                            }
                        }} />
                    </View>
                </View>

                {/* <PhotoshopPicker onChangeComplete={(color, event) => {
                    console.log(color, event);
                }} /> */}

                {/* <ColorPicker
                    onColorSelected={color => alert(`Color selected: ${color}`)}
                    style={{ flex: 1 }}
                /> */}
            </ScrollView>
        );
    }
}

const copyToClipboard = (text) => {
    Clipboard.setString(text);
};

const css = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    icon_input_name: {
        height: 36,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 6,
        paddingLeft: 8,
        width: "40%",
        marginLeft: 10
    },
    icon_input_size: {
        height: 36,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 6,
        paddingLeft: 8,
        width: "40%",
        marginLeft: 10
    },
    icon: {
        flexDirection: "row",
        marginTop: 8,
        justifyContent: "space-between"
    },
    resultView: {
        position: 'absolute',
        height: 120,
        borderWidth: 1,
        borderColor: '#00cbff',
        borderRadius: 10,
        width: '50%',
        right: Dimensions.get('screen').width / 100 * 40,
        paddingHorizontal: 8,
        gap: 2, top: 16
    },
});

export default ColorIcon;

// lỗi:  Invariant Violation: Slider has been removed from react-native core. It can now be installed and imported from '@react-native-community/slider' instead of 'react-native'. See:
// vào:  node_modules/react-native-color-picker/dist/HoloColorPicker.js
// and delete: "Slider" that is imported from react-native and add this:
// import Slider from "@react-native-community/slider";
// Do the same for: node_modules/react-native-color-picker/src/HoloColorPicker.tsx
// <FontAwesome5Icon name='bug' size={28} color='#00ebff'/>