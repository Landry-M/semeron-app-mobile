import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Alert, ToastAndroid } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from 'react-redux';

import login_user, { get_user_info } from "../../control/Users/control_user";

import ActivityIndicator from '../components/activityIndicator';


class loginScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
        };

        this.eglise = "";
        this.pseudo = "";
    }

    componentDidMount() {
        console.log(this.props.profil.profilReducer);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E0E4EF' }}>

                <View style={{ flex: 0.4, justifyContent: 'flex-end', margin: 7 }}>
                    <Image resizeMode='center' style={{ width: 160, height: 60 }} source={require('../../assets/images/2.jpg')} />
                </View>

                <ScrollView style={{ flex: 2, margin: 7 }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 28, margin: 7 }}>
                        Hello!, Bon retour à toi, tu peux acceder a ton compte
                    </Text>

                    <TextInput
                        placeholder="Pseudonyme"
                        onChangeText={(pseudo) => this._set_pseudo(pseudo)}
                        style={{ marginBottom: 10 }}
                    />

                    <TextInput
                        placeholder="Eglise"
                        onChangeText={(eglise) => this._set_eglise(eglise)}
                    />

                </ScrollView>

                <View style={{ flex: 0.18, flexDirection: 'row', margin: 7, justifyContent: 'center', alignItems: 'flex-end' }}>

                    <TouchableOpacity onPress={() => this._on_validate()} style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
                        <Text>
                            Se connecter
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('home')} style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
                        <Text>
                            Ignorer
                        </Text>
                    </TouchableOpacity>
                </View>
                {this._load()}
            </View>
        );
    }

    _load() {
        if (this.state.is_loading) {
            return (
                <ActivityIndicator />
            );
        }
    }

    //
    _set_pseudo(pseudo) {
        this.pseudo = pseudo.trim();
    }

    //
    _set_eglise(eglise) {
        this.eglise = eglise.trim();
    }

    //
    _on_validate() {
        this.setState({ is_loading: true });
        console.log(` ${this.pseudo} ${this.eglise} `);

        if (this.pseudo == "" || this.eglise == "") {
            Alert.alert(
                "Attention !",
                "Veuillez remplir tous les champs",
                [
                    { text: "OK", onPress: () => this.setState({ is_loading: false }) }
                ],
                { cancelable: false }
            );
        } else {

            login_user(this.pseudo, this.eglise)
                .then(res => {
                    this.setState({ is_loading: false });

                    if (res.total == 0) {
                        ToastAndroid.showWithGravityAndOffset(
                            'Coorodnnées de connexion incorrect.',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    } else {
                        const user_logged_in =
                        {
                            id: res._id,
                            name: res.name,
                            email: res.email,
                            church: res.church
                        };

                        const action = { type: 'SET_PROFIL', value: user_logged_in }
                        this.props.dispatch(action);
                        this.props.navigation.navigate('home');

                    }

                })
                .catch(err => {
                    if (err == "TypeError: Network request failed") {
                        this.props.navigation.navigate('intErr');
                    } else {
                        ToastAndroid.showWithGravityAndOffset(
                            'Une erreur est survenue lors de la creation de votre compte',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }
                })
        }
    }
}


const mapPropsToState = state => {
    return {
        profil: state
    }
}

export default connect(mapPropsToState)(loginScreen);