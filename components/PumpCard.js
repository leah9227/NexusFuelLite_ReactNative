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

class PumpCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    }
  };

  static navigationOptions = {
    title: 'PumpCard',
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

  render(){
    return (
        <FlatList numColumns={2}
          data={ this.props.Data }
          renderItem={({item}) => <TouchableOpacity style={ this.getCardStyle() } onPress={ () => this.props.callback(item.key) }>
                                    <View style={ styles.pumpContainer }>
                                      <Image style={ styles.imagePumpStyle } source={require('../assets/pump.png')} />
                                    </View>
                                    <View style={ styles.titleContainer}>
                                    <Text style={{color: Theme.fontColor}}>Bomba {item.key}</Text>
                                    </View>
                                  </TouchableOpacity>}
        />
    );
  }
}

VoucherDialog.propTypes = {
// onPress: PropTypes.func,
};

export default PumpCard;

const styles = StyleSheet.create({
  imagePumpStyle: {
    height: '78%',
    width: '50%',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pumpContainer: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
