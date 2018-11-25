import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';

//<prefix><version>/journey/<temporal_type>/<transport_mode>/<operator_id>/<vehicle_number>/<route_id>/<direction_id>/<headsign>/<start_time>/<next_stop>/<geohash_level>/<geohash>/


export default class LiveStatus extends React.Component {

    state = {
        stop: 'Malminkartano',
        nextTrains: [
            {
                key: '1',
                line: 'P',
                destination: 'Lentoasema',
                vehicle: '125432',
                arrival: '1:21'
            },
            {
                key: '2',
                line: 'I',
                destination: 'Helsinki',
                vehicle: '125221',
                arrival: '5:58'
            },
        ]
    }

    parseMessage = (message) => {
        console.log(message);
        vehicle_position = JSON.parse(message).VP;
        this.setState({status: {speed: vehicle_position.spd}})
    };

    renderItem = (item) => {
        const train = item.item;
        console.log(train);
        return (
            <View style={{flexDirection: 'row', padding: 15, justifyContent: 'center'}}>
                <View style={{width: 36, height: 36, borderRadius: 33, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 20, }}>{train.line}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
                    <Text style={{fontSize: 18}}>{train.destination}</Text>
                    <Text style={{fontSize: 12, color: 'grey'}}>{'Train '+train.vehicle}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: 'grey', marginRight: 5, marginTop: 4}}>{'in '+train.arrival}</Text>
                </View>
            </View>
        );
    }

    render = () => {
        return (
            <View style={styles.container}>
                <View style={styles.liveStatusHeader}>
                    <Text style={{color: 'white', fontWeight: 'bold', textTransform: 'uppercase'}}>{'Upcoming trains in '+this.state.stop}</Text>
                </View>
                <FlatList style={styles.scrollContainer} contentContainerStyle={styles.contentContainer} data={this.state.nextTrains} renderItem={this.renderItem}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    liveStatusHeader: {
        backgroundColor: '#2089DC',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    scrollContainer: {
        flex: 1
    }
  });