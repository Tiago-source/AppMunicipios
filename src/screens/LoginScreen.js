import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Image,
  Button,
  TextInput,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const KEY_STATUS = "status";
const KEY_MESSAGE = "message";
const KEY_FULL_NAME = "full_name";
const KEY_EMAIL = "";
const KEY_PASSWORD = "";
const KEY_EMPTY = "";

class LoginScreen extends Component{



  state = {
    email: KEY_EMAIL,
    password: KEY_PASSWORD,
    full_name: KEY_FULL_NAME,
    errors: [],
    loading: false
  };

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === KEY_EMPTY) {
      alert("Please enter Email address");
    }else if (password === KEY_EMPTY) {
      alert("Please enter password");
    } else {
      fetch(
        "http://192.168.1.5:80/Myslim/api/login",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            // we will pass our input data to server
            email: email,
            password: password
          })
        },
        alert(email, password)

      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson['cod'] == 6) {
            // redirect to profile page
            console.log(responseJson);
            alert("Successfully Login");
            navigation.navigate("Map");
          } else {
            alert("Wrong Login Details");
          }
        })
        .catch(error => {
          console.error(error);
        });

      //this.setState({ errors, loading: false });
    }
    Keyboard.dismiss();
  }


render(){
  const { navigation } = this.props;
    return (
      <View style={styles.full}>
        <View style={styles.part1}>
        <Image
            style={styles.stretch}
            source={require('../../images/preview.png')}
          />
        </View>
        <View style={styles.part2}>
          <TextInput
              label="Email"
              style={[styles.textinput]}
              defaultValue={this.state.email}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
          />
          <TextInput
           secure
           label="Password"
           style={[styles.textinput]}
           defaultValue={this.state.password}
           onChangeText={password => this.setState({ password })}
           placeholder="Password"
          />
          <View style={styles.buttonview}>
            <Button gradient onPress={() => this.handleLogin()}
              color="#49DCB1"
              title="Login"
            />
          </View>
          <View style={styles.buttonview}>
            <Button
              color="#49DCB1"
              title="Register New User"
              onPress={() => navigation.navigate('Register')}
            />
          </View>
        </View>
        <View style={styles.part3}>
            <Button
              color="orange"
              title="Acesso anónimo"
              onPress={() => navigation.navigate('Notes')}
              />
              </View>
            </View>
        );
      }
    }
      
      const styles = StyleSheet.create({
        full: {
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#456990'
        },
        part1: {
          flex: 1,
      //    backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        },
        part2: {
          flex: 2,
        //  backgroundColor: 'blue',
        },
        part3: {
          flex: 1,
        //  backgroundColor: 'red',
          justifyContent: 'flex-end',
          margin: 10,
        },
        buttonview: {
          flex: 1,
          margin: 10,
        },
        text: {
          color: 'black',
          fontSize: 25,
        },
        textinput: {
            height: 40,
            borderColor: '#EEB868',
            borderWidth: 1,
            margin: 10,
          },
          stretch: {
            flex: 1,
            width: 150,
            height: 150,
        //  resizeMode: 'stretch',
        },
        });
        
        
        export default LoginScreen;
        