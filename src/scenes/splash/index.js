import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet,StatusBar, NetInfo, Alert} from "react-native";
import firebase from 'react-native-firebase';


class Splash extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
        };
    }
    componentDidMount() {
        this.animation.play();
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type === 'none') {
                Alert.alert(
                    'Error Conexion',
                    'Parece que no tienes conecion, ' +
                    'pero puedes utilizar la aplicacion corectamente, ' +
                    'cuando podamos sincronizaremos tus datos',
                    [
                        {text: 'No mostrar', onPress: () => console.log('Ask me later pressed')},
                        {text: 'Cerrar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            }
        });

        firebase.auth().signInAnonymously()
            .then(() => {
                this.setState({
                    isAuthenticated: true,
                });
            });
         setTimeout(() => {
            if (!this.state.isAuthenticated) {
                 this.props.navigation.navigate("Login")
             }
        }, 2000);

    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#4aade5"
                    translucent
                />
                <View style={styles.conte_load} >
                    <LottieView
                    ref={animation => { this.animation = animation;} }
                    source={require('../../assets/sloop')}
                    />
                </View>
            </View>
        );
    }
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4aade5',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    conte_load: {width: 100, height: 100},

});