import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { Button } from "react-native-paper";

const { height, width } = Dimensions.get('window');

class bugError extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>

                    <Image source={require('../../assets/images/bugError.jpg')} style={{ width: 200, height: 200 }} />

                </View>

                <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', margin: 7 }}>
                        Une erreur est seurvenue lors de la connexion a l'API. Contactez l'administrateur système.
                        </Text>
                </View>

                <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }} >
                    <Button style={{ width: width - (width * 30 / 100) }} color='black' icon="sync" mode="contained" onPress={() => this._restart_app()}>
                        Réessayer
                        </Button>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    {/* <Text>
                        From
                    </Text>
                    <Text style={{ color: 'green' }}>
                        Maadini & Heaven Tech
                    </Text> */}
                </View>
            </View>
        );
    }

    //
    _restart_app = () => {
        this.props.navigation.navigate('splash');
    }
}

export default bugError;