import React, { Component } from 'react';
import Navigation from "../../components/Student/Navigation";
import Sidebar from '../../components/Student/Sidebar';

class Homepage extends Component {
    render() {
        return (
            <>
            <Navigation/>
            <Sidebar/>
            </>
        );
    }
}

export default Homepage;