import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import firebase from '../../firebaseConnection.js';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props){
    super(props);
    this.state = { 
      lista: [],
      nome: '',
      email: '',
      data: ''
    };
      this.sair = this.sair.bind(this);

      firebase.database().ref('chamados').on('value', (snapshot) => {
        let state = this.state;
        state.lista = [];

        snapshot.forEach((childItem) => {
          state.lista.push({
            key: childItem.key,
            nome: childItem.val().nome,
            email: childItem.val().email,
            data: childItem.val().data
          });
        });
        this.setState(state);
      })
    }

  sair(){
    firebase.auth().signOut();

    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions:[
        NavigationActions.navigate({routeName: 'Login'})
      ]
    }));

    alert('Deslogado com sucesso!');
  }

  render(){
    return(
      <ScrollView style={styles.container}>
        <Text  style={styles.texto}>Tela home!!</Text>
        
        <TouchableOpacity style={styles.botao} onPress={()=> this.props.navigation.navigate('Contato')} >
          <Text style={styles.textoBotao}>Contato</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.botao} onPress={()=> this.props.navigation.navigate('Login')} >
          <Text style={styles.textoBotao}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.botao} onPress={()=> this.props.navigation.navigate('Registro')} >
          <Text style={styles.textoBotao}>Registro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={this.sair} >
          <Text style={styles.textoBotao}>Sair</Text>
        </TouchableOpacity>

        <FlatList 
          data={this.state.lista} renderItem={({item}) => <Listagem data={item} />} />
      </ScrollView>
    );
  }
}

class Listagem extends Component{
  render(){
    return(
      <View style={styles.card}>
        <Text style={{fontSize: 25}}>Nome: {this.props.data.nome}</Text>
        <Text style={{fontSize: 25}}>Email: {this.props.data.email}</Text>
        <Text style={{fontSize: 25}}>Data: {this.props.data.data}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:20,
    backgroundColor: "lightblue",
  },
  botao:{
    paddingTop:20,
    backgroundColor: "#0000FF",
    margin: 30,
    padding:20,
    width: '90%',
    borderRadius: 10
  },
  textoBotao:{
    color:'#fff',
    fontSize: 22,
    textAlign: "center",
    fontWeight:'bold'
  },
  texto:{
    fontSize:40,
    textAlign: "center",
  },
  card:{
    backgroundColor: '#d3d3d3',
    padding: 10,
    marginVertical:10,

  }
})