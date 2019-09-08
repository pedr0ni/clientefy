import React from 'react';
import { Text } from 'react-native'; 
import * as Font from 'expo-font';

class Texto extends React.Component {

    state = {
        fontLoaded: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
            'MontserratBold': require('../assets/fonts/Montserrat-Bold.ttf')
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        const { content } = this.props; 
        return (
            this.state.fontLoaded ? (
                <Text style={this.props.style}>{ this.props.children }</Text>
            ) : <></>
        );
    }
}

export default Texto;