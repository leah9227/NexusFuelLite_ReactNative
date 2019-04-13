import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  TouchableHighlight,
}
  from 'react-native';
import PropTypes from 'prop-types';
import Theme from '../config/theme';
import Toast, {DURATION} from 'react-native-easy-toast-fixed';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stationNumber: this.props.localSettingsNF.stationNumber,
      URL_Service_CardSystem: this.props.localSettingsNF.URL_Service_CardSystem,
      URL_Service_Fleets: this.props.localSettingsNF.URL_Service_Fleets,
      URL_Service_Mobile: this.props.localSettingsNF.URL_Service_Mobile,
      taxPercentage: this.props.localSettingsNF.taxPercentage,
      pumpCount: this.props.localSettingsNF.pumpCount,
    }
  };

  static navigationOptions = {
    title: 'Configuracion',
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

  handleSaveSettingsClick(){
    this.props.setSettings(this.state.stationNumber, this.state.URL_Service_CardSystem, this.state.URL_Service_Fleets, this.state.URL_Service_Mobile, this.state.taxPercentage, this.state.pumpCount);
    this.refs.toast.show('Cambios aplicados.');
  }

  render(){
    return (
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
          <View style={ styles.cardContent }>

            <View style={styles.inputContainer}>
              <Text style={ styles.inputTitle }>Numero de estacion</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ stationNumber: text })}}
              placeholder='Estacion'>{this.state.stationNumber}</TextInput>
            </View>

            <View style={ styles.inputContainer }>
              <Text style={ styles.inputTitle }>CardSystem URL [IP:PortNumber]</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ URL_Service_CardSystem: text })}}
              placeholder='CardSystem URL [IP:PortNumber]'>{this.state.URL_Service_CardSystem}</TextInput>
            </View>

            <View style={ styles.inputContainer }>
              <Text style={ styles.inputTitle }>Flotillas URL [IP:PortNumber]</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ URL_Service_Fleets: text })}}
              placeholder='Flotillas URL [IP:PortNumber]'>{this.state.URL_Service_Fleets}</TextInput>
            </View>

            <View style={ styles.inputContainer }>
              <Text style={ styles.inputTitle }>Mobile URL [IP:PortNumber]</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ URL_Service_Mobile: text })}}
              placeholder='Mobile URL [IP:PortNumber]'>{this.state.URL_Service_Mobile}</TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={ styles.inputTitle }>Impuesto (en porcentaje)</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ taxPercentage: text })}}
              placeholder='Impuesto %'>{this.state.taxPercentage}</TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={ styles.inputTitle }>Numero de bombas</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ pumpCount: text })}}
              placeholder='Numero de bombas' keyboardType='numeric'>{this.state.pumpCount}</TextInput>
            </View>

          </View>

          <TouchableHighlight  style={ styles.buttonContainer }>
            <Button title='SALVAR CAMBIOS' onPress={ () => { this.handleSaveSettingsClick() }} style={ styles.buttonStyle }/>
          </TouchableHighlight >

          <View style={styles.emptySpace}></View>
        </View>

        <Toast ref="toast" position='bottom' style={{backgroundColor: Theme.mainColor}}
        textStyle={{color:'#FFF'}} opacity={0.8} positionValue={180}/>

      </ScrollView>
    );
  }
}

  Settings.propTypes = {
  auth: PropTypes.object,
  getSettings: PropTypes.func,
  setSettings: PropTypes.func,
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  inputContainer: {
    // flex: 1,
    marginTop: '5%',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputTitle: {
    fontSize: 15,
    width: '100%',
    paddingLeft: 6,
    color: Theme.fontColor,
  },
  inputField: {
    fontSize: 18,
    width: '100%',
    height: 40,
    paddingLeft: 6,
    color: Theme.fontColor,
  },
  cardContent: {
    // flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    marginTop: '5%',
    marginBottom: '5%',
    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  emptySpace: {
    // flex: 4,
    width: '100%',
  },
  buttonContainer: {
    // flex: 1,
    width: '90%',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  buttonStyle: {
    // flex: 1,
    height: '100%',
    width: '100%',
    color: Theme.mainColor,
  },
});
