import React, { Component } from 'react';
import { connect } from "react-redux";
import AppIntroSlider from 'react-native-app-intro-slider';
import slideData from "../../assets/data/slideData";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Swiper from 'react-native-web-swiper';

const { height, width } = Dimensions.get('window');

class presentationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props.profil.profilReducer);
    }

    render() {
        return (
            <Swiper
                controlsProps={{
                    prevTitle: 'Précedent',
                    nextTitle: 'Suivant',
                    prevPos: false,
                    nextPos: false
                }}
            >
                <View style={styles.main_container} >
                    <Image source={require('../../assets/images/slide1.jpg')} resizeMode='center' style={{ height: 350, width: 350 }} />
                    <Text style={{ textAlign: 'center' }}>
                        Le terme semeron est le mot hébreux pour désigner « ce jour, aujourd’hui ».
                        Ce que nous poursuivons, c’est de pouvoir nous exhorter tous les jours, aussi longtemps
                        qu’on peut dire: Aujourd’hui!.
                    </Text>
                </View>

                <View style={styles.main_container} >

                    <Image source={require('../../assets/images/slide2.jpg')} resizeMode='center' style={{ height: 350, width: 350 }} />
                    <Text style={{ textAlign: 'center' }}>

                        La vision du magazine est d’édifier tous les jour le peuple de Dieu au moyen de la parole de Dieu selon
                        le texte qu’on retrouve dans Hébreux 3:13 qui dit: “Mais exhortez-vous les uns les autres chaque jour,
                        aussi longtemps qu'on peut dire:
                        Aujourd'hui! afin qu'aucun de vous ne s'endur-cisse par la séduction du péché.
                    </Text>
                </View>

                <View style={styles.main_container} >
                    <Image source={require('../../assets/images/slide3.jpg')} resizeMode='center' style={{ height: 350, width: 350 }} />
                    <Text style={{ textAlign: 'center' }}>

                        Projet dynamique et innovant, Wonderfull Christian Magazine est un média culturel chrétien
                        qui se différencie des autres par les moyens queque le projet met en œuvre
                        pour atteindre le public, l’exhaustivité de l’information que nous proposons et les sujets
                        que nous traitons.

                    </Text>

                    <View style={{ height: 50, width: width, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 15 }}>
                        <TouchableOpacity onPress={() => this._onDone()} style={{ flexDirection: 'row', marginRight: 10, width: 75, height: 25, borderRadius: 7, justifyContent: 'center', alignItems: 'center', borderColor: '#3FC4ED' }}>
                            <Text style={{ color: '#3FC4ED', marginRight: 5 }}>
                                C'est parti
                        </Text>
                            <Icon name='arrow-right' color='#3FC4ED' size={15} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Swiper>
        );
    }

    _onDone = async () => {
        try {
            const action = { type: 'SET_FIRST_LAUNCH_APP', value: false }
            await this.props.dispatch(action);
            this.props.navigation.navigate('auth');

        }
        catch (error) {
            ToastAndroid.show('Erreur veuillez réesayer', ToastAndroid.LONG);
        }
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
        flex: 1,
        margin: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    }

});


const mapPropsToState = state => {
    return {
        profil: state
    }
}

export default connect(mapPropsToState)(presentationScreen);