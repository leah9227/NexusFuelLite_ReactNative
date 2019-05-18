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
  KeyboardAvoidingView,
  Dimensions,
  ToastAndroid
}
  from 'react-native';
import PropTypes from 'prop-types';
import Theme from '../config/theme';
import TextInputGeneric from '../components/textInputGeneric';
import SnackBar from 'react-native-snackbar-component';

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
      textTitle: 'empty',
      snackBarVisibility: false,
      autoHidingTime: 3000,
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

  componentDidMount(){
    this.setState({
      heightScreen: Dimensions.get('window').height,
      widthScreen: Dimensions.get('window').width,
    });
  }

  handleSaveSettingsClick() {
    this.setState({ snackBarVisibility: true });
    this.props.setSettings(this.state.stationNumber, this.state.URL_Service_CardSystem, this.state.URL_Service_Fleets, this.state.URL_Service_Mobile, this.state.taxPercentage, this.state.pumpCount);
  }

  getHeaderContainerStyle(){
    return({
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: this.state.heightScreen/25,
    });
  }

  getFooterContainerStyle(){
    return({
        width: '90%',
        height: this.state.heightScreen/9,
        justifyContent: 'center',
      });
  }

  render(){
    return (
      <KeyboardAvoidingView style={{ flex: 1, }} behavior={'padding'} keyboardVerticalOffset={80}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={styles.container}>

            <View style={ this.getHeaderContainerStyle() }>
            </View>

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

              <View style={ styles.inputContainer}>
                <TextInputGeneric KeyboardType='numeric' PlaceHolder='Test placeholder1'
                Title='Test taitooool :P 1' Text={this.state.textTitle}/>
                <TextInputGeneric KeyboardType='numeric' PlaceHolder='Test placeholder2'
                Title='Test taitooool :P 2' Text={this.state.textTitle} OnChangeText={(text) => {this.setState({ textTitle: text})}}/>
              </View>
            </View>

            <View style={ this.getFooterContainerStyle() }>
              <Button title='SALVAR CAMBIOS' onPress={ () =>  { this.handleSaveSettingsClick() } }
            style={ styles.buttonStyle }/>
            </View>
          </View>

          <SnackBar visible={ this.state.snackBarVisibility } textMessage='Cambios aplicados correctamente.'
            actionHandler={ () => { console.log('snackbar button clicked!') }}
            autoHidingTime={ this.state.autoHidingTime }/>

        </ScrollView>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    elevation: 3,
    shadowColor: '#000000',
    backgroundColor: '#FFF',
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  buttonStyle: {
    width: '100%',
    color: Theme.mainColor,
  },
});
