import React, { Component } from 'react';
import { Image, ImageBackground, Text, View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import SoundPlayer from 'react-native-sound-player'

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import get_publication_by_id from '../../control/details/control_details';

import ActivityIndicator from "../components/activityIndicator";


const { width, height } = Dimensions.get('window');

class detailsPublicationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            mag: undefined,
        };
        this.sound = null;
    }

    componentDidMount() {
        //console.log(this.props.navigation.state.params.id_mag);
        // this.sound = SoundPlayer.loadUrl('http://207.244.251.182/mp3.mp3');

        get_publication_by_id(this.props.navigation.state.params.id_mag)
            .then(res => { console.log(res.entries); this.setState({ mag: res.entries }) })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E0E4EF' }}>
                {this._render_screen()}

            </View>
        );
    }

    //
    _playSound = () => {
        try {

            // or play from url
            //SoundPlayer.playUrl('http://207.244.251.182/mp3.mp3');
            SoundPlayer.play();
        } catch (e) {
            console.log(`cannot play the sound file: `, e);
        }
    }

    //
    _pauseSound = () => {
        SoundPlayer.pause();
    }


    //
    _render_screen = () => {
        return (
            this.state.mag == undefined
                ?
                <ActivityIndicator />
                :
                <>

                    <ImageBackground style={{ backgroundColor: 'rgba( 0, 0, 0, 0.5 )', height: 200 }} source={require('../../assets/images/foor.jpg')} >
                        <View style={{
                            flex: 2,
                            backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
                            height: 200
                        }}
                        >
                            <View style={{ margin: 7 }} >
                                <Text style={{ color: 'white', fontSize: 13, marginTop: 80 }} >
                                    26 juin 1996
                            </Text>

                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                    {this.state.mag.title} id: {this.props.navigation.state.params.id_mag}
                                </Text>

                                <Text style={{ color: 'white', fontSize: 13, }} >
                                    Description de la publication avec un peu plus de caractere pour le test.
                            </Text>
                            </View>

                        </View>
                    </ImageBackground>

                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginTop: -23, height: 50, }} >
                        <View style={{ borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3FC4ED', width: 150, height: 35 }}>
                            <Text style={{ color: 'white' }}>
                                Publication audio
                        </Text>
                        </View>
                    </View>

                    {/* footer */}
                    <View style={{ height: (height - ((height * 59) / 100)), alignItems: 'flex-end', flexDirection: 'row' }}>

                        {/* like, share ,download */}
                        <View style={{ flexDirection: 'row', height: 50, width: (width - ((width * 50) / 100)), backgroundColor: '#3FC4ED', borderWidth: 1, borderColor: '#3FC4ED' }}>
                            <TouchableOpacity style={{ height: 45, marginRight: 25 }} >
                                <Image
                                    source={require('../../assets/images/share.png')}
                                    style={{ height: 40, width: 40 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 45, marginRight: 25, }}>
                                <Image
                                    source={require('../../assets/images/like.png')}
                                    style={{ height: 40, width: 40 }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 50, width: (width - ((width * 50) / 100)), flexDirection: 'row', borderWidth: 1, borderColor: '#3FC4ED', alignItems: 'center', justifyContent: 'space-around' }}>
                            {/* <Text>
                            gsd
                        </Text> */}
                            <TouchableOpacity onPress={() => this._playSound()} >
                                <Icon name="play-circle-outline" color='#3FC4ED' size={40} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this._pauseSound()} >
                                <Icon name="pause" color='#3FC4ED' size={40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
        )
    }
}

export default detailsPublicationScreen;