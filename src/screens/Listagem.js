import React, { Component } from 'react';
import { StyleSheet, Platform, View, ImageBackground,Button, TouchableWithoutFeedback, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';
let realm;

class Listagem extends Component{

	constructor(props) {
	  super(props);
	  realm = new Realm({ path: 'nota.realm' });
	  var notas = realm.objects('nota');
	  this.state = {
		FlatListItems: notas,
	  };
	  realm.addListener('change', () => {
		this.reloadData();
	  });
	}
  
	reloadData = () => {
	  this.setState({FlatListItems: realm.objects('nota')});
	}
  
	ListViewItemSeparator = () => {
	  return (
		<View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
	  );
	};
  
	actionOnRow(item) {
	   this.props.navigation.navigate('Edit', item);
	}
  
	render()
	  {
		 return(
			<View style = { styles.MainContainer }>
				 <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../../images/page.png')}>

			<FlatList
				 data={this.state.FlatListItems}
				 ItemSeparatorComponent={this.ListViewItemSeparator}
				 keyExtractor={(item, index) => index.toString()}
				 renderItem={({ item }) => (
				   <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
				   <View style={{
					 flex: 1,
					 flexDirection: 'row',
					 //backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato'
					 backgroundColor: 'lightblue'
					 }}>
					 <View style={{flex: 1, flexDirection: 'column'}}>
						<Text>Id: {item.id}</Text>
						 <Text>Titulo: {item.titulo}</Text>
						 <Text>Descrição: {item.descricao}</Text>
					  </View>
					</View>
				  </TouchableWithoutFeedback>
		 )}
	   />
	    </ImageBackground>
			</View>
		 );
	  }
  }
  
  
  
  const styles = StyleSheet.create({
	MainContainer :{
	   flex:1,
	   justifyContent: 'center',
	   paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
	   margin: 10
	},
	TextInputStyle:
	 {
	   borderWidth: 1,
	   borderColor: '#009688',
	   width: '100%',
	   height: 40,
	   borderRadius: 10,
	   marginBottom: 10,
	   textAlign: 'center',
	 },
	 button: {
	   width: '100%',
	   height: 40,
	   padding: 10,
	   backgroundColor: '#4CAF50',
	   borderRadius:7,
	   marginTop: 12
	 },
	 TextStyle:{
	   color:'#fff',
	   textAlign:'center',
	 },
	 textViewContainer: {
	   textAlignVertical:'center',
	   padding:10,
	   fontSize: 20,
	   color: '#000',
	  },
	  imgBackground: {
		width: '100%',
		height: '100%',
		flex: 1 
	},
   });
  
   export default Listagem;
  
