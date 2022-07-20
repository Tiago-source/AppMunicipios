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
const KEY_FULL_NAME = "";
const KEY_EMAIL = "";
const KEY_PASSWORD = "";
const KEY_CONFIRM_PASSWORD = "";
const KEY_EMPTY = "";

class Register extends Component{



  state = {
    email: KEY_EMAIL,
    password: KEY_PASSWORD,
    full_name: KEY_FULL_NAME,
    confirm_password: KEY_CONFIRM_PASSWORD,
    errors: [],
    loading: false
  };

  handleRegister() {
    const { navigation } = this.props;
    const { full_name ,email, password ,confirm_password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === KEY_EMPTY) {
      alert("Please enter Email address");
    }else if (password === KEY_EMPTY) {
      alert("Please enter password");
    }else if (full_name === KEY_EMPTY) {
        alert("Please enter your name");
      }else if (confirm_password === KEY_EMPTY) {
        alert("Please confirm your password");
      }else if (confirm_password !== password) {
        alert("Diferent passwords");
    } else {
      fetch(
        "http://192.168.1.5:80/Myslim/api/registo",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            // we will pass our input data to server
            name: full_name,
            email: email,
            password: password
          })
        },
        alert(full_name,email, password)

      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson['status'] == true) {
            // redirect to profile page
            console.log(responseJson);
            alert("Successfully Registered");
            navigation.navigate("LoginScreen");
          } else {
            alert("An error occurred");
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
    return (
      <View style={styles.full}>
        <View style={styles.part2}>
        <TextInput
              label="Full Name"
              style={[styles.textinput]}
              defaultValue={this.state.full_name}
              onChangeText={full_name => this.setState({ full_name })}
              placeholder="Full Name"
          />
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
           <TextInput
           secure
           label="Confirm Password"
           style={[styles.textinput]}
           defaultValue={this.state.confirm_password}
           onChangeText={confirm_password => this.setState({ confirm_password })}
           placeholder="Confirm Password"
          />
          <View style={styles.buttonview}>
            <Button gradient onPress={() => this.handleRegister()}
              color="#49DCB1"
              title="Register"
            />
          </View>
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
        
        
        export default Register;