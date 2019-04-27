import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
}
  from 'react-native';
import Theme from '../config/theme'

class TextInputGeneric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: ''
    }
  };

  render(){
    return (
      <View style={styles.inputContainer}>
        <Text style={ styles.inputTitle }>{this.props.Title}</Text>
        <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={ this.props.OnChangeText }
          placeholder={this.props.PlaceHolder} keyboardType={this.props.KeyboardType}>{this.props.Text}</TextInput>
      </View>
    );
  }
}

export default TextInputGeneric;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    width: '100%',
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
});
