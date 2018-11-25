import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

import { Card, Icon } from 'react-native-elements';

var {height, width} = Dimensions.get('window');

export default class Placeholder extends React.Component {

    spinValue = new Animated.Value(0);

    componentDidMount() {
        

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
        
    }

  render() {

    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
        });
        
    return (
        <View style={styles.container}>
            <Animated.Image source={require("../assets/images/hsl.png")} style={{tintColor: '#2089DC', width: 100, height: 100, resizeMode: 'contain', transform: [{rotate: spin}]}}/>
            <Text style={{fontFamily: 'proxima-medium', fontSize: 30, color: '#2089DC', marginTop: 20}}>
                Just get in a train!
            </Text>
            <Text style={{textAlign: 'center', color: 'grey'}}>
                Your ticket will be automatically purchased when you are inside the train.
            </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
  });