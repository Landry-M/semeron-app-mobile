import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

class register extends Component {

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

                <View style={{ flex: 0.4, justifyContent: 'flex-end', margin: 7 }}>
                    <Image resizeMode='center' style={{ width: 160, height: 60 }} source={require('../../assets/images/2.jpg')} />
                </View>

                <ScrollView style={{ flex: 2, margin: 7 }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 28, margin: 7 }}>
                        Nouveau?, Tu peux creer ton compte grace à ce formulaire
                    </Text>

                    <TextInput
                        label="Pseudonyme"
                        value=""

                    />

                    <TextInput
                        label="Mot de passe"
                        value=""

                    />

                </ScrollView>

                <View style={{ flex: 0.5, flexDirection: 'row', margin: 7, justifyContent: 'center', alignItems: 'flex-end' }}>


                    <TouchableOpacity onPress={() => this.props.navigation.navigate('home')} style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
                        <Text>
                            Créez compte
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', height: 40, width: 110, alignItems: 'center', borderColor: '#3FC4ED', borderWidth: 1 }}>
                        <Text>
                            Ignorer
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default register;