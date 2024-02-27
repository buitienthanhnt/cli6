/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * https://github.com/Eugnis/react-native-timeline-flatlist/blob/master/examples/Example/pages/dotExample.js
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'  // https://www.npmjs.com/package/react-native-timeline-flatlist

export default class TimelineTwo extends Component {
    constructor(props) {
        super(props);
        this.onEventPress = this.onEventPress.bind(this)
        this.renderSelected = this.renderSelected.bind(this)
        this.state = { selected: null }
    }

    onEventPress(data) {
        this.props.navigation.navigate("PaperDetail", { data: data })
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
                    isUsingFlatlist={false} // VirtualizedLists should never be nested inside plain ScrollViews
                    style={styles.list}
                    data={this.props.timeLine}
                    circleSize={14}
                    circleColor='rgb(45,156,219)'  // màu của hình tròn
                    // circleColor='rgba(0,0,0,0)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 52, }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 4, borderRadius: 8 }}
                    descriptionStyle={{ color: 'gray', marginTop: 0 }}
                    options={{
                        style: { paddingTop: 0 }
                    }}
                    // innerCircle={'icon'} // dùng biểu tượng ảnh
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