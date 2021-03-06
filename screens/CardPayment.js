import React from 'react';
import  {
  View,
  Text,
  StyleSheet,
  Button,
  Picker,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
 } from 'react-native';
 import Theme from '../config/theme';
 import Toast, {DURATION} from 'react-native-easy-toast-fixed';

export default class CardPayment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isFirstStep: true,
      shift: 'empty',
      card: '00011151000200101645',
      pump: '1',
      NIPNumber: '',
      mileage: '134413',
      plates: 'EDO MEX',
      validationString: '1756191232202351582449515781185172249199185'
    }
  };

  static navigationOptions = {
    title: '2 - Pago con tarjeta',
    headerStyle: {
      backgroundColor: Theme.mainColor,
    },
    headerTitleStyle: {
      color: '#FFF',
    },
    headerTintColor: '#FFF',
  }

  handleValidationClick(){
    this.props.cardValidation(this.props.localSettingsNF.URL_Service, this.state.card, this.state.pump,
      this.state.NIPNumber, this.state.mileage, this.state.plates, this.props.localSettingsNF.stationNumber,
      this.state.validationString);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.isFirstStep !== prevState.isFirstStep){
      if(!this.state.isFirstStep){
        this.refs.toast.show('Validacion correcta. Capturar datos adicionales.');
      }
    }
  }

  static getDerivedStateFromProps(props, state, refs){
    if(props.localSettingsNF.error == false && props.localSettingsNF.isCardAutorized ){
      // alert('Autorizacion correcta. Navegar a siguiente pantalla.');
      // props.navigation.navigate('HomeScreen');
      return{
        isFirstStep: false
      };
    }
    return null;
  }

  renderContent(){
    if(this.state.isFirstStep){
      return(
        <View style={ styles.container } visible={ false }>
          <View style={ styles.headerContainer }>
            <Text style={ styles.headerTitle }>Informacion de tarjeta</Text>
            <Text style={ styles.errorStyle}>{ this.props.localSettingsNF.message }</Text>
          </View>

          <View style={ styles.cardContainer }>
            <View style={styles.inputContainer}>
              <Text style={ styles.inputTitle }>Numero de tarjeta</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ card: text })}}
              placeholder='Tarjeta' keyboardType='numeric'>{this.state.card}</TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={ styles.inputTitle }>Bomba</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ pump: text })}}
              placeholder='Bomba' keyboardType='numeric'>{this.state.pump}</TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={ styles.inputTitle }>NIP</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ NIPNumber: text })}}
              placeholder='NIP' keyboardType='numeric'>{this.state.NIPNumber}</TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={ styles.inputTitle }>Kilometraje</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ mileage: text })}}
              placeholder='Kilometraje' keyboardType='numeric'>{this.state.mileage}</TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={ styles.inputTitle }>Placas</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ plates: text })}}
              placeholder='Placas' keyboardType='default'>{this.state.plates}</TextInput>
            </View>
          </View>

          <View style={ styles.footerContainer }>

            <Button title='VALIDAR' onPress={ () => {this.handleValidationClick()} } containerViewStyle={ styles.buttonStyle }/>
          </View>
        </View>
      );
    }
    else{
      return(
        <View style={{ flex: 1, backgroundColor: 'white', width:'100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text>Second step :P</Text>
          <Text>Pending fields to capture.</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, }} behavior={'padding'} keyboardVerticalOffset={80}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          { this.renderContent() }

          <Toast ref="toast" position='bottom' style={{backgroundColor: Theme.mainColor}}
          textStyle={{color:'#FFF'}} opacity={0.8} positionValue={180}/>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  headerTitle: {
    fontSize: 25,
    textAlign: 'center',
    color: Theme.fontColor,
  },
  textStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: Theme.fontColor,
  },
  inputField: {
    fontSize: 18,
    width: '100%',
    height: 40,
    paddingLeft: 6,
    color: Theme.fontColor,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
    width: '90%',
    marginTop: '5%',
    marginBottom: '5%',
    elevation: 3,
    shadowColor: '#000000',
    backgroundColor: '#FFF',
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  buttonStyle: {
    height: '100%',
    color: Theme.mainColor,
  },
  footerContainer: {
    flex: 4,
    width: '90%',
    justifyContent: 'flex-start',
  },
  pickerStyle: {
    height: '100%',
    width: '50%',
  },
  shiftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
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
  errorStyle: {
    color: 'red',
    fontWeight: 'bold',
  }
})
