import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import firebase from '../../firebaseConnection.js';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Login extends Component {

  static navigationOptions = {
    title: 'Login'
  }

  constructor(props){
    super(props);
    this.state = { 
      email:'',
      senha:''
     };

    this.logar = this.logar.bind(this);
    
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions:[
            NavigationActions.navigate({routeName: 'Home'})
          ]
        }));
        
      }
    })
    
  
  }

  logar(){

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error)=>{
      if(error.code == 'auth/wrong-password'){
        alert('Senha incorreta');
      }else{
        alert('Ops, tente novamente mais tarde! '+error.code);
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.texto}>Entrar</Text>
        
        <TextInput style={styles.input} placeholder="Email" 
        underlineColorAndroid="transparent" onChangeText={(email)=>{this.setState({email})}}/>

        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}
        underlineColorAndroid="transparent" onChangeText={(senha)=>{this.setState({senha})}}/>

        <TouchableOpacity  style={styles.botao} onPress={this.logar} >
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>


        <TouchableOpacity  style={styles.botao} onPress={()=> this.props.navigation.navigate('Registro')} >
          <Text style={styles.textoBotao}>Registro</Text>
        </TouchableOpacity>

      </View>
    );
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
    margin:40
  },
  input:{
    alignItems: 'center',
    width: '95%',
    marginLeft:10,
    marginRight:10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 22,
    marginBottom: 40,
    
  },
})