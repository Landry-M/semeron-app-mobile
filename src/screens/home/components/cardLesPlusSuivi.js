import React, { Component } from 'react';
import { TouchableOpacity, Text, Image } from "react-native";

class cardLesPlusSuivi extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.goToDetails()} style={{ borderRadius: 5, height: 180, width: 110, borderWidth: 1, borderColor: '#E0E9EF', margin: 5 }}>
                <Image source={require('../../../assets/images/f1.jpg')} style={{ borderRadius: 5, height: 140, width: 108 }} resizeMode='cover' />
                <Text style={{ margin: 4, fontSize: 12 }}>
                    Mon Dieu ...
                </Text>
            </TouchableOpacity>
        );
    }
}

export default cardLesPlusSuivi;