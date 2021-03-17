import "./App.css";

import Navigation from "./components/common/Navigation";
import Header from "./components/main/Header";
import Homepage from "./components/main/Homepage";
import Footer from "./components/common/Footer";
import Data from "./components/Data";


function App() {

    return (
        <div className="App">

            <Navigation />

            <main>
                <Header title="Седмичен обзор" />
                <Homepage />
                <Data />
            </main>

            <Footer />


        </div>
    );
}

export default App;
