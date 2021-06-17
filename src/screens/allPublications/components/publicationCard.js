import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import ImageBlurLoading from 'react-native-image-blur-loading'
import { Divider } from 'react-native-paper';

const { height, width } = Dimensions.get('window');


class publicationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <TouchableOpacity onPress={() => this.props.goToDetails(this.props.mag._id)} style={{ height: 250, marginBottom: 20 }}>

                    <View style={{ flexDirection: "row", height: 60, alignItems: 'center', marginLeft: 7 }}>
                        <View>
                            <Image source={require('../../../assets/images/2.jpg')} resizeMode='center' style={{ backgroundColor: 'white', marginRight: 10, height: 40, width: 40, borderRadius: 180 }} />
                        </View>

                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold' }}> {this.props.mag.author} </Text>
                            <Text style={{ fontSize: 12 }}> {this._formated_date()} </Text>
                        </View>
                    </View>
                    <View>
                        {/* <Image source={{ uri: 'https://semeron.heaventech.org' + this.props.mag.image.path }} resizeMode='cover' style={{ height: 200, width: width, }} /> */}
                        <ImageBlurLoading
                            withIndicator
                            thumbnailSource={{ uri: 'https://semeron.heaventech.org' + this.props.mag.image.path }}
                            source={{ uri: 'https://semeron.heaventech.org' + this.props.mag.image.path }}
                            style={{ height: 200, width: width, resizeMode: 'cover' }}
                        />
                    </View>
                </TouchableOpacity>

                <Divider />
            </>
        );
    }

    //
    _formated_date() {
        var date = new Date(this.props.mag._created * 1000);
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        return ` publié le ${day}/${month}/${year}`;
    }
}

export default publicationCard;