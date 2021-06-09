import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";

import { connect } from 'react-redux';

class parametreScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._profil_content()}
            </View>
        );
    }

    //
    _profil_content = () => {
        return (
            this.props.profil.profilReducer.isLoggedIn == true
                ?
                <>
                    <Text>Vous etes connecté</Text>
                </>
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Image style={{ height: 250, width: 250, borderRadius: 200 }} source={require('../../assets/images/connexion.jpg')} />
                    <Text style={{ fontWeight: 'bold', }}>Aucun compte actif</Text>
                </View>
        );
    };


}

const mapPropsToState = state => {
    return {
        profil: state
    }
}

export default connect(mapPropsToState)(parametreScreen);