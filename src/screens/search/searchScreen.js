import React, { Component } from 'react';
import { TextInput, } from "react-native-paper";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class searchScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.texte = undefined;
    }

    render() {
        return (
            <View style={{ flex: 1, margin: 7 }}>
                <TextInput
                    label="Recherche ..."
                    mode='flat'
                    onChangeText={text => this.setText(text)}
                    // left={
                    //     <TextInput.Icon
                    //         name={<Icon name="home-circle-outline" color="black" size={10} />} // where <Icon /> is any component from vector-icons or anything else
                    //         onPress={() => { }}
                    //     />
                    // }
                    right={<TextInput.Icon name={() => <Icon name={'cloud-search-outline'} size={20} style={{ color: '#3FC4ED' }} />} />}
                    style={{ height: 45, color: '#3FC4ED', borderRadius: 5 }}
                    blurOnSubmit={true}
                />
            </View>
        );
    }

    //
    setText(text) {
        this.texte = text;
    }
}

export default searchScreen;