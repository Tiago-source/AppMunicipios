import React, { Component } from 'react';
import { StyleSheet, Platform, ImageBackground,View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';
let realm ;

const Stack = createStackNavigator();

class Edit extends Component{

  constructor(props){
    super(props);
    this.state = {
      titulo : this.props.route.params.titulo,
      descricao : this.props.route.params.descricao,
      id: this.props.route.params.id,
    }
    realm = new Realm({ path: 'nota.realm' });
  }

  updateRegisto=()=>{
    var that = this;
    if (this.state.titulo) {
      if (this.state.descricao) {
          realm.write(() => {
            var obj = realm
              .objects('nota')
              .filtered('id =' + this.state.id);
            if (obj.length > 0) {
              obj[0].titulo = this.state.titulo;
              obj[0].descricao = this.state.descricao;
              Alert.alert(
                'Info',
                'Registo atualizado com sucesso',
                [
                  {
                    text: 'Ok',
                    onPress: () =>
                      that.props.navigation.goBack(),
                  },
                ],
                { cancelable: false }
              );
            } else {
              alert('Atualização falhou');
            }
          });
      } else {
        alert('Preencha a Descrição');
      }
    } else {
      alert('Preencha  o Titulo');
    }
  }

  deleteRegisto=()=>{
    Alert.alert(
      'Info',
      'Tem a certeza que pretende remover este registo?',
    [
      {text: 'Não', onPress: () => console.log('Pedido cancelado'), style: 'cancel'},
      {text: 'Sim', onPress: () => {this.deleteNota();}},
    ]
    );
  }

  deleteNota = () => {
    realm.write(() => {
      //const { id } = this.props.route.params;
      let task = realm.objects('nota').filtered('id = ' + this.state.id);
      realm.delete(task);
    });
    this.props.navigation.goBack();
  }

  searchNota = () => {
      var nota = realm.objects('nota').filtered('id ='+this.state.id);
      if (nota.length > 0) {
        this.setState({
          titulo: pessoa[0].titulo,
        });
        this.setState({
          descricao: pessoa[0].descricao,
        });
      } else {
        alert('Nota não existe');
        this.setState({
          titulo: '',
        });
        this.setState({
          descricao: '',
        });
      }
    };

  render() {

   return (
     <View style={styles.MainContainer}>
        <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../../images/page.png')}>
       <Text>{this.state.id}</Text>
      <TextInput
             placeholder="Inserir Titulo"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.titulo}
             onChangeText = { ( text ) => { this.setState({ titulo: text })} }
       />
       <TextInput
             placeholder="Inserir Descrição"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.descricao}
             onChangeText = { ( text ) => { this.setState({ descricao: text })} }
       />
       <TouchableOpacity onPress={this.searchUser} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> Obter dados </Text>
        </TouchableOpacity>
       <TouchableOpacity onPress={this.updateRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> Atualizar </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteRegisto} activeOpacity={0.7} style={styles.button} >
           <Text style={styles.TextStyle}> Apagar </Text>
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

 export default Edit;
