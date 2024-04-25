import { Component } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Share from 'react-native-share';

const url = 'https://awesome.contents.com/';
const title = 'Awesome Contents';
const message = 'Please check this out.';
const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';

const options = Platform.select({
    ios: {
        activityItemSources: [
            {
                // For sharing url with custom title.
                placeholderItem: { type: 'url', content: url },
                item: {
                    default: { type: 'url', content: url },
                },
                subject: {
                    default: title,
                },
                linkMetadata: { originalUrl: url, url, title },
            },
            {
                // For sharing text.
                placeholderItem: { type: 'text', content: message },
                item: {
                    default: { type: 'text', content: message },
                    message: null, // Specify no text to share via Messages app.
                },
                linkMetadata: {
                    // For showing app icon on share preview.
                    title: message,
                },
            },
            {
                // For using custom icon instead of default text icon at share preview when sharing with message.
                placeholderItem: {
                    type: 'url',
                    content: icon,
                },
                item: {
                    default: {
                        type: 'text',
                        content: `${message} ${url}`,
                    },
                },
                linkMetadata: {
                    title: message,
                    icon: icon,
                },
            },
        ],
    },
    default: {
        title,
        subject: title,
        message: `${message} ${url}`,
    },
});

class ShareBtn extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {

        }
    }

    shareSky = async function(){
        const shareOptions = {
            title: 'Share via',
            message: 'some message',
            url: 'some share url',
            social: Share.Social.TELEGRAM,
            // whatsAppNumber: "9199999999",  // country code + phone number
            filename: 'test' , // only for base64 file in Android
          };

        try {
            const result = await Share.shareSingle(shareOptions);
            console.log('...................', result);
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    onShare = async function () { // https://react-native-share.github.io/react-native-share/docs/share-open
        try {
            const result = await Share.open({
                title: this.props.data.title,
                url: this.props.data.url,
                message: 'read the new paper',
            });
            console.log('...................', result);
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }}
                onPress={() => { this.onShare() }}
            >
                <Text> | </Text>
                <FontAwesome5Icon name='share-alt' size={16} color='#991cff' />
            </TouchableOpacity>
        )
    }
}

export default ShareBtn;
