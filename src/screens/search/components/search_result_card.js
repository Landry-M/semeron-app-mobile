import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

class search_result_card extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.GoToDetailsPage(this.props.mag._id)}>
                <Image
                    style={styles.posterImage}
                    source={{ uri: 'https://semeron.heaventech.org' + this.props.mag.image.path }}
                />
                <View style={styles.content}>

                    <View style={{ flex: 3, flexDirection: 'column' }}>
                        <View style={{ flex: 6, marginBottom: 5 }}>
                            <Text style={{ fontSize: 15.5, fontWeight: 'bold' }}> {this.props.mag.title} </Text>
                        </View>

                        <View style={{ flex: 5, }}>
                            <Text style={{ fontSize: 13 }}> {this._formated_date()} </Text>
                        </View>

                        <View style={{ flex: 5, }}>
                            <Text style={{ fontSize: 13 }}> contenu {this.props.mag.type} </Text>
                        </View>
                    </View>

                    {/* <View style={{ flex: 5, margin: 7 }}>
                        <Text style={{ textAlign: 'justify', }} numberOfLines={6} >
                            {this.props.mag.desc}
                        </Text>
                    </View> */}

                    {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={{ color: 'green', fontWeight: 'bold', }}>
                            ff
                        </Text>
                    </View> */}

                </View>
            </TouchableOpacity>
        );
    }

    //
    _formated_date() {
        var date = new Date(this.props.mag._created * 1000);
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        return ` publié le ${day}/${month}/${year}`;
    }
}

const styles = StyleSheet.create(
    {
        container: {
            height: 105,
            flexDirection: 'row',
            margin: 5,
            backgroundColor: 'white',
            borderRadius: 7
        },
        posterImage: {
            width: 115,
            height: 105,
            backgroundColor: 'gray',
            resizeMode: 'cover',
            borderRadius: 7
        },
        content: {
            flex: 1,
            margin: 3,
        }
    }
);

export default search_result_card;