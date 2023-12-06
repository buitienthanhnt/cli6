import { View, Text, TextInput, Button, Switch } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import database from '@react-native-firebase/database';
import { sources } from '@services/firebase';

const FsourceForm = () => {
    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const [active, setActive] = useState(false);

    const onSubmit = data => {
        let ref = database().ref(sources).push();
        ref.set(data);
    };

    return (
        <View style={{ padding: 8, gap: 10 }}>
            <Text>from source firebase</Text>

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text>name: </Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: 'violet',
                                borderRadius: 4,
                                width: '70%'
                            }}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    </View>
                )}
                name="name"
                rules={{ required: false }}
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text>email: </Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: 'violet',
                                borderRadius: 4,
                                width: '70%'
                            }}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    </View>
                )}
                name="email"
                rules={{ required: false }}
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text>phone: </Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: 'violet',
                                borderRadius: 4,
                                width: '70%'
                            }}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType="numeric"
                        />
                    </View>
                )}
                name="phone"
                rules={{ required: false }}
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={{ flexDirection: 'row', width: '70%' }}>
                        <Text>active: </Text>
                        <Switch
                            style={{
                                // backgroundColor: 'red',
                                // alignItems: 'flex-start',
                                // alignContent: 'flex-start',
                                // width: "70%"
                            }}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={active ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => {
                                onChange(value)
                                setActive(value)
                            }}
                            value={active}
                        />
                    </View>
                )}
                name="active"
                rules={{ required: false }}
            />

            <View style={{ marginVertical: 8 }}>
                <Button
                    styles={{ height: 40 }}
                    title="add source"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>

        </View>
    )
}

export default FsourceForm;