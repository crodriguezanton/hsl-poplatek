import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { Card, Icon } from 'react-native-elements';

var {height, width} = Dimensions.get('window');

export default class Button extends React.Component {
  render() {
    return (
        <TouchableOpacity>
            <View style={styles.outlineButton}>
                <Text style={styles.buttonText}>
                    TICKET INSPECTION
                </Text>
            </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    outlineButton: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingVertical: 5,
        paddingHorizontal: 15,
        margin:  5,
    },
    buttonText: {
        color: '#2089dc',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
  });