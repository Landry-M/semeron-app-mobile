import React, { Component } from 'react';
import { View, } from "react-native";
import { Bars } from "react-native-loader";

const activityIndicator = () => {
    return (
        <View style={{ position: 'absolute', alignItems: 'center', left: 0, top: 0, bottom: 0, right: 0, justifyContent: 'center', flex: 1, }}>
            <Bars size={15} color="black" />
        </View>
    );
}

export default activityIndicator;