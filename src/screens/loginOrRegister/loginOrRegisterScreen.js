import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { Button } from 'react-native-paper';

const { height, width } = Dimensions.get('window');

class loginOrRegisterScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E0E4EF' }}>

                <View style={{ flex: 1.4, justifyContent: 'flex-end', margin: 7 }}>
                    <Image resizeMode='center' style={{ width: 160, height: 60 }} source={require('../../assets/images/2.jpg')} />
                </View>

                <View style={{ flex: 1.5, }}>
                    <Text style={{ color: 'blue', margin: 7 }}>
                        Premier pas
                    </Text>

                    <Text style={{ fontWeight: 'bold', fontSize: 28, margin: 7 }}>
                        Bienvenue sur ton catalogue Préféré
                    </Text>

                    <Text style={{ color: 'gray', margin: 5 }}>
                        Découvre une large gamme de contenue multimédia allant du texte brute, passant par l'image et
                        atterissant sur du contenu audio. Commençons d'abord par creer ton compte utilisateur.
                    </Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', margin: 7, justifyContent: 'center', alignItems: 'flex-end' }}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('register')} style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
                        <Text>
                            Créez compte
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('login')} style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
                        <Text>
                            Connexion
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default loginOrRegisterScreen;