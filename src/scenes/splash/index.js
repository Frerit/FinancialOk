import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet,StatusBar, NetInfo, Alert} from "react-native";
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';

const ref = firebase.firestore().collection('OK_EQUIPOS');

class Splash extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('OK_EQUIPOS');
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
                        {text: 'OK', onPress: () => {
                            this.props.navigation.navigate("Login")
                        }},
                    ],
                    { cancelable: false }
                )
            }
        });
        this.ref.doc(DeviceInfo.getUniqueID()).set({

            brand: DeviceInfo.getBrand(),
            deviceCountry: DeviceInfo.getDeviceCountry(),
            deviceId: DeviceInfo.getDeviceId(),
            deviceLocale: DeviceInfo.getDeviceLocale(),
            systemVersion: DeviceInfo.getSystemVersion(),
            uniqueId: DeviceInfo.getUniqueID(),
            firstOpen: new Date().toDateString()

        }).then(respo => {

            console.log(respo);
            this.props.navigation.navigate("Login")

        }).catch(err => {

          alert(err);

        });

    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#FFF"
                    translucent
                    barStyle="light-content"
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
        backgroundColor: '#FFF',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    conte_load: {width: 100, height: 100},

});