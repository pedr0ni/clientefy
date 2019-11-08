import React from 'react';

import { StyleSheet, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';

import Text from '../Components/Text'
import ApiService from '../services/api.service';

class LoginScreen extends React.Component {

    state = {
        credentials: {
            email: '',
            password: ''
        },
        isLoading: false
    };

    _authenticate() {
        const { navigate } = this.props.navigation; 
        this.setState({isLoading: true});
        setTimeout(() => {
            ApiService.post('User/Business/Authenticate', this.state.credentials).then(response => {
                console.log(response);
                navigate('Home', {});
            }).catch(error => {
                if (error.response && error.response.status == 401)
                    Alert.alert('Ops...', 'E-mail ou senha incorreto(s)');
            }).then(() => {
                this.setState({isLoading: false});
            })
        }, 1200);
    }

    render() {
        return (
            <>
            <View style={styles.imageContainer}>
                <Image style={{width: 320, height: 320, position: 'absolute', marginTop: 20}} source={require('../assets/img/login.png')} />
            </View>

            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <Text style={styles.title}>Fazer login</Text>
                
                <TextInput style={styles.input} placeholder="E-mail" value={this.state.credentials.email} onChangeText={(text) => this.setState({credentials: {...this.state.credentials, email: text}})} />
                <TextInput style={styles.input} placeholder="Senha" textContentType='password' secureTextEntry={true} value={this.state.credentials.password} onChangeText={(text) => this.setState({credentials: {...this.state.credentials, password: text}})} />

                <TouchableOpacity style={styles.loginButton} onPress={() => this._authenticate()}>
                    {
                        !this.state.isLoading ?
                        <Text style={styles.loginButtonText}>ENTRAR</Text>
                        :
                        <ActivityIndicator size="large" color="#FFF" />
                    }
                </TouchableOpacity>

                <Text style={styles.leadText}>Não possui uma conta? <Text style={styles.leadTextLink}>Registrar</Text></Text>

            </KeyboardAvoidingView>
            
            </>
        );
    }

}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFF',
        borderRadius: 22,
    },
    title: {
        fontFamily: 'MontserratBold',
        fontSize: 28,
        color: '#3f4855'
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        height: 55,
        fontSize: 20
    },
    loginButton: {
        backgroundColor: '#455eea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 14, 
        paddingBottom: 14,
        borderRadius: 6,
        marginTop: 10
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'MontserratBold',
    },
    leadText: {
        color: '#808080',
        textAlign: 'center',
        marginTop: 12,
        fontSize: 18
    },
    leadTextLink: {
        color: '#455eea',
        textDecorationLine: 'underline'
    }
});

export default LoginScreen;