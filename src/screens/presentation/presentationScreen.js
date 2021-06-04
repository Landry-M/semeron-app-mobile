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
                        Elit nostrud veniam veniam proident eu exercitation nisi ullamco eiusmod. Do aute eu consectetur nulla quis laboris culpa irure cillum commodo. Consectetur id est deserunt dolor sit aliquip duis laborum culpa ipsum consequat commodo ad. Ut sint eiusmod sunt fugiat dolore aute ullamco esse minim veniam commodo sunt deserunt esse.
                    </Text>
                </View>

                <View style={styles.main_container} >

                    <Image source={require('../../assets/images/slide2.jpg')} resizeMode='center' style={{ height: 350, width: 350 }} />
                    <Text style={{ textAlign: 'center' }}>
                        Amet mollit ea duis consectetur aliquip dolore qui occaecat reprehenderit proident sit nostrud eu ex. Excepteur occaecat tempor veniam commodo dolor. Eiusmod nisi laboris ut aliquip minim. Aliquip dolor labore ut voluptate reprehenderit laborum. Anim ullamco sit excepteur voluptate sunt adipisicing ipsum.
                    </Text>
                </View>

                <View style={styles.main_container} >
                    <Image source={require('../../assets/images/slide3.jpg')} resizeMode='center' style={{ height: 350, width: 350 }} />
                    <Text style={{ textAlign: 'center' }}>
                        Laborum dolore adipisicing et tempor dolore consectetur ad excepteur esse occaecat. Esse ipsum voluptate ex voluptate excepteur nostrud. Enim veniam reprehenderit culpa adipisicing voluptate veniam irure velit mollit minim ipsum laboris exercitation amet. Ea cillum velit officia laborum ullamco velit esse velit officia laborum aute est. Ut fugiat sunt id ex incididunt qui minim officia veniam.
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