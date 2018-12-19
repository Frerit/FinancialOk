import React, {Component} from 'react';
import {KeyboardAvoidingView, Keyboard, TextInput,
    StyleSheet, Image, View, Text} from "react-native";

import LoginForm from "./component/login-form";
import CarouselView from "./component/carousel";
import firebase from "react-native-firebase";


class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            scrollEnabled: false,
            visiblePager: true,
        }
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({
            visiblePager: !this.state.visiblePager,
        });
    }

    _keyboardDidHide = () => {
        this.setState({
            visiblePager: !this.state.visiblePager,
        });
    }


    _renderImage() {
        return(
            <View>
                <Image source={{uri: 'https://previews.123rf.com/images/mrcocoa/mrcocoa1605/mrcocoa160500620/55926698-estad%C3%ADsticas-an%C3%A1lisis-icono-de-la-lupa-adecuada-para-informaci%C3%B3n-de-gr%C3%A1ficos-p%C3%A1ginas-web-y-medios-impresos-e-in.jpg'}}/>
            </View>
        )
    }

    render() {
        const visible = this.state.visiblePager;
        return (
            <KeyboardAvoidingView behavior="button" style={styles.container}>
                <View style={styles.loginContainer}>
                    <View style={{flex:1}}>
                        { visible ?
                            (<CarouselView/>)
                            : this._renderImage()
                        }
                    </View>
                </View>
                <View>
                    <LoginForm {...this.props} />
                </View>
            </KeyboardAvoidingView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    containerSwi: {
        flex: 1,
        backgroundColor: '#efdeed',
        flexDirection: 'column',
        paddingTop: 20
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    viewPager: {
        flex: 1
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    }
});


export default Login;