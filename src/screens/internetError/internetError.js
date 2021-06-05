import React, { Component } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Button } from "react-native-paper";

const { height, width } = Dimensions.get('window');

class internetError extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // console.log(this.props.app.userReducer.user_info.is_logged_in);
        // setTimeout(() => {
        //     // this.props.navigation.navigate('dash');
        //     this._retrieve_first_connection();
        // }, 2000);

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>

                    <Image source={require('../../assets/images/internet.jpg')} style={{ width: 200, height: 200 }} />

                </View>

                <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', margin: 7 }}>
                        Erreur de connexion à internet veuillez vérifier votre acces au réseaux.
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

export default internetError;