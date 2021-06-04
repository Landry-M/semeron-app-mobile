import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { register_user } from "../../control/Users/control_user";
import { Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader";
import ActivityIndicator from "../components/activityIndicator";


class register extends Component {

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

        this.pseudo = undefined;
        this.email = undefined;
        this.eglise = undefined;
    }

    componentDidMount() {
        //register_user();
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E0E4EF' }}>

                <View style={{ flex: 0.3, justifyContent: 'flex-end', margin: 7 }}>
                    <Image resizeMode='center' style={{ width: 160, height: 60 }} source={require('../../assets/images/2.jpg')} />
                </View>

                <ScrollView style={{ flex: 2, margin: 7 }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 28, margin: 7 }}>
                        Nouveau?, Tu peux créer ton compte grâce a ce formulaire
                    </Text>

                    <TextInput
                        label="Pseudonyme"
                        value=""
                        type="outlined"

                        style={{ marginBottom: 5, margin: 7 }}
                    />

                    <TextInput
                        label="Email"
                        value=""
                        type='outilined'
                        style={{ marginBottom: 5, margin: 7 }}
                    />

                    <TextInput
                        label="Eglise"
                        value=""
                        style={{ margin: 7 }}
                    />

                </ScrollView>

                <View style={{ flex: 0.18, flexDirection: 'row', margin: 7, justifyContent: 'center', alignItems: 'flex-end' }}>


                    <TouchableOpacity onPress={() => this.props.navigation.navigate('login')} style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
                        <Text>
                            Connexion
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
                        <Text>
                            Ignorer
                        </Text>
                    </TouchableOpacity>
                </View>

                { this._load()}

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
    _setPseudo(pseudo) {
        this.pseudo = pseudo.trim();
    };

    //
    _setEmail(email) {
        this.email = email.trim();
    };

    //
    _setEglise(eglise) {
        this.eglise = eglise.trim();
    };

    //
    _onValidate() {
        this.setState({ is_loading: true });

        if (this.email == undefined || this.pseudo == undefined || this.eglise == undefined) {
            Alert.alert(
                "Attention !",
                "Veuillez remplir tous les champs",
                [
                    { text: "OK", onPress: () => this.setState({ is_loading: false }) }
                ],
                { cancelable: true }
            );
        } else {
            async () => {
                let creation_user = await register_user(pseudo, email, eglise);

            };
        }
    };
}

export default register;