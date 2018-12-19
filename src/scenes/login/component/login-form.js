import React, {Component} from 'react';
import {TextInput, TouchableOpacity,
    StyleSheet, StatusBar,
    ViewPagerAndroid, View} from "react-native";
import {Text} from "native-base";
import firebase from "react-native-firebase";




class LoginForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.ref = firebase.firestore().collection('OK_USERS');
        this.state = {
            password: "",
            userEmail: "",
            isAuthenticated: false,
            registerUser: false,
            // crear variable traida de datto para velidar si ya ingreso por primera vex

            scrollEnabled: true,
            user: {},
            type: 1,
            stateLogin: 'INGRESAR',
            progress: false,
            onErrorUs: false,
            onErrorPas: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                this.setState({
                    isAuthenticated: true,
                    user: user,
                    userEmail: user.email
                });
            }
        });
    }


    anonimousLogin = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user == null) {
                firebase.auth().signInAnonymously()
                    .then(() => {
                        this.setState({
                            isAuthenticated: true,
                        });
                    }).catch(er => {
                    if (er.code = 'auth/unknown') {

                    }
                });
            } else {
                console.log("User" + JSON.stringify(user))
                this.setState({
                    isAuthenticated: true,
                });
                this.props.navigation.navigate("Home");
            }
        });
    };

    changeAutentication = () => {
        this.setState({
            registerUser: !this.state.registerUser
        })
    };

    valid = () => {
        if (this.state.userEmail === "" || this.state.userEmail === '')  {
            this.setState({ onErrorUs: true });
            return false;
        } else if (this.state.password === "" || this.state.password === '')  {
            this.setState({ onErrorPas: true });
            return false;
        } else
            return true;
    };

    _loading = () => {
        this.setState({
            stateLogin: 'Cargando...',
            progress: true,
        });
    };

    _noLoading = () =>{
        this.setState({
            stateLogin: 'INGRESAR',
            progress: false,
        });
    };

    atendLogin = () =>{
        console.log("--- Logg: " + this.state.userEmail + " - " + this.valid());
        if (!this.state.progress && this.valid()) {
            this._loading();
            console.log("Loginando")
            firebase.auth().createUserWithEmailAndPassword(this.state.userEmail, this.state.password)
                .then((user) => {
                    console.log("Logio" + JSON.stringify(user));
                    this.ref.add({
                        user: user.uid,
                        pass: this.state.password
                    });
                    this.props.navigation.navigate("Home");
                }).catch((error) => {
                alert(error.message)
                this._noLoading();
            });
        }
    };

    _renderLogin() {
        if (this.state.registerUser) {
            return (
                <View style={styles.container}>
                    <TextInput style={!this.state.onErrorUs ? styles.input : styles.inputError}
                               autoCapitalize="none"
                               onSubmitEditing={() => this.password.focus()}
                               autoCorrect={false}
                               keyboardType='email-address'
                               returnKeyType="next"
                               placeholder="Usuario"
                               placeholderTextColor='#505050'
                               onChangeText={input => {
                                   this.setState({
                                       userEmail: input,
                                       onErrorUs: false
                                   })
                               }
                               }>
                    </TextInput>

                    <TextInput style={!this.state.onErrorPas ? styles.input : styles.inputError}
                               returnKeyType="go" ref={(input) => this.password = input}
                               placeholder='Contraseña'
                               placeholderTextColor='#505050'
                               secureTextEntry
                               onChangeText={input =>
                                   this.setState({
                                       password: input,
                                       onErrorPas: false
                                   })
                               }/>

                    <TouchableOpacity onPress={() => this.atendLogin()}
                                      style={this.state.progress ? styles.progressState : styles.buttonContainer}>
                        <Text style={styles.buttonText}>{this.state.stateLogin}</Text>
                    </TouchableOpacity>
                </View>
            )

        } else if (this.state.isAuthenticated) {
            return(
                <View style={styles.container}>
                    <Text style={styles.userData}> Hola { this.state.user.displayName == null ? this.state.user.email : this.state.user.displayName }</Text>
                    <TextInput style={!this.state.onErrorPas ? styles.input : styles.inputError}
                               returnKeyType="go" ref={(input) => this.password = input}
                               placeholder='Contraseña'
                               placeholderTextColor='#505050'
                               secureTextEntry
                               onChangeText={input =>
                                   this.setState({
                                       password: input,
                                       onErrorPas: false
                                   })
                               }/>

                    <TouchableOpacity onPress={() => this.atendLogin()}
                                      style={this.state.progress ? styles.progressState : styles.buttonContainer}>
                        <Text style={styles.buttonText}>{this.state.stateLogin}</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.anonimousLogin()} style={styles.buttonContainer}>
                        <Text  style={styles.buttonText}>DAR UN VISTAZO</Text>
                    </TouchableOpacity>

                    <View style={styles.butonRegistro}>
                        <TouchableOpacity onPress={() => this.changeAutentication()} style={styles.buttonIngress}>
                            <Text  style={styles.buttonText}>¿YA TIENES CUENTA?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
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
        height: 50,
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
    inputError: {
        height: 50,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "red",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        color: 'red'
    },
    butonRegistro:{
        marginTop: 10,
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        borderRadius: 5
    },
    buttonIngress: {
        backgroundColor: '#ff7a0e',
        paddingVertical: 15,
        borderRadius: 5
    },
    progressState: {
        backgroundColor: '#bcccf0',
        paddingVertical: 15,
        borderRadius: 5,
        opacity: .7

    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    userData: {
      color: '#2980b6',
      marginBottom: 10
    },
    loginButton:{
        backgroundColor:  '#2980b6',
        color: '#fff'
    },
});

export default LoginForm;