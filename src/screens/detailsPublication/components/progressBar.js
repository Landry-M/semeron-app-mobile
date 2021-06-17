import React, { Component } from 'react';
import { View, } from "react-native";

import TrackPlayer, { ProgressComponent, ProgressBar } from 'react-native-track-player';


class MyPlayerBar extends TrackPlayer.ProgressComponent {

    render() {
        return (
            // Note: formatTime and ProgressBar are just examples:
            <View>
                {/* <Text>{formatTime(this.state.position)}</Text> */}
                <ProgressBar
                    progress='4'
                    buffered='5'
                />
            </View>
        );
    }

}

export default MyPlayerBar;