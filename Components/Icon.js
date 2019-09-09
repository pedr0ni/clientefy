import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

class Icon extends React.Component {
    render () {
        return (
            <Ionicons 
                name={Platform.OS === 'ios' ? "ios-" + this.props.name : 'md-' + this.props.name} 
                size={this.props.size}
                color={this.props.color} 
            />
        )
    }
}

export default Icon;