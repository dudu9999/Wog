import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class Contato extends Component {
  static navigationOptions = {
    title: 'Contatos'
  };

  render(){
    return(
      <View>
        <Text>Bem vindo a tela Contato!!</Text>
        <Button 
        title="Voltar"
        onPress={()=> this.props.navigation.goBack() }
        />
      </View>
    );
  }
}

export default Contato;