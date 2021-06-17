import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ToastAndroid } from "react-native";
import { TextInput, Button } from 'react-native-paper';

//components
import ActivityIndicator from "../components/activityIndicator";


import { connect } from 'react-redux';

//import Favoris from "./components/favoris";

import { update_profil } from "../../control/parametre/params_control";

const { height, width } = Dimensions.get('window');


class parametreScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            //user_info: {},
            is_loading: false
        };
    };


    componentDidMount() {
        //console.log(this.props.profil.profilReducer);
        //this._set_user_info_to_reducer_on_state()
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E0E4EF' }}>
                {this._profil_content()}
                {this._display_activity_indicator()}
            </View>
        );
    }

    //
    _display_activity_indicator() {
        if (this.state.is_loading) {
            return (
                <ActivityIndicator />
            )
        };
    };


    // //
    // _set_user_info_to_reducer_on_state = async () => {

    //     let tmp_user_info = {};

    //     for (let i in this.props.profil.profilReducer) {
    //         tmp_user_info[i] = this.props.profil.profilReducer[i];
    //     };

    //     await this.setState({ user_info: tmp_user_info });
    //     //console.log(tmp_user_info);
    //     console.log(this.state.user_info);
    // };


    //
    _navigate_to_update_profil() {
        this.props.navigation.navigate('updateParams');
    };
    //
    _profil_content = () => {
        return (
            this.props.profil.profilReducer.isLoggedIn == true
                ?
                <View style={{ alignItems: 'center', }}>

                    <View>
                        <Image style={{ height: 50, width: 100 }} resizeMode='center' source={require('../../assets/images/2.jpg')} />
                        <Text>Vous êtes connecté</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginBottom: 20 }}>


                        <TextInput
                            label='Email'
                            style={{ height: 50, width: 300, marginBottom: 15 }}
                            disabled={true}
                            value={this.props.profil.profilReducer.email}
                        />

                        <TextInput
                            label='Pseudonyme'
                            style={{ height: 50, width: 300, marginBottom: 15 }}
                            disabled={true}
                            value={this.props.profil.profilReducer.name}
                        />

                        <TextInput
                            label='Eglise'
                            style={{ height: 50, width: 300, marginBottom: 15 }}
                            disabled={true}
                            value={this.props.profil.profilReducer.church}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Button icon="pencil" mode="contained" color="black" onPress={() => this._navigate_to_update_profil()} style={{ marginRight: 20 }} >
                            Editer
                        </Button>

                    </View>

                </View>
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
};

export default connect(mapPropsToState)(parametreScreen);