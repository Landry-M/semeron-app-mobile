import React, { Component } from 'react';
import { View, ToastAndroid, Text } from 'react-native';
import { TextInput, Button } from "react-native-paper";

import { connect } from "react-redux";

import { update_profil } from "../../control/parametre/params_control";

import ActivityIndicator from '../components/activityIndicator';


class updateParamsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            is_loading: false
        };

        this.church = '';
        this.pseudo = '';
        this.email = '';
    }

    componentDidMount() {
        console.log(
            this.props.profil.profilReducer
        );
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

                <View>
                    <Text style={{ marginBottom: 25, fontWeight: 'bold' }}>
                        Veuillez Editer les champs a mettre à jour
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', marginBottom: 20 }}>

                    <TextInput
                        label='Email'
                        placeholder={this.props.profil.profilReducer.email}
                        onChangeText={email => this._set_email(email)}
                        style={{ height: 50, width: 300, marginBottom: 15 }}
                    />

                    <TextInput
                        label='Pseudonyme'
                        placeholder={this.props.profil.profilReducer.name}
                        onChangeText={pseudo => this._set_pseudo(pseudo)}
                        style={{ height: 50, width: 300, marginBottom: 15 }}
                    />

                    <TextInput
                        label='Eglise'
                        placeholder={this.props.profil.profilReducer.church}
                        onChangeText={eglise => this._set_eglise(eglise)}
                        style={{ height: 50, width: 300, marginBottom: 15 }}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Button icon="database" mode="contained" color="black" onPress={() => this._update_data()}>
                        Mettre à jour
                    </Button>
                </View>

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

    //
    _set_eglise(eglise) {
        this.church = eglise.trim();
    };

    //
    _set_pseudo(pseudo) {
        this.pseudo = pseudo.trim();
        pseudo = this.pseudo;
    };

    //
    _set_email(email) {
        this.email = email.trim();
    };


    //
    _update_data = async () => {

        this.setState({ is_loading: true });

        let update_church = undefined;
        let update_pseudo = undefined;
        let update_email = undefined;

        if (this.church == '') {
            update_church = this.props.profil.profilReducer.church;
        } else {
            update_church = this.church;
        };

        if (this.pseudo == '') {
            update_pseudo = this.props.profil.profilReducer.name;
        } else {
            update_pseudo = this.pseudo;
        };

        if (this.email == '') {
            update_email = this.props.profil.profilReducer.email;
        } else {
            update_email = this.email;
        };

        update_profil(this.props.profil.profilReducer.id, update_pseudo, update_email, update_church)
            .then(res => {
                console.log(res);

                const user_updated =
                {
                    id: res._id,
                    name: res.name,
                    email: res.email,
                    church: res.church
                };

                const action = { type: 'SET_PROFIL', value: user_updated };
                this.props.dispatch(action);
                //this._set_text_input_and_button_editable();
                this.setState({ is_loading: false });

                ToastAndroid.showWithGravityAndOffset(
                    'Informations mis a jour avec succes',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

                this.props.navigation.goBack();

            })
            .catch(err => {
                if (err == "TypeError: Network request failed") {
                    this.props.navigation.navigate('intErr');
                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        'Une erreur est survenue lors de la mise à jour de votre compte',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
            });
    };

}


const mapPropsToState = state => {
    return {
        profil: state
    }
};

export default connect(mapPropsToState)(updateParamsScreen);