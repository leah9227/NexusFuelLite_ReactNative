import React from 'react';
import  {
  View,
  Text,
  StyleSheet,
  Modal,
  Button
 } from 'react-native';
 import Theme from '../config/theme';
 import { BarCodeScanner, Permissions } from 'expo';
 import { NavigationActions } from 'react-navigation';


export default class CameraScanner extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
    }
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <Modal animationType='slide' transparent={true} visible={this.props.cameraVisibility } onRequestClose={ this.props.onRequestCloseCamera }>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        <Button title='Cerrar.' onPress={this.props.onDismiss} />
      </Modal>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.callback(data);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
})
