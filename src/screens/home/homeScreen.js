import React, { Component } from 'react';
import { RefreshControl, ToastAndroid, View, Image, Text, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import Swiper from "react-native-web-swiper";
import { connect } from "react-redux";
import ActivityIndicator from "../components/activityIndicator";
import ImageBlurLoading from 'react-native-image-blur-loading'

//call api
import get_caroussel, { get_audio_article, partner_logo, get_text_article, get_latest_content } from "../../control/home/control_home";

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
        this.state = {
            is_loading: false,
            slider_data: undefined,
            partner_logo: undefined,
            audio_articles: undefined,
            text_articles: undefined,
            latest_content: undefined,
        };
    }

    componentDidMount() {
        //console.log(this.props.profil);
        this._get_latest_content();
        this._get_audio_articles();
        this._get_text_articles();
        this._get_caroussel_data();
        this._get_partner_logo();

    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#E0E4EF' }}>

                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5 }}>
                    <Text style={{ marginLeft: 7, fontWeight: 'bold', color: 'green', fontSize: 18 }}>
                        Semeron
                        </Text>
                    {/* <TouchableOpacity>
                        <Image source={require('../../assets/images/f1.jpg')} resizeMode='cover' style={{ borderRadius: 50, width: 40, height: 40 }} />
                    </TouchableOpacity> */}
                </View>

                <View style={{ height: 270, }} >
                    {this._swiper_content()}
                </View>

                {/* partenaire */}
                {this._partner_logo_content()}

                <Divider />

                {/* derniere publication */}
                {this._latest_content()}

                <Divider />

                {/* publications audios */}
                {this._audio_content()}

                <Divider />

                {/* publications textuelle */}
                {this._text_content()}

            </ScrollView>
        );
    }

    //
    _view_all(categ) {
        this.props.navigation.navigate('allMag', { categ_mag: categ });
    }

    //
    _goToDetails = (id) => {
        this.props.navigation.navigate('details', { id_mag: id });
    }

    //methode de recup du contenu du caroussel a l'api et hydrate le state silder_data
    _get_caroussel_data = () => {
        get_caroussel()
            .then(res => {
                this.setState({ slider_data: res.entries });
            })
            .catch(
                err => {
                    if (err == "TypeError: Network request failed") {
                        this.props.navigation.navigate('intErr');
                    } else {

                        this.props.navigation.navigate('bugErr');
                    }
                }
            );
    }

    //contenue du caroussel ici
    _swiper_content = () => {
        return (
            this.state.slider_data == undefined
                ?
                <ActivityIndicator />
                :
                <>
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
                        {this.state.slider_data.map((data, key) => {
                            return (
                                <View style={styles.main_container} >
                                    <Image source={{ uri: 'https://semeron.heaventech.org' + data.img_paysage.path }} resizeMode='cover' style={styles.image} />

                                    <View>
                                        <Image style={{ marginLeft: 5, height: 150, width: 100, borderRadius: 15, marginTop: -85 }} source={{ uri: 'https://semeron.heaventech.org' + data.img_portrait.path }} resizeMode='cover' />

                                        <Text style={{ marginTop: -50, marginLeft: 110, fontWeight: 'bold', fontSize: 13, marginRight: 7 }}>
                                            {data.title}
                                        </Text>
                                    </View>

                                </View>
                            );
                        })}
                    </Swiper>
                    <Divider />
                </>
        );
    }

    //recup des logo des partenaires a l'api
    _get_partner_logo() {
        partner_logo()
            .then(res => this.setState({ partner_logo: res.entries }))
            .catch(err => console.log(err));
    }

    //contenue des logo partenaires ici
    _partner_logo_content = () => {
        return (
            this.state.partner_logo == undefined
                ?
                <View>

                </View>
                :
                <View>

                    <Text style={{ fontWeight: 'bold', marginLeft: 12, paddingBottom: 10, color: '#3FC4ED' }}>NOS PARTENAIRES</Text>
                    <FlatList
                        contentContainerStyle={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', height: 75, }}
                        data={this.state.partner_logo}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => <Partners data={item} />}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
        );
    }

    //methode de recup des articles audios
    _get_audio_articles = () => {
        get_audio_article()
            .then(res => { this.setState({ audio_articles: res.entries }) })
            .catch(err => { console.log(err); });
    };


    //
    _audio_content = () => {
        // console.log(this.state.audio_articles);
        return (
            this.state.audio_articles === undefined
                ?
                <View></View>
                :
                <View style={{ margin: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Publications audio
                        </Text>
                        <TouchableOpacity onPress={() => this._view_all('audio')} style={{ flexDirection: 'row', marginRight: 10, width: 75, height: 25, borderRadius: 7, justifyContent: 'center', alignItems: 'center', borderColor: '#3FC4ED' }}>
                            <Text style={{ color: '#3FC4ED', marginRight: 5, fontWeight: 'bold' }}>
                                Voir tout
                            </Text>
                            <Icon name='arrow-right' color='#3FC4ED' size={15} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <FlatList
                            data={this.state.audio_articles}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item }) => <LesPlusSuivi mag={item} goToDetails={this._goToDetails} />}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
        );
    };

    //method pour recup les articles textuelle
    _get_text_articles = () => {
        get_text_article()
            .then(res => this.setState({ text_articles: res.entries }))
            .catch(er => console.log(err));
    }

    //
    _text_content = () => {
        return (
            this.state.text_articles === undefined
                ?
                <View></View>
                :
                <View style={{ margin: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Publications textuelles
                        </Text>
                        <TouchableOpacity onPress={() => this._view_all('texte')} style={{ flexDirection: 'row', marginRight: 10, width: 75, height: 25, borderRadius: 7, justifyContent: 'center', alignItems: 'center', borderColor: '#3FC4ED' }}>
                            <Text style={{ color: '#3FC4ED', marginRight: 5, fontWeight: 'bold' }}>
                                Voir tout
                            </Text>
                            <Icon name='arrow-right' color='#3FC4ED' size={15} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <FlatList
                            data={this.state.text_articles}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item }) => <LesPlusSuivi mag={item} goToDetails={this._goToDetails} />}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
        );
    }

    //methide de recup des dernierer publications
    _get_latest_content = () => {
        get_latest_content()
            .then(res => { this.setState({ latest_content: res.entries }); })
            .catch(err => console.error(err))
    }

    //
    _latest_content = () => {
        return (
            this.state.latest_content == undefined
                ?
                <View></View>
                :
                <View style={{ margin: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Dernières Publications
                        </Text>
                        <TouchableOpacity onPress={() => this._view_all('all')} style={{ flexDirection: 'row', marginRight: 10, width: 75, height: 25, borderRadius: 7, justifyContent: 'center', alignItems: 'center', borderColor: '#3FC4ED' }}>
                            <Text style={{ color: '#3FC4ED', marginRight: 5, fontWeight: 'bold' }}>
                                Voir tout
                            </Text>
                            <Icon name='arrow-right' color='#3FC4ED' size={15} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <FlatList
                            data={this.state.latest_content}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item }) => <CardMagazine mag={item} goToDetails={this._goToDetails} />}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
        );
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
        margin: 7,
        width: width,

        //justifyContent: 'center',
        //alignItems: 'center'
        // backgroundColor: 'red'
    },
    image: {
        height: 170, width: width - 20, borderRadius: 12
    }
});

const mapPropsToState = state => {
    return {
        profil: state
    }
}

export default connect(mapPropsToState)(homeScreen);