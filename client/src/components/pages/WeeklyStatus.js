import { Component } from "react";
import "./WeeklyStatus.css";
import Header from "../common/Header";

class WeeklyStatus extends Component {
    render() {
        return (
            <>
                <Header title="Седмичен обзор" />
                <section className="content-wrapper">
                    <section className="projects-list">
                        <article>
                            <button className="project-accordion">Beiersdorf</button>
                            <div className="project-panel">
                                <ul>
                                    <li><a href="#">NIVEA warehouse 2020 (1)</a></li>
                                </ul>
                            </div>
                        </article>

                        <article>
                            <button className="project-accordion">Coca-Cola</button>
                            <div className="project-panel">
                                <ul>
                                    <li><a href="#">Cappy 1l Campaign (4)</a></li>
                                    <li><a href="#">Fuzetea campaign 2021 (3)</a></li>
                                    <li><a href="#">Aquarius Launch Campaign (3)</a></li>
                                    <li><a href="#">Bankia 2020 (6)</a></li>
                                </ul>
                            </div>
                        </article>

                        <article>
                            <button className="project-accordion">HP Inc Bulgaria</button>
                            <div className="project-panel">
                                <ul>
                                    <li><a href="#">HP разни (4)</a></li>
                                    <li><a href="#">Instant INK POS материали (4)</a></li>
                                    <li><a href="#">Sales incentive Gift Cards (1)</a></li>
                                    <li><a href="#">HTML банери за партньори HP (2)</a></li>
                                </ul>
                            </div>
                        </article>

                        <article>
                            <button className="project-accordion">Kamenitza</button>
                            <div className="project-panel">
                                <ul>
                                    <li><a href="#">Multipacks design (2)</a></li>
                                    <li><a href="#">Airport branding (3)</a></li>
                                    <li><a href="#">Misc projects (6)</a></li>
                                    <li><a href="#">Q1 trade activation 2021 (3)</a></li>
                                </ul>
                            </div>
                        </article>

                        <article>
                            <button className="project-accordion">Visa</button>
                            <div className="project-panel">
                                <ul>
                                    <li><a href="#">UniCredit 6 month campaign (2)</a></li>
                                    <li><a href="#">Bansko branding, season 2020-2021 (2)</a></li>
                                    <li><a href="#">Mass transit (3)</a></li>
                                    <li><a href="#">Glocalzone (3)</a></li>
                                    <li><a href="#">Fibank digital wallets (2)</a></li>
                                    <li><a href="#">Website SME sections (2)</a></li>
                                    <li><a href="#">Mobile payments promotion (1)</a></li>
                                    <li><a href="#">Misc projects (2)</a></li>
                                </ul>
                            </div>
                        </article>
                    </section>

                    <section className="project-info">
                        <h2><a href="#">Cappy 1l Campaign</a></h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Задача</th>
                                <th>Отговорни</th>
                                <th>Срок</th>
                                <th>Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><a href="#">Изчистване на въпроси по 1л ТВ клип</a></td>
                                <td>
                                    <ul>
                                        <li>Катя</li>
                                        <li>Хилда</li>
                                    </ul>
                                </td>
                                <td>01.03.21 - 02.03.21</td>
                                <td>Изпълнява се</td>
                            </tr>
                            <tr>
                                <td><a href="#">Послания - обратна връзка</a></td>
                                <td>
                                    <ul>
                                        <li>Веско</li>
                                        <li>Катя</li>
                                        <li>Марто</li>
                                        <li>Хилда</li>
                                    </ul>
                                </td>
                                <td>22.02.21 - 24.02.21</td>
                                <td>Чака одобрение</td>
                            </tr>
                            <tr>
                                <td><a href="#">Price tag - обратна връзка</a></td>
                                <td>
                                    <ul>
                                        <li>Катя</li>
                                        <li>Марто</li>
                                        <li>Хилда</li>
                                    </ul>
                                </td>
                                <td>22.02.21 - 24.02.21</td>
                                <td>Чака одобрение</td>
                            </tr>
                            <tr>
                                <td><a href="#">ПОП сет дизайн</a></td>
                                <td>
                                    <ul>
                                        <li>Катя</li>
                                        <li>Марто</li>
                                        <li>Хилда</li>
                                    </ul>
                                </td>
                                <td>15.02.21 - 19.02.211</td>
                                <td>Изпълнява се</td>
                            </tr>

                            </tbody>
                        </table>
                    </section>
                </section>
            </>
        )
    }
}

export default WeeklyStatus;