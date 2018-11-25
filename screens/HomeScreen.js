import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  fetch,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Header } from 'react-native-elements';

import { MonoText } from '../components/StyledText';
import Ticket from '../components/Ticket';
import LiveStatus from '../components/LiveStatus';
import NextTrains from '../components/NextTrains';
import Placeholder from '../components/Placeholder';
import * as axios from 'axios';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    ticket: true
  }

  async componentDidMount() {
    console.log("test");
    response = await axios.get('http://35.228.245.131:3000/ticket/123456543');
    this.setState({ticket: response.status === 200})
    setInterval(async () => {
      response = await axios.get('http://35.228.245.131:3000/ticket/123456543');
      this.setState({ticket: response.status === 200})
    }, 3000)
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'HSL Pop In', style: { color: '#fff' } }}
        />
        <View style={{flex: 1}}>
            {this.state.ticket ? <Ticket/> : <Placeholder/>}
            <View style={styles.liveStatusContainer}>
              {this.state.ticket ? <LiveStatus/> : <NextTrains/>}
            </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContainer: {
    flex: 3,
  },
  contentContainer: {
    flex: 3
  },
  cardHeader: {
    flexDirection: "column",
  },
  cardTicketTypeText: {
    fontWeight: "bold",
  },
  liveStatusContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
});
