import { Component } from "react";
import "./WeeklyStatus.css";
import Header from "../common/Header";

class WeeklyStatus extends Component {
    render() {
        return (
            <>
                <Header title="Седмичен обзор" />
                <section className="weekly-status">
                    <p>Weekly status</p>
                </section>
            </>
        )
    }
}

export default WeeklyStatus;