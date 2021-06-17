import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { register_user, get_user_info } from "../../control/Users/control_user";
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
                        type="outlined"
                        onChangeText={(pseudo) => this._setPseudo(pseudo)}
                        style={{ marginBottom: 5, margin: 7 }}
                    />

                    <TextInput
                        label="Email"
                        type='outilined'
                        onChangeText={(email) => this._setEmail(email)}
                        style={{ marginBottom: 5, margin: 7 }}
                    />

                    <TextInput
                        label="Eglise"
                        onChangeText={(eglise) => this._setEglise(eglise)}
                        type='outlined'
                        style={{ margin: 7 }}
                    />

                </ScrollView>

                <View style={{ flex: 0.18, flexDirection: 'row', margin: 7, justifyContent: 'center', alignItems: 'flex-end' }}>


                    <TouchableOpacity onPress={() => this._onValidate()} style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
                        <Text>
                            Valider
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('home')} style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
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
        //console.log(`${this.email} ${this.pseudo} ${this.eglise}`);
        this.setState({ is_loading: true });

        if (this.email == undefined || this.pseudo == undefined || this.eglise == undefined) {
            Alert.alert(
                "Attention !",
                "Veuillez remplir tous les champs",
                [
                    { text: "OK", onPress: () => this.setState({ is_loading: false }) }
                ],
                { cancelable: false }
            );
        } else {

            let user_exist = get_user_info(this.pseudo)
                .then(res => {
                    //console.log(res.total);
                    if (res.total == 0) {

                        register_user(this.pseudo, this.email, this.eglise).then(res => {
                            //redux et redirection (register reussi)
                            const userCreated =
                            {
                                id: res._id,
                                name: res.name,
                                email: res.email,
                                church: res.church
                            };

                            //console.log(res.name);
                            const action = { type: 'SET_PROFIL', value: userCreated }
                            this.props.dispatch(action);
                            this.props.navigation.navigate('home');

                        }).catch(err => {
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

                    } else {
                        ToastAndroid.showWithGravityAndOffset(
                            'Pseudo déjà utilisé',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }
                })
                .catch(err => {
                    //console.log(err);
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
                });

            //let creation_user = await register_user(pseudo, email, eglise);
            this.setState({ is_loading: false });
        }
    };
}

const mapPropsToState = state => {
    return {
        profil: state
    }
}

export default connect(mapPropsToState)(register);