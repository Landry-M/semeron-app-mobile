import React, { Component } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

class partners extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //console.log(this.props.data);
    }

    render() {
        return (
            <View style={{ height: 75, width: 120, alignItems: 'center', flexDirection: 'row', margin: 9 }}>
                <Image source={this.props.data.image} style={{ height: 70, width: 70, borderRadius: 70, backgroundColor: 'white' }} resizeMode='cover' />
                {/* <Text> {this.props.data.id} </Text> */}
            </View>
        );
    }
}

export default partners;