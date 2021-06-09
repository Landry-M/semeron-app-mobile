import React, { Component } from 'react';
//import { TextInput, } from "react-native-paper";
import { View, Text, Image, FlatList, Alert, TextInput } from "react-native";

import Search_result_card from './components/search_result_card';
import ActivityIndicator from "../components/activityIndicator";

//api
import search_magazine from "../../control/search/control_search";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';


class searchScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            mags: undefined,
            is_loading: false,
        };

        this.searched_mag = "";
    }

    render() {
        return (
            <View style={{ flex: 1, margin: 7 }}>
                <TextInput
                    placeholder="Recherche ... "
                    onChangeText={mag => this.setText(mag)}
                    //  right={<TextInput.Icon name={() => <Icon name={'cloud-search-outline'} size={20} style={{ color: '#3FC4ED' }} />} />}
                    style={{ paddingLeft: 10, borderWidth: 0.5, height: 40, color: 'black', borderRadius: 20 }}
                    onSubmitEditing={() => this._make_search()}
                />

                <View style={{ margin: 7, marginTop: 10, flex: 1 }}>
                    {this._search_result()}
                </View>

                {this._displayActivityIndicator()}
            </View>
        );
    }

    // activity indicator
    _displayActivityIndicator() {
        if (this.state.is_loading == true) {
            return (
                <ActivityIndicator />
            )
        }
    }

    //
    setText(mag) {
        //console.log(mag);
        this.searched_mag = mag.trim();
    };

    //lancerment de la recherche
    _make_search = () => {
        console.log(this.searched_mag);
        this.setState({ is_loading: true })

        if (this.searched_mag.length > 0) {
            search_magazine(this.searched_mag)
                .then(res => this.setState({ mags: res.entries, is_loading: false }))
                .catch(err => {
                    if (err == "TypeError: Network request failed") {
                        this.props.navigation.navigate('intErr');
                    } else {
                        console.log(err);
                        this.props.navigation.navigate('bugErr');
                    }
                });

        } else {
            Alert.alert("Attention!", "Vous n'avez rien saisie dans le champ recherche!");
            this.setState({ is_loading: false });
        }
    };

    //rendu de l'ecran de resultat de recherche
    _search_result = () => {
        return (
            this.state.mags == ""
                ?
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 120 }}>
                    <Image source={require('../../assets/images/404.png')} style={{ height: 200, width: 300, }} />
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}>Article non trouvé</Text>
                </View>
                :
                <FlatList
                    data={this.state.mags}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => <Search_result_card mag={item} GoToDetailsPage={this._goToGamesDetails} />}
                />
        );
    };

    //Navigate to detail
    _goToGamesDetails = (id_mag) => {
        this.props.navigation.navigate('details', { id: id_mag });
    }
}

export default searchScreen;