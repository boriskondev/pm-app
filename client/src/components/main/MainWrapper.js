import { Component } from "react";
import "./MainWrapper.css";
import Header from "./Header";
import Data from "../Data";

class MainWrapper extends Component {


    render() {
        return (
            <main>
                <Header />
                <br/>
                <Data />
            </main>
        )
    }
}

export default MainWrapper;