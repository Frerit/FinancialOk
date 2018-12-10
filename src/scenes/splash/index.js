import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet,StatusBar, NetInfo, Alert} from "react-native";



class Splash extends Component {
    componentDidMount() {
        this.animation.play();
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type == 'none') {
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