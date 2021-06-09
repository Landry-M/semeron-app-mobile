import React, { Component } from 'react';
import { TouchableOpacity, Text, Image } from "react-native";

import ImageBlurLoading from 'react-native-image-blur-loading'


class cardLesPlusSuivi extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.goToDetails()} style={{ borderRadius: 5, height: 145, width: 110, borderWidth: 1, borderColor: '#E0E9EF', margin: 5 }}>
                {/* <Image source={{ uri: 'https://semeron.heaventech.org' + this.props.mag.image.path }} style={{ borderRadius: 5, height: 140, width: 108 }} resizeMode='cover' /> */}

                <ImageBlurLoading
                    withIndicator
                    thumbnailSource={{ uri: 'https://semeron.heaventech.org' + this.props.mag.image.path }}
                    source={{ uri: 'https://semeron.heaventech.org' + this.props.mag.image.path }}
                    style={{ borderRadius: 5, height: 110, width: 108, resizeMode: 'cover' }}
                />

                <Text style={{ margin: 4, fontSize: 12 }}>
                    {this.props.mag.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default cardLesPlusSuivi;