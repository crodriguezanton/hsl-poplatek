import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

import { Card, Icon } from 'react-native-elements';
import Button from './Button';
import * as axios from 'axios';


var {height, width} = Dimensions.get('window');

export default class Ticket extends React.Component {

    spinValue = new Animated.Value(0);

    state = {
        ticket: {
            type: 'Loading',
            valid: '',
            group: '',
            zone: ''
        }
    }

    componentDidMount = async () =>  {
        

        // First set up animation 
        Animated.loop(Animated.timing(
            this.spinValue,
        {
            toValue: 1,
            duration: 7000,
            easing: Easing.linear,
            useNativeDriver: true,
        }
        )).start()

        // Second interpolate beginning and end values (in this case 0 and 1)

        response = await axios.get('http://35.228.245.131:3000/ticket/123456543');
        console.log(response.data);
        setInterval(async () => {
          response = await axios.get('http://35.228.245.131:3000/ticket/123456543');
          console.log(response.data);
          this.setState({ticket: response.data})
        }, 3000)
        
    }

  render() {

    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
        });

    return (
        <View style={styles.container}>
        <View style={styles.cardHeader}>
          <Icon name="calendar" type="entypo"/>
          <Text style={styles.cardTicketTypeText}>
            {this.state.ticket.type}
          </Text>
        </View>
        <View style={styles.cardDesc}>
            <View style={styles.cardValid}>
                <Text style={[styles.cardDescTextSecondary, styles.alignLeft]}>
                    Valid
                </Text>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: '#00C853', marginTop: 5, marginRight: 5}}/>
                    <Text style={[styles.cardDescText, styles.alignLeft]}>
                        Until {this.state.ticket.valid}
                    </Text>
                </View>
                
            </View>
            <View style={styles.cardGroup}>
                <Text style={[styles.cardDescTextSecondary, styles.alignRight]}>
                    Customer group
                </Text>
                <Text style={[styles.cardDescText, styles.alignRight]}>
                    {this.state.ticket.group}
                </Text>
            </View>
        </View>
        <View style={styles.cardType}>
            <Text style={[styles.cardTicketRegionText, styles.alignCenter]}>
                {this.state.ticket.zone}
            </Text>
        </View>
        <View style={styles.cardImage}>
            <Animated.Image source={require("../assets/images/hsl.png")} style={{position: 'absolute', top: -250, right: -50, left: -68, height: 400, zIndex: 50, resizeMode: 'contain',transform: [{rotate: spin}]}}/>
            <View style={[styles.colorSquare, styles.backgroundGreen]}/>
            <View style={[styles.colorSquare, styles.backgroundOrange]}/>
        </View>
        <View style={styles.cardFooter}>
            <View style={{flex: 1}}/>
            <Button/>
            <View style={{flex: 1}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        margin: 18,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,
        shadowColor: '#CFD8DC',
        shadowRadius: 5,
        shadowOpacity: 0.7,
    },
    alignRight: {
        textAlign: 'right',
    },
    alignCenter: {
        textAlign: 'center',
    }, 
    alignLeft: {
        textAlign: 'left',
    },
    cardHeader: {
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 15,
      alignItems: 'center',
    },
    cardTicketTypeText: {
      fontWeight: "bold",
      fontSize: 15,
      textTransform: 'uppercase',
      paddingLeft: 10,
    },
    cardDesc: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        paddingVertical: 15,
        marginHorizontal: 15
    },
    cardDescText: {
        fontSize: 16,
        fontWeight: 'bold'
    }, 
    cardDescTextSecondary: {
        fontSize: 12,
        color: '#616161'
    },
    cardValid: {
        flex: 1,
        paddingLeft: 10,
    },
    cardGroup: {
        flex: 1,
        paddingRight: 10,
    },
    cardType: {
        paddingVertical: 30
    },
    cardTicketRegionText: {
        fontWeight: 'bold',
        fontSize: 40,
        fontFamily: 'proxima-bold',
        letterSpacing: 3,
        textTransform: 'uppercase'
    },
    cardImage: {
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
    },
    colorSquare: {
        flex: 1,
        height: (width - 30) / 2,
    },
    backgroundGreen: {
        backgroundColor: 'green',
    },
    backgroundOrange: {
        backgroundColor: 'orange',
    },
    cardFooter: {
        flexDirection: 'row',
        paddingVertical: 5
    },
  });