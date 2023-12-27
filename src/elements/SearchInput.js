import React, { useState, useCallback } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchInput = (props) => {
    const opacity = useSharedValue(0);
    const [value, setValue] = useState(props.inputSource || []);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');

    const onPressValue = useCallback((item) => {
        setSearch(item.title);
        opacity.value = withSpring(0)
        setVisible(false);
    }, [setSearch, setVisible]);

    const onChange = useCallback((text) => {
        setSearch(old => text);
        if (text.length === 0) {
            setValue(props.inputSource);
        }
        if (text.length >= 3) {
            const searchValue = props.inputSource.filter((item, index) => {
                return item.title.toLowerCase().search(search.toLowerCase()) != -1;
            });
            setValue(searchValue);
        }
    }, [search, setSearch, setValue])

    return (
        <View style={props.style || {}}>
            <View style={{ paddingHorizontal: 20, height: 'auto', }}>
                <View
                    style={{
                        borderWidth: 1, borderRadius: 10, borderColor: '#68bcff',
                        flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'
                    }}>
                    <TextInput
                        placeholder='search...'
                        style={{ paddingHorizontal: 10, height: 40, paddingVertical: 5, flex: 1 }}
                        onFocus={() => {
                            setVisible(true);
                            opacity.value = withSpring(1)
                        }}
                        value={search}
                        onChangeText={onChange}
                    ></TextInput>
                    {search && <Icon name='remove' size={24} color='black' onPress={() => {
                        setSearch('');
                    }} />}
                </View>

                {visible && <Animated.View style={{
                    borderWidth: 1, borderRadius: 10, position: 'absolute', borderColor: '#68bcff',
                    marginTop: 50, marginHorizontal: 20, width: '100%',
                    height: 160, paddingHorizontal: 10, paddingVertical: 5, zIndex: 999, elevation: 999,
                    opacity
                }}>
                    <ScrollView
                        style={{}}
                        showsVerticalScrollIndicator={false}
                    >
                        {value && value.map((item, index) => {
                            return (
                                <Text
                                    key={index}
                                    onPress={() => { onPressValue(item) }}
                                    style={{ fontSize: 16, lineHeight: 22, fontWeight: 600, color: '#68bcff' }}
                                >
                                    {item.title}
                                </Text>
                            )
                        })}
                    </ScrollView>
                </Animated.View>}
            </View>
        </View>
    );
}

export default SearchInput;