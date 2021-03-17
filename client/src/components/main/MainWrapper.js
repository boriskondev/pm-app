import { Component } from "react";
import "./MainWrapper.css";
import Header from "./Header";
import Home from "./Home";
import Data from "../Data";

class MainWrapper extends Component {

    render() {
        return (
            <main>
                <Header title="Седмичен обзор" />
                <Home />
                <Data />
            </main>
        )
    }
}

export default MainWrapper;