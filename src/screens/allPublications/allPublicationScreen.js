import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';

import get_all_publications, { get_all_publications_by_categ } from "../../control/allPublications/control_allPublications";

import ActivityIndicator from "../components/activityIndicator";
import PublicationCard from "./components/publicationCard";


class allPublicationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            mags: undefined,
        };
    };

    componentDidMount() {
        this._get_all_publications(this.props.navigation.state.params.categ_mag);
    };

    render() {
        return (
            <View style={{ flex: 1, }}>
                {this._display_all_mags()}
                {this._display_activity_indicator()}
            </View>
        );
    }

    //toutes les publications
    _get_all_publications = () => {

        if (this.props.navigation.state.params.categ_mag == 'all') {

            get_all_publications()
                .then(res => { this.setState({ mags: [...this.state.mags, ...res.entries], is_loading: false }) })
                .catch(err => console.log(err));

        } else {

            get_all_publications_by_categ(this.props.navigation.state.params.categ_mag)
                .then(res => { this.setState({ mags: res.entries, is_loading: false }) })
                .catch(err => console.log(err));
        }
    };

    //
    _display_activity_indicator = () => {
        if (this.state.is_loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
    }

    //
    _display_all_mags = () => {

        if (this.state.mags != undefined) {
            return (

                <FlatList
                    data={this.state.mags}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => <PublicationCard mag={item} goToDetails={this._goToDetails} />}

                    showsHorizontalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                />
            );
        };
    }

    //
    _goToDetails = (id) => {
        this.props.navigation.navigate('details', { id_mag: id });
    }

}

export default allPublicationScreen;