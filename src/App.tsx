import React from "react";

import Header from "./components/Header/Header";
import ModuleContainer from "./components/ModuleContainer/ModuleContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <ModuleContainer />
        </div>
    );
}

export default App;
