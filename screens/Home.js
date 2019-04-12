import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight,
  Alert,
  FlatList,
  Dimensions,
  Button,
}
  from 'react-native';
import PropTypes from 'prop-types';
import Header from '../components/header';
import VoucherDialog from '../components/VoucherDialog';
import Theme from '../config/theme'
import PumpCard from '../components/PumpCard'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      pumpArray: null,
    }
  };

  static navigationOptions = {
    title: 'Homescreen',
    header: null
  }

  getCardStyle(){
    return{
      justifyContent: 'center',
      alignItems: 'center',
      height: this.state.height/5,
      width: this.state.height/4,
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: '#FFF',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    }
  }

  componentDidMount(){
    this.setState({
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    })
  }

  static getDerivedStateFromProps(props, state){
    var arr = []
    var len = props.localSettingsNF.pumpCount
    for (var i = 0; i < len; i++) {
       arr.push({
           key: i+1,
       })
     };

    return{
      pumpArray: arr,
    };
  }

  getResponse(response){
    this.props.setSelectedPump(response);
    this.props.navigation.navigate('PaymentSelectionScreen')
  }

  render(){
    return (
      <View style={styles.container}>
      <Header onClickSettings={ () => { this.props.navigation.navigate('SettingsScreen')} }/>
        <View style={styles.headerContent}>
          <Text style={ styles.headerTitle }>Seleccione la bomba a despachar:</Text>
        </View>

        <View style={ styles.pumpListContent }>
            <PumpCard Data={ this.state.pumpArray } callback={ this.getResponse.bind(this) }/>
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object,
  setSelectedPump: PropTypes.func,
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  headerContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: Theme.fontColor,
    fontSize: 20,
    textAlign: 'center',
  },
  pumpListContent: {
    flex: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pumpContainer: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
