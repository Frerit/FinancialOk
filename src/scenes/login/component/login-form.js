import React, {Component} from 'react';
import {TextInput, TouchableOpacity, StyleSheet, StatusBar} from "react-native";
import {View, Form, Item, Input, Label, Text} from "native-base";
import firebase from "react-native-firebase";
import CarouselView from "./carousel";


class LoginForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            password: "",
            userEmail: "",
            isAuthenticated: false,
            registerUser: false,
            // crear variable traida de datto para velidar si ya ingreso por primera vex
        }
    }

    anonimousLogin = () => {

        firebase.auth().signInAnonymously()
            .then(() => {
                this.setState({
                    isAuthenticated: true,
                });
            });


    };

    _renderLogin() {
        if (!this.state.registerUser) {
            return (
                <View style={styles.container}>
                    <TextInput style = {styles.input}
                               autoCapitalize="none"
                               onSubmitEditing={() => this.password.focus()}
                               autoCorrect={false}
                               keyboardType='email-address'
                               returnKeyType="next"
                               placeholder= "Usuario"
                               placeholderTextColor='rgba(225,225,225,0.7)'
                               onChangeText={ input =>
                                   this.setState({userEmail: input }) } >

                    </TextInput>
                    <TextInput style = {styles.input}
                               returnKeyType="go" ref={(input)=> this.password = input}
                               placeholder='Password'
                               placeholderTextColor='rgba(225,225,225,0.7)'
                               secureTextEntry
                               onChangeText={ input =>
                                   this.setState({password: input }) } />

                    <TouchableOpacity onPress={() => this.anonimousLogin()} style={styles.buttonContainer}>
                        <Text  style={styles.buttonText}>DAR UN VISTAZO</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <Text> Hola </Text>
                </View>
            )
        }
    };


    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <CarouselView/>
                {this._renderLogin()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        padding: 10,
        color: '#2980b6'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        borderRadius: 5
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton:{
        backgroundColor:  '#2980b6',
        color: '#fff'
    }
});

export default LoginForm;