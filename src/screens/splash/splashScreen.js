import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { View, Image, Dimensions } from "react-native";
import { connect } from "react-redux";

const { height, width } = Dimensions.get('window');

class splashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //console.log(this.props.profil.profilReducer.isLoggedIn);

        setTimeout(() => {
            this._isLogedIn()
        }, 3000);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E0E4EF' }}>

                <View style={{ flex: 3, alignItems: 'center' }}>
                    <Image resizeMode='center' style={{ width: 160, marginTop: width - 150 }} source={require('../../assets/images/2.jpg')} />
                </View>
                <View style={{ flex: 1, margin: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Bubbles size={5} color="gray" />
                </View>

            </View>
        );
    }

    //
    _isLogedIn() {

        try {
            const firstLauch = this.props.profil.profilReducer.firstLaunch;

            if (firstLauch == true) {
                this.props.navigation.navigate('presentation');
            } else {
                this.props.navigation.navigate(this.props.profil.profilReducer.isLoggedIn === true ? 'home' : 'auth');
            }
        } catch (error) {
            this.props.navigation.navigate('splash');
        }
    }
}

const mapPropsToState = state => {
    return {
        profil: state
    }
}

export default connect(mapPropsToState)(splashScreen);