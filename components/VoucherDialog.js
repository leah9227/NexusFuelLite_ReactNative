import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Alert,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
}
  from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import Theme from '../config/theme';
import CammeraScanner from '../components/CameraScanner'

class VoucherDialog extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        cameraVisibility: false,
        voucherList: 'Sin vales para procesar.',
        voucherTyped: 'aaa',
      }
  }

  getResponse(response){
    this.setState({
      cameraVisibility: false,
      voucherList: this.state.voucherList == 'Sin vales para procesar.' ? response : `${this.state.voucherList}\n${response}`
    });
  }

  handleSubmit(text){
    this.setState({
      voucherList: this.state.voucherList == 'Sin vales para procesar.' ? text : `${this.state.voucherList}\n${text}`,
    });
    this.textInput.clear()
  }

  validateVouchers() {
    // alert(`Vales procesados:\n${this.state.voucherList}`);
    this.props.onDismiss
    // this.props.navigation.navigate('CardPaymentScreen');
  }

  render(){
    return (
      <Modal
          animationType='slide'
          transparent={true}
          visible={this.props.visible}
          onRequestClose={ this.props.onRequestClose }
          >

          <CammeraScanner cameraVisibility={ this.state.cameraVisibility } onDismiss={ () => this.setState({ cameraVisibility: false }) }
            onRequestCloseCamera={ () => this.setState({ cameraVisibility: false }) } callback={ this.getResponse.bind(this) }/>

          <View style={ styles.dialogWraper }/>

          <View style={ styles.modalStyle }>

            <View style={ styles.headerContent }>
              <Text style={ styles.headerText }>PAGO CON VALES</Text>
            </View>

            <View style={ styles.middleContent }>

              <View style={ styles.inputContainer }>
                <View style={ styles.inputContentRow} >
                <View style={ styles.inputContent }>
                  <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor}
                    placeholder='Vales'
                    ref={input => { this.textInput = input }}
                    onTextChange={(text) => this.setState({voucherTyped: text})}
                    onSubmitEditing={({ nativeEvent }) => this.handleSubmit( nativeEvent.text )}
                  />
                </View>
                  <TouchableOpacity style={ styles.imgContent } onPress={ () => { this.setState({cameraVisibility: true})} }>
                    <Image source={require('../assets/credit_card_icon.png')} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={ styles.voucherTextContainer }>
                <Text style={ styles.voucherHeader }>Vales:</Text>
              </View>

              <View style={ styles.voucherContainer }>
                <ScrollView contentContainerStyle={styles.voucherContainerScrollView}>
                  <Text style={ styles.voucherText }>{this.state.voucherList}</Text>
                </ScrollView>
              </View>

            </View>

            <View style={ styles.bottomContent }>
              <Button style={ styles.buttonStyle } title='PAGAR' onPress={ this.props.onDismiss }/>
            </View>

          </View>

          <View style={ styles.dialogWraper }/>

        </Modal>
    );
  }
}

  VoucherDialog.propTypes = {
  onDismiss: PropTypes.func,
  onRequestClose: PropTypes.func,
  visible: PropTypes.bool,
};

// export default VoucherDialog;
export default withNavigation(VoucherDialog);


const styles = StyleSheet.create({
  modalStyle: {
    height: 250,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: Theme.backgroundColorSecondary,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  dialogWraper: {
    flex: 1,
  },
  headerContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.mainColor
  },
  headerText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  middleContent: {
    flex: 7,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    color: Theme.mainColor,
  },
  inputField: {
    flex: 15,
    fontSize: 20,
    width: '100%',
    height: 40,
    paddingLeft: 6,
  },
  inputContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'space-between'
  },
  inputContentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContent: {
    flex: 1,
    height: 30,
    width: 30,
  },
  inputContent: {
    flex: 15,
  },
  voucherTextContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  voucherText: {
    fontSize: 15,
    textAlign: 'center',
    width: '100%',
  },
  voucherHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.fontColor
  },
  voucherContainer: {
    flex: 5,
    width: '100%',
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voucherContainerScrollView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
