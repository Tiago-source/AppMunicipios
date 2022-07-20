
import React, { useEffect, useState,Component } from 'react';
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";
import {Modal,TouchableHighlight,Text, Alert, View, Image, StyleSheet, ActionButton,TextInput,PermissionsAndroid,Platform,Keyboard } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle, Polyline,CalloutSubview } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import GetLocation from 'react-native-get-location'
import Geolocation from '@react-native-community/geolocation';


    const KEY_DESCRICAO = "";
    const KEY_EMPTY = "";
    const KEY_ID = "";

    class Map extends Component {
   
      state = {
        modalVisible: false,
        dialogVisible: false,
        message: [],
        descricao: KEY_DESCRICAO,
        id: KEY_ID,
        currentLongitude: 'unknown',//Initial Longitude
        currentLatitude: 'unknown',//Initial Latitude
      };
 
      //-------------------------
      componentDidMount = () => {
        this.getMarkers();
        var that =this;
        //Checking for the permission just after component loaded
        if(Platform.OS === 'ios'){
          this.callLocation(that);
        }else{
          async function requestLocationPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                  'title': 'Location Access Required',
                  'message': 'This App needs to Access your location'
                }
              )
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                that.callLocation(that);
              } else {
                alert("Permission Denied");
              }
            } catch (err) {
              alert("err",err);
              console.warn(err)
            }
          }
          requestLocationPermission();
        }    
       }
       callLocation(that){
        //alert("callLocation Called");
          Geolocation.getCurrentPosition(
            //Will give you the current location
             (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({ currentLongitude:currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLatitude:currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
             },
             (error) => alert(error.message),
             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
          that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
              console.log(position);
              const currentLongitude = JSON.stringify(position.coords.longitude);
              //getting the Longitude from the location json
              const currentLatitude = JSON.stringify(position.coords.latitude);
              //getting the Latitude from the location json
             that.setState({ currentLongitude:currentLongitude });
             //Setting state Longitude to re re-render the Longitude Text
             that.setState({ currentLatitude:currentLatitude });
             //Setting state Latitude to re re-render the Longitude Text
          });
       }
       componentWillUnmount = () => {
          Geolocation.clearWatch(this.watchID);
       }
      //--------------------------

      handleNewMarker() {
        const { navigation } = this.props;
        const { descricao } = this.state;
        const errors = [];
        Keyboard.dismiss();
        this.setState({ loading: true });
    
        // check with backend API or with some static data
        
    
        if (descricao === KEY_EMPTY) {
          alert("Insert a Description");
        } else {
          fetch(
            "http://192.168.1.5:80/Myslim/api/pontos",
            {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({
                // we will pass our input data to server
                lat: this.state.currentLatitude,
                lng:  this.state.currentLongitude,
                descricao: descricao,
                encodedImage: "null",
              })
            },
            console.log(this.state.currentLatitude,this.state.currentLongitude,descricao),
            
            
          )
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson['status'] == true ) {
                // redirect to profile page
                console.log(responseJson);
                alert("Successfully Registered");
                this.componentDidMount();
                this.setState({descricao: KEY_DESCRICAO,currentLongitude: 'unknown',currentLatitude: 'unknown' })
              } else {
                console.log(responseJson);
                alert("An error occurred");
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
        Keyboard.dismiss();
      }
    
      //----------------------------------
      handleDeleteMarker = id => {
        const { navigation } = this.props;
        const { descricao } = this.state;
        const errors = [];
        this.setState({ loading: true });
        this.state.deletePonto = id;
    
        // check with backend API or with some static data
          fetch(
            "http://192.168.1.5:80/Myslim/api/deletePonto/"+ this.state.deletePonto,
            {
              method: "delete",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json; charset=utf-8"
              },
            },
          )
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson['status'] == true ) {
                // redirect to profile page
                console.log(responseJson);

                alert("Successfully Deleted");
                this.componentDidMount();
              } else {
                console.log(responseJson);
                alert("An error occurred");
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      
        //Update Marker
      //_-----------------------------
      handleUpdateMarker = () => {
        const { navigation } = this.props;
        const { descricao , currentLatitude , currentLongitude , id } = this.state;
        const errors = [];
        this.setState({ loading: true });
    
        // check with backend API or with some static data
          fetch(
            "http://192.168.1.5:80/Myslim/api/editPonto",
            {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({
                // we will pass our input data to server
                id: this.state.id,
                lat: this.state.currentLatitude,
                lng:  this.state.currentLongitude,
                descricao: this.state.descricao,
                encodedImage: "null",
              })
            },
          )
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson['status'] == true ) {
                // redirect to profile page
                console.log(responseJson);

                alert("Successfully Updated");
                this.componentDidMount();
              } else {
                console.log(responseJson);
                alert("An error occurred");
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      


      //-----------------------------
    
      setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    

        getMarkers() {
          fetch('http://192.168.1.5:80/Myslim/api/getPontos')
            .then(res => res.json())
            .then(data => {
              this.setState({ message: data.message })
            })
            .catch(console.error)
      }

      showDialog = () => {
        this.setState({ dialogVisible: true });
      };
      handleCancel = () => {
        this.setState({ dialogVisible: false });
        this.componentDidMount();
      };

    mapMarkers = () => {
      return this.state.message.map((marker) => <Marker
        key={marker.id}
        coordinate={{ latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lng) }}
        description={marker.descricao}
        onCalloutPress={() =>  
           Alert.alert(
          "Marker Options",
          "Delete or update Marker",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "Editar",
              onPress: () =>  {{this.showDialog(),this.setState({descricao: marker.descricao,id: marker.id})}}
              
            },
            { text: "Delete", onPress: () => this.handleDeleteMarker(marker.id)}
          ],
          { cancelable: false }
        )
          }
      >
         <Callout onCalloutPress={() => {console.log("Marker/onCalloutPress")}}>
                <Text style={styles.underline}>Id:</Text>
                <Text style={styles.italic,styles.bold}>{marker.id}</Text>
                <Text style={styles.underline}>Latitude:</Text>
                <Text style={styles.italic,styles.bold}>{marker.lat}</Text>
                <Text style={styles.underline}>Longitude:</Text>
                <Text style={styles.italic,styles.bold}>{marker.lng}</Text>
                <Text style={styles.underline}>Descrição:</Text>
                <Text style={styles.italic,styles.bold}>{marker.descricao}</Text>  
         </Callout>
   
      </Marker >)
    }



    render() {
      const { navigation } = this.props;
      const { modalVisible } = this.state;
      return (
      <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: 41.698771,
          longitude:  -8.635849,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
        >
      {this.mapMarkers()}
      </MapView>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>New Marker</Text>
              <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
                Longitude: {this.state.currentLongitude}
              </Text>
              <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
                Latitude: {this.state.currentLatitude}
              </Text>
              <TextInput
                label="Descrição"
                style={[styles.textinput]}
                defaultValue={this.state.descricao}
                onChangeText={descricao => this.setState({ descricao })}
                placeholder="Descrição"
              />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3",marginBottom: 10}}
                onPress={() => {this.handleNewMarker(),
                this.setModalVisible(!modalVisible)}}
              >
                <Text style={styles.textStyle}>Add Marker</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3",marginLeft: 10}}
                onPress={() => {this.setModalVisible(!modalVisible)}}
              >
                <Text style={styles.textStyle}>Back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Add Marker</Text>
        </TouchableHighlight>
      </View>
          <View>
          <TouchableHighlight
          style={styles.notasButton}
          onPress={() => { navigation.navigate("Notes");
          }}
          >
          <Text style={styles.textStyle}>Notes</Text>
          </TouchableHighlight>
          </View>

          <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Marker Options</Dialog.Title>
          <Text style={styles.modalText}>Edit Marker</Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
            Id:{this.state.id}
          </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
                Longitude: {this.state.currentLongitude}
          </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
                Latitude: {this.state.currentLatitude}
          </Text>
          <TextInput
                label="Descrição"
                style={[styles.textinput]}
                defaultValue={this.state.descricao}
                onChangeText={descricao => this.setState({ descricao })}
                placeholder="Descrição"
              />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Update" onPress={this.handleUpdateMarker} />
        </Dialog.Container>
          </View>

    );

    }
  }

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    notasButton: {
      backgroundColor: "#3F88C5",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      alignSelf: 'flex-end',
      marginTop: 5,
      position: 'absolute',
    },
   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom:20,
    left:0,
    right:0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#3F88C5",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  bold: {fontWeight: 'bold'},
  italic: {fontStyle: 'italic'},
  underline: {textDecorationLine: 'underline'}

  });

  export default Map;

 