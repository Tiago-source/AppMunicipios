import React, { Component } from 'react';
import { StyleSheet, ImageBackground , View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';
let realm ;

const Stack = createStackNavigator();

class Notas extends Component{

  constructor(){

    super();

    this.state = {
      titulo : '',
      descricao : '',
    }

    realm = new Realm({
      path: 'nota.realm',
      schema: [{
        name: 'nota',
          properties:
          {
            id: {type: 'int',   default: 0},
            titulo: 'string',
            descricao: 'string',
          }}]
      });

  }

  show_count=()=>{
    var ID = realm.objects('nota').length;
    Alert.alert("contagem: " + ID);
  }

  addRegisto=()=>{
    realm.write(() => {
      var ID = realm.objects('nota').length + 1;
       realm.create('nota', {
         id: ID,
         titulo: this.state.titulo,
         descricao: this.state.descricao,
        });
    });
    Alert.alert("Registo inserido com sucesso.")
  }

  GoToListagem = () =>
    {
       this.props.navigation.navigate('List');

    }

  render() {
   return (
     <View style={styles.MainContainer}>
      <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../../images/page.png')}>



       <TextInput
             placeholder="Inserir Titulo"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ titulo: text })} }
       />
       <TextInput
             placeholder="Inserir Descrição"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ descricao: text })} }
       />
       <TouchableOpacity onPress={this.addRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> Adicionar </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.show_count} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> CONTAGEM </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.GoToListagem} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> LISTAGEM </Text>
        </TouchableOpacity>
        </ImageBackground>
     </View>
   );
 }
 }


 const styles = StyleSheet.create({
   MainContainer: {
     flex: 1,
   },
   button: {
       height: 40,
       padding: 10,
       backgroundColor: '#4CAF50',
       borderRadius:7,
       margin: 12
   },
   TextInputStyle:
   {
       borderWidth: 1,
       margin: 10,
       borderColor: '#009688',
       height: 40,
       borderRadius: 10,
       marginBottom: 10,
       textAlign: 'center',
   },
   imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
},
 });

 export default Notas;
