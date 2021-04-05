import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import Swiper from "react-native-web-swiper";

import Partners from "./components/partners";
import CardMagazine from './components/cardMagazine';
import LesPlusSuivi from "./components/cardLesPlusSuivi";

import faker from "../../assets/data/faker";
import partnersData from "../../assets/data/partnersData";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const { height, width } = Dimensions.get('window');

class homeScreen extends Component {

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
            <ScrollView style={{ flex: 1, backgroundColor: '#E0E4EF' }}>

                <View style={{ marginTop: 10, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5 }}>
                    <Text style={{ marginLeft: 7, fontWeight: 'bold' }}>
                        Découverte
                        </Text>
                    <TouchableOpacity>
                        <Image source={require('../../assets/images/f1.jpg')} resizeMode='cover' style={{ borderRadius: 50, width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 270, }} >

                    <Swiper
                        timeout={5}
                        loop={true}
                        controlsProps={{
                            prevTitle: 'Précedent',
                            nextTitle: 'Suivant',
                            prevPos: false,
                            nextPos: false
                        }}

                    >

                        <View style={styles.main_container} >
                            <Image source={require('../../assets/images/far.jpg')} resizeMode='cover' style={styles.image} />

                            <View>
                                <Image style={{ height: 150, width: 100, borderRadius: 15, marginTop: -85 }} source={require('../../assets/images/f4.jpg')} resizeMode='cover' />

                                <Text style={{ marginTop: -50, marginLeft: 110, fontWeight: 'bold', fontSize: 13 }}>
                                    Bienvenue sur l'application semeron, nous vous souhaitons une bonne ecoute
                                </Text>
                            </View>

                        </View>

                        <View style={styles.main_container} >
                            <Image source={require('../../assets/images/foor.jpg')} resizeMode='cover' style={styles.image} />

                            <View>
                                <Image style={{ height: 150, width: 100, borderRadius: 15, marginTop: -85 }} source={require('../../assets/images/f1.jpg')} resizeMode='cover' />

                                <Text style={{ marginTop: -50, marginLeft: 110, fontWeight: 'bold', fontSize: 13 }}>
                                    La bonne nouvelle du jours selon ...
                                </Text>
                            </View>
                        </View>

                        <View style={styles.main_container} >
                            <Image source={require('../../assets/images/mk.jpg')} resizeMode='cover' style={styles.image} />

                            <View>
                                <Image style={{ height: 150, width: 100, borderRadius: 15, marginTop: -85 }} source={require('../../assets/images/f4.jpg')} resizeMode='cover' />

                                <Text style={{ marginTop: -50, marginLeft: 110, fontWeight: 'bold', fontSize: 13 }}>
                                    Une publicité ici ...
                                </Text>
                            </View>
                        </View>

                    </Swiper>
                </View>

                <Divider />

                {/* partenaire */}
                <View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 12, paddingBottom: 10, color: '#3FC4ED' }}>NOS PARTENAIRES</Text>
                    <FlatList
                        contentContainerStyle={{ alignItems: 'center', height: 75, }}
                        data={partnersData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Partners data={item} />}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <Divider />

                {/* derniere publication */}
                <View style={{ margin: 12 }}>
                    <Text style={{ fontWeight: 'bold', }}>
                        Dernières Publications
                    </Text>

                    <View>
                        <FlatList

                            data={faker}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <CardMagazine data={item} goToDetails={this._goToDetails} />}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>

                <Divider />

                {/* LEs plus suivi */}
                <View style={{ margin: 12 }}>
                    <Text style={{ fontWeight: 'bold', }}>
                        Les plus suivi
                    </Text>

                    <View>
                        <FlatList

                            data={faker}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <LesPlusSuivi data={item} goToDetails={this._goToDetails} />}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

    //
    _goToDetails = () => {
        this.props.navigation.navigate('details');
    }
}

const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main_container: {
        height: 250,
        margin: 5,
        //justifyContent: 'center',
        //alignItems: 'center'
        // backgroundColor: 'red'
    },
    image: {
        height: 170, width: 350, borderRadius: 12
    }
    //[...]
});

export default homeScreen;