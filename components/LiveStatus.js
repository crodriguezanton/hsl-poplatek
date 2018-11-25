import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SocketIOClient from 'socket.io-client';


//<prefix><version>/journey/<temporal_type>/<transport_mode>/<operator_id>/<vehicle_number>/<route_id>/<direction_id>/<headsign>/<start_time>/<next_stop>/<geohash_level>/<geohash>/


export default class LiveStatus extends React.Component {

    state = {
        line: 'P',
        destination: 'Lentoasema',
        vehicle: '125432',
        status: {
            zone: 'Helsinki',
            nextStop: 'Malminkartano',
            doorsOpened: false,
            arrivingAt: "3:22"
        }
    }

    componentDidMount() {
        this.socket = SocketIOClient('http://35.228.245.131:3001');
        this.socket.on('event', this.parseMessage)
    }

    parseMessage = (message) => {
        this.setState(message);
    };

    render = () => {
        return (
            <View style={styles.container}>
                <View style={styles.liveStatusHeader}>
                    <Text style={{color: 'white', fontWeight: 'bold', textTransform: 'uppercase'}}>My trip</Text>
                </View>
                <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
                    <View style={{flexDirection: 'row', padding: 15, justifyContent: 'center'}}>
                        <View style={{width: 36, height: 36, borderRadius: 33, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 20, }}>{this.state.line}</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
                            <Text style={{fontSize: 18}}>{this.state.destination}</Text>
                            <Text style={{fontSize: 12, color: 'grey'}}>{'Train '+this.state.vehicle}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{color: 'grey', marginRight: 5, marginTop: 4}}>Zone</Text>
                            <View style={{backgroundColor: 'grey', minWidth: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'white', paddingHorizontal: 5}}>{this.state.status.zone}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'center'}}>
                        <View style={{marginLeft: 51, flex: 1}}>
                            <Text style={{fontSize: 12, color: 'grey'}}>{this.state.status.doorsOpened ? 'Currently in:' : 'Next stop:'}</Text>
                            <Text style={this.state.status.doorsOpened ? {color: '#2089DC', fontWeight: 'bold'}:{}}>{this.state.status.nextStop}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: 'grey'}}>{this.state.status.doorsOpened ? null : 'Arriving in '+this.state.status.arrivingAt}</Text>
                        </View>
                    </View>
                </ScrollView>
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