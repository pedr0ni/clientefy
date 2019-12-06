import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Image, Button, Dimensions, TouchableOpacity, Animated } from 'react-native';

import Text from '../Components/Text';

import GestureRecognizer from 'react-native-swipe-gestures';
import ApiService from '../services/api.service';

class WelcomeScreen extends React.Component {

    state = {
        scaleIndex: new Animated.Value(1),
        page: null,
        pages: [
            {
                index: 0,
                image: require('../assets/img/welcome-01.png'),
                title: 'Bem-vindo ao Clientefy',
                label: 'Aqui você agrega cartões de fidelidade, cupons de desconto e muito mais em apenas um só lugar !'
            },
            {
                index: 1,
                image: require('../assets/img/welcome-02.png'),
                title: 'Seguro',
                label: 'Todas as requisições são criptografadas antes de chegar em qualquer lugar. Isso evita que cartões sejam fraudados.'
            },
            {
                index: 2,
                image: require('../assets/img/welcome-03.png'),
                title: 'Fácil',
                label: 'Deixe toda a bagunça dos cartões fidelidade e cupons com a gente. Você é avisado sempre que algo importante está prestes a acontecer !'
            }
        ]
    }

    animatedSwitch = () => {
        this.state.scaleIndex = new Animated.Value(0);
        Animated.timing(this.state.scaleIndex, {
            toValue: 1,
            duration: 350
        }).start();
    }

    _nextPage = () => {
        this.animatedSwitch();
        if (this.state.page.index + 1 == this.state.pages.length)
            this._skip()
        else
            this.setState({page: this.state.pages[this.state.page.index + 1]})
    }

    _prevPage = () => {
        this.animatedSwitch();
        if (this.state.page.index > 0)
            this.setState({page: this.state.pages[this.state.page.index - 1]});
    }

    _skip = () => {
        const { navigate } = this.props.navigation;
        navigate('Login', {});
    }

    async componentWillMount() {
        if (await ApiService.isLogged()) {
            const { navigate } = this.props.navigation;
            navigate('Home', {});
        }
        this.setState({page: this.state.pages[0]})
    }

    render() {
        
        return (
            <GestureRecognizer onSwipeLeft={this._nextPage} onSwipeRight={this._prevPage} style={styles.container}>
                {this.state.page ? (
                    <Animated.View style={styles.topHolder, {transform: [{scale: this.state.scaleIndex}] ,opacity: this.state.scaleIndex, alignItems: 'center'}}>
                        <Image style={{width: 256, height: 256}} source={this.state.page.image} />
                        <Text style={styles.welcomeText}>
                            {this.state.page.index > 0 ? (
                                <Text style={styles.titleLead}>O Clientefy é </Text>
                            ) : <></>}
                            {this.state.page.title}
                        </Text>
                        <Text style={styles.leadText}>{this.state.page.label}</Text>
                    </Animated.View>
                ) : <></>}
                <View style={styles.bottomHolder}>
                    <TouchableOpacity onPress={this._skip}>
                        <Text style={styles.skipButton}>Pular</Text>
                    </TouchableOpacity>
                    <View style={styles.circleHolder}>
                        {this.state.pages.map((entry, key) => {
                            return (<View key={key} style={this.state.page == entry ? styles.circleActive : styles.circle}></View>);
                        })}
                    </View>
                    <TouchableOpacity onPress={this._nextPage}>
                        <Text style={styles.nextButton}>Próximo</Text>
                    </TouchableOpacity>
                </View>
            </GestureRecognizer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8fcff',
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 125,
        paddingBottom: 60,
        paddingLeft: 15,
        paddingRight: 15,
    },
    topHolder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 10,
        fontFamily: 'MontserratBold'
    },
    leadText: {
        color: '#808080',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Montserrat'
    },
    bottomHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    circleHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 12,
        height: 12,
        backgroundColor: '#e8e8e8',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        marginRight: 5,
        marginLeft: 5
    },
    circleActive: {
        width: 12,
        height: 12,
        backgroundColor: '#356ec1',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        marginRight: 5,
        marginLeft: 5
    },
    skipButton: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    nextButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4834d4'
    },
    titleLead: {
        fontWeight: 'normal',
    }
})

export default WelcomeScreen;