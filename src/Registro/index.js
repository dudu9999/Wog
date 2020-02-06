import React, {Component} from 'react';
import {View, Text, TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import firebase from '../../firebaseConnection.js';
import { NavigationActions, StackActions } from 'react-navigation';
import { BorderlessButton } from 'react-native-gesture-handler';

class Registro extends Component {
  static navigationOptions = {
    title: 'Registro'
  };

  constructor(props){
    super(props);
    this.state = { 
      nome: '',
      email:'',
      senha:''
     };
     this.cadastrar = this.cadastrar.bind(this);

     firebase.auth().signOut();

      firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        
        firebase.database().ref('usuarios').child(user.uid).set({
          nome: this.state.nome,
          email: this.state.email,
          senha: this.state.senha
        })


        this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions:[
            NavigationActions.navigate({routeName: 'Home'})
          ]
        }));
        
      }
    })
    
    }
    
     cadastrar(){
       firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.senha)
       .catch((error) => {
        if(error.code == 'auth/invalid-email'){
          alert('Email invalido.');
        }if(error.code == 'auth/weak-password'){
          alert('Sua senha deve ter pelo menos 6 caracteres.');
        }else{
          alert('Ops, tente mais tarde!');
         }
       })

       this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions:[
          NavigationActions.navigate({routeName: 'Home'})
        ]
      }));
    }

    sair(){
      firebase.auth().signOut();
      alert('Deslogado com sucesso!');
    }

  render(){
    return(
      <View style={styles.container}>

        <Text  style={styles.tiutlo}>Cadastrar</Text>

        <Text style={styles.textoPlaceholder}>Nome</Text>
        <TextInput style={styles.input}
        underlineColorAndroid="transparent" onChangeText={(nome)=>{this.setState({nome})}}/>
        
        <Text style={styles.textoPlaceholder}>Email</Text>
        <TextInput style={styles.input} 
        underlineColorAndroid="transparent" onChangeText={(email)=>{this.setState({email})}}/>

        <Text style={styles.textoPlaceholder}>Senha</Text>
        <TextInput style={styles.input} 
        underlineColorAndroid="transparent" onChangeText={(senha)=>{this.setState({senha})}}/>

        <TouchableOpacity style={styles.botao} onPress={this.cadastrar}  >
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={()=> this.props.navigation.navigate('Login')} >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
//styles.textoPlaceholder
export default Registro;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "lightblue",
  },
  tiutlo:{
    fontSize: 30,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  input:{
    alignItems: 'center',
    width: '95%',
    marginLeft:10,
    marginRight:10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 22,
    marginBottom: 10,
    borderBottomColor:'#fff',
    borderBottomWidth: 60
    
  },
  textoPlaceholder:{
    fontSize: 25,
    textAlign: "center",
    marginLeft:10,
  },
  botao:{
    paddingTop:20,
    backgroundColor: "#0000FF",
    margin: 20,
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
})