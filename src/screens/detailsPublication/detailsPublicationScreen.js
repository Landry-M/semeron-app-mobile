import React, { Component } from 'react';
import { ImageBackground, Text, View, ScrollView, TouchableOpacity, Dimensions, ToastAndroid } from "react-native";

import TrackPlayer from 'react-native-track-player';
import RBSheet from "react-native-raw-bottom-sheet";
import Slider from '@react-native-community/slider';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ActivityIndicator from "../components/activityIndicator";

import MyPlayerBar from './components/progressBar';

import get_publication_by_id, { add_mag_to_favorite } from '../../control/details/control_details';


const { width, height } = Dimensions.get('window');


class detailsPublicationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            mag: undefined,
            is_playing: false, //permet de vhanger l'icone play en pause
        };
        this.sound = null;
    }

    componentDidMount() {
        //console.log(this.props.navigation.state.params.id_mag);
        // this.sound = SoundPlayer.loadUrl('http://207.244.251.182/mp3.mp3');

        get_publication_by_id(this.props.navigation.state.params.id_mag)
            .then(res => { this.setState({ mag: res.entries }) })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#E0E4EF' }}>
                {this._render_details_screen()}

                {this._rendre_bottom_sheet()}

                {this._displayActivityIndicator()}
            </ScrollView>
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
    _add_to_favorite = async () => {

        this.setState({ is_loading: true });

        await add_mag_to_favorite(this.state.mag[0]._id)
            .then(res => {

                if (res) {
                    ToastAndroid.showWithGravityAndOffset(
                        'Publication ajouté a vos favoris avec succes.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );

                    this.setState({ is_loading: false });

                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        'Echec lors de l\'ajout de la publication aux favoris.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );

                    this.setState({ is_loading: false });

                }
            });
    }

    //
    _play_song = async () => {

        this.setState({ is_loading: true });

        TrackPlayer.setupPlayer().then(async () => {
            // The player is ready to be used

            let track = {
                id: this.state.mag[0]._id,
                url: 'https://semeron.heaventech.org/' + this.state.mag[0].audio, // Load media from the app bundle
                title: this.state.mag[0].title,
                artist: 'semeron',
                duration: 166,
                // artwork: 'https://semeron.heaventech.org/' + this.state.mag[0].image.path
            }

            await TrackPlayer.add([track]);

            this.RBSheet.open();

            // let trackIndex = await TrackPlayer.getCurrentTrack();
            // console.log(trackIndex);
            const position = await TrackPlayer.getPosition();
            const duration = await TrackPlayer.getDuration();
            console.log(`${duration} seconds left.`);
            TrackPlayer.play();

        });

    };

    //
    _stop_music = () => {
        TrackPlayer.stop().then(() => this.setState({ is_loading: false }));
        this.RBSheet.close();
    };

    _pause_music = async () => {

        const state = await TrackPlayer.getState();
        this.setState({ is_playing: !this.state.is_playing });

        if (state === TrackPlayer.STATE_PLAYING) {

            TrackPlayer.pause()
            this.setState({ is_loading: false })
        } else {

            TrackPlayer.play()
            this.setState({ is_loading: true })
        };

        //this.RBSheet.close();
    }

    //
    _formated_date() {
        var date = new Date(this.state.mag[0]._created * 1000);
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        return ` publié le ${day}/${month}/${year}`;
    }

    //
    _render_details_screen = () => {
        return (
            this.state.mag === undefined
                ?
                <ActivityIndicator />
                :
                <>
                    <ImageBackground style={{ backgroundColor: 'rgba( 0, 0, 0, 0.5 )', height: 200 }} source={{ uri: 'https://semeron.heaventech.org' + this.state.mag[0].image.path }} >
                        <View style={{
                            flex: 2,
                            backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
                            height: 200
                        }}>

                        </View>
                    </ImageBackground>

                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginTop: -23, height: 50, }} >
                        <View style={{ borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3FC4ED', width: 150, height: 35 }}>
                            <Text style={{ color: 'white' }}>
                                Publication {this.state.mag[0].type}
                            </Text>
                        </View>
                    </View>

                    <View style={{ margin: 10, alignItems: 'center' }} >
                        <Text style={{ fontSize: 13, marginTop: 8 }} >
                            {this._formated_date()}
                        </Text>

                        <Text style={{ marginBottom: 7, fontSize: 18, fontWeight: 'bold' }}>
                            {this.state.mag[0].title}
                        </Text>

                        <Text style={{ fontSize: 13, }} >
                            {this.state.mag[0].desc}.
                        </Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 70 }}>

                        {/* <TouchableOpacity style={{ marginRight: 30, borderRadius: 15, borderWidth: 0.5, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
                            <Icon name='thumb-up-outline' color='black' size={30} />
                        </TouchableOpacity> */}

                        {this.state.mag[0].type == 'audio'
                            ?
                            <TouchableOpacity onPress={() => this._play_song()} style={{ marginRight: 30, borderRadius: 15, borderWidth: 0.5, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
                                <Icon name='play-speed' color='black' size={35} />
                            </TouchableOpacity>
                            :
                            <>
                            </>
                        }

                        {/* <TouchableOpacity onPress={() => this._add_to_favorite()} style={{ borderRadius: 15, borderWidth: 0.5, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
                            <Icon name='bookmark-outline' color='black' size={30} />
                        </TouchableOpacity> */}

                    </View>

                </>
        )
    }

    _rendre_bottom_sheet = () => {
        return (
            this.state.mag == undefined
                ?
                <>
                </>
                :
                <View style={{ flex: 1 }}>
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={150}
                        openDuration={250}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }}
                        animationType="slide"
                        closeOnPressMask={false}
                        closeOnPressBack={false}
                    >

                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text> {this.state.mag[0].title} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this._stop_music()} style={{ marginRight: 30, borderRadius: 15, borderWidth: 0.5, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
                                    <Icon name='stop' color='black' size={25} />
                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => this._pause_music()} style={{ borderRadius: 15, borderWidth: 0.5, height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>
                                    {this.state.is_playing
                                        ?
                                        <Icon name='play' color='black' size={25} />
                                        :
                                        <Icon name='pause' color='black' size={25} />
                                    }
                                </TouchableOpacity>

                            </View>

                        </View>

                        {/* <MyPlayerBar /> */}
                        {/* 
                        <Slider
                            style={{ width: 300, height: 40 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="green"
                            maximumTrackTintColor="#000000"
                        /> */}

                    </RBSheet>

                </View>
        );
    };

}

export default detailsPublicationScreen;