/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'

export default class TimelineTwo extends Component {
    constructor() {
        super()
        this.onEventPress = this.onEventPress.bind(this)
        this.renderSelected = this.renderSelected.bind(this)

        this.data = [
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment,',
                lineColor: '#009688',
                // icon: require('../img/archery.png'),
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '10:45',
                title: 'Play Badminton',
                description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
                // icon: require('../img/badminton.png'),
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
            },
            {
                time: '12:00',
                title: 'Lunch',
                // icon: require('../img/lunch.png'),
            },
            {
                time: '14:00',
                title: 'Watch Soccer',
                description: 'Team sport played between two teams of eleven players with a spherical ball. ',
                lineColor: '#009688',
                // icon: require('../img/soccer.png'),
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
            },
            {
                time: '16:30',
                title: 'Go to Fitness center',
                description: 'Look out for the Best Gym & Fitness Centers around me :)',
                // icon: require('../img/dumbbell.png'),
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
            },
            {
                time: '18:30',
                title: 'Go to homer',
                description: 'Look out for the Best Gym & Fitness Centers around me :)',
                // icon: require('../img/dumbbell.png'),
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
            }
        ]
        this.state = { selected: null }
    }

    onEventPress(data) {
        this.setState({ selected: data })
    }

    renderSelected() {
        if (this.state.selected)
            return <Text style={{ marginTop: 10 }}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderSelected()}
                <Timeline
                    style={styles.list}
                    data={this.data}
                    circleSize={14}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 52, }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 4, borderRadius: 8 }}
                    descriptionStyle={{ color: 'gray', marginTop: 0 }}
                    options={{
                        style: { paddingTop: 0 }
                    }}
                    //   innerCircle={'icon'}
                    onEventPress={this.onEventPress}
                    separator={false}
                    titleStyle={{ marginTop: 0 }}
                    detailContainerStyle={{ marginBottom: 8, paddingLeft: 4, paddingRight: 4, backgroundColor: "#BBDAFF", borderRadius: 10, }}
                    columnFormat='two-column'
                    innerCircle={'dot'} // thêm hình tròn màu trắng ở giữa.  
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 4,
        // paddingTop:65,
        // backgroundColor:'white'
    },
    list: {
        flex: 1,
        // marginTop:20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
});