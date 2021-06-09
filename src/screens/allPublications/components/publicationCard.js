import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import ImageBlurLoading from 'react-native-image-blur-loading'

const { height, width } = Dimensions.get('window');


class publicationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.goToDetails(this.props.mag._id)} style={{ height: 250, marginBottom: 10 }}>

                <View style={{ flexDirection: "row", height: 60, alignItems: 'center' }}>
                    <Image source={require('../../../assets/images/far.jpg')} resizeMode='cover' style={{ marginRight: 15, height: 50, width: 50, borderRadius: 180 }} />
                    <Text style={{ fontWeight: 'bold' }}> {this.props.mag.author} </Text>
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
        );
    }
}

export default publicationCard;