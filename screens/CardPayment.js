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
import md5 from 'md5';
import CryptoJS from 'react-native-crypto-js';
import TextInputGeneric from '../components/textInputGeneric';

export default class CardPayment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isFirstStep: true,
      shift: 'empty',
      card: '00011151000200101645',
      pump: '1',
      NIPNumber: '1234',
      mileage: '134413',
      plates: 'EDO MEX',
      selectedFleet: '',
      validationString: '1756191232202351582449515781185172249199185',
      amount: '0',
      key: 'e*7KwkpO9)(@2n_xqA21*&n#0_=JFDi@__4H0r4-51-35t4_eS_14-P3rr0N@&cX<2.<@)^%!|Gd|]sa{D3L@Bd}#DsliuH1)9'
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
    //pending create logic for replicate validation string :P
    let data = md5(`C${this.state.card}A${this.state.pump}D${this.props.localSettingsNF.stationNumber}E${this.state.amount}N${this.state.NIPNumber}A`)
    let md5Key = md5(this.state.key)
    let dataEncrypted = CryptoJS.AES.encrypt(data, md5Key).toString();

    // let identificator = '1151'
    // let NIPKey = `#l@Ll4v3De1N1Pd3Fl0t1lL@5-$Un2@4:dW-!d*n&VZ_%fK~dLkST^${identificator}2K$-D(#m4co|d3LNipP3220n-!mc7x}q;|e&j18F3Ci9$.<Ek`
    // let NIPEncrypted = CryptoJS.TripleDES.encrypt(this.state.NIPNumber, NIPKey).toString();

    this.setState({
      validationString: dataEncrypted
    });

    this.props.cardValidation(this.props.localSettingsNF.URL_Service_CardSystem, this.state.card, this.state.pump,
      this.state.NIPNumber, this.state.mileage, this.state.plates, this.props.localSettingsNF.stationNumber, this.state.validationString);
  }

  handleFleetSelection(itemValue, itemIndex){
    this.setState({
      selectedFleet: itemValue,
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.isFirstStep !== prevState.isFirstStep){
      if(!this.state.isFirstStep){
        this.refs.toast.show('Validacion correcta. Capturar datos adicionales.');
      }
    }
  }

  componentDidMount(){
    this.props.getExternalCardSystemList(this.props.localSettingsNF.URL_Service_Fleets, this.state.pump)
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
    let fleetsList = this.props.localSettingsNF.externalCardSystemList.ExternalCardSystem.map( (item) => {
      return <Picker.Item key={item.ValidationType[0]} value={item.ValidationType[0]} label={item.Description[0]} />
    })

    if(this.state.isFirstStep){
      return(
        <View style={ styles.container } visible={ false }>
          <View style={ styles.headerContainer }>
            <Text style={ styles.headerTitle }>Informacion de tarjeta</Text>
            <Text style={ styles.errorStyle}>{ this.props.localSettingsNF.message }</Text>
          </View>

          <View style={ styles.cardContainer }>

            <View style={ styles.inputContainerRow }>
              <Text style={ styles.pickerTitle }>Flotillero</Text>
              <Picker style={ styles.pickerStyle } selectedValue={this.state.selectedFleet} onValueChange={(itemValue, itemIndex) => {this.handleFleetSelection(itemValue, itemIndex)}}>
                {fleetsList}
              </Picker>
            </View>

            <TextInputGeneric KeyboardType='numeric' PlaceHolder='hiiiint :P' Title='Test titleeeeeeeee'/>

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
  pickerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
    fontSize: 15,
    color: Theme.fontColor,
  },
  pickerStyle: {
    flex: 4,
    height: '100%',
    color: Theme.fontColor,
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
  inputContainerRow:{
    flex: 1,
    flexDirection: 'row',
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
