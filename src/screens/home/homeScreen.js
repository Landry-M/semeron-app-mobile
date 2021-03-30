import React, { Component } from 'react';
import { View, Image, Text } from "react-native";

class homeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E0E4EF' }}>

            </View>
        );
    }
}

export default homeScreen;