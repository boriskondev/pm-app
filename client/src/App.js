import './App.css';
import Data from "./components/Data";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {

    return (
        <div className="App">

            <Navigation />

            <main>
                <Data />
            </main>

            <Footer />


        </div>
    );
}

export default App;
