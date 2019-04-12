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
}
  from 'react-native';
import PropTypes from 'prop-types';
import Header from '../components/header';
import VoucherDialog from '../components/VoucherDialog';
import Theme from '../config/theme';

class PaymentSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      pumpSelected: this.props.localSettingsNF.selectedPump
    }
  };

  static navigationOptions = {
    title: '1 - Metodo de pago',
    headerStyle: {
      backgroundColor: Theme.mainColor,
    },
    headerTitleStyle: {
      color: '#FFF',
    },
    backButton: {
        color: 'red',
    },
    buttonColor: 'red',
    headerTintColor: '#FFF',
  }

  componentDidUpdate() {
    if (this.state.visible !== this.props.visible) {
      const { visible } = this.props;
      this.setState({ visible });
    }
  }

  render(){

    return (
      <View style={styles.container}>
        <VoucherDialog visible={ this.state.modalVisibility } onDismiss={ () => this.setState({ modalVisibility: false }) }
          onRequestClose={ () => this.setState({ modalVisibility: false }) }/>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.textTitle}>Selecciona el metodo de pago</Text>
          </View>
          <View style={ styles.headerRow }>
            <Text style={styles.textTitle}>para la</Text>
            <Image source={require('../assets/pump.png')} style={ styles.imagePumpStyle }/>
            <Text style={styles.textTitle}>{this.state.pumpSelected}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.cardContent} onPress={ () => {this.props.navigation.navigate('CardPaymentScreen')}}>
          <View style={ styles.cardContentHeader }>
            <Text style={ styles.headerCardTitle }>Tarjeta</Text>
          </View>
          <View style={ styles.cardContentImage }>
            <Image source={require('../assets/CreditCardImage.png')} style={ styles.creditCardFormat } />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cardContent, {marginBottom: '5%'}]} onPress={ () => { this.setState({modalVisibility: !this.state.modalVisibility}) }}>
          <View style={ styles.cardContentHeader }>
            <Text style={ styles.headerCardTitle }>Vale(s)</Text>
          </View>
          <View style={ styles.cardContentImage }>
            <Image source={require('../assets/VoucherImage.png')} style={ styles.creditCardFormat } />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

  PaymentSelection.propTypes = {
  auth: PropTypes.object,
};

export default PaymentSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '3%',
  },
  textTitle: {
    fontSize: 21,
    textAlign: 'center'
  },
  cardContent: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    marginTop: '5%',
    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  cardContentHeader: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContentImage: {
    flex: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditCardFormat: {
    width: 165,
    height: 165,
  },
  headerCardTitle: {
    fontSize: 19,
  },
  modalStyle: {
    height: '50%',
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 2,
    justifyContent: 'center'
  },
  dialogWraper: {
    flex: 1,
  },
  imagePumpStyle: {
    height: 50,
    width: 50,
    marginLeft: '2%',
    marginRight: '2%',
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
