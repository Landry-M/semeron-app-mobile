import React, { Component } from 'react';
import { connect } from "react-redux";

class presentationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
            </>
        );
    }
}

const mapPropsToState = state => {
    return {
        profil: state
    }
}

export default connect(mapPropsToState)(presentationScreen);