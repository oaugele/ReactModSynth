import React from "react";
import * as Tone from "tone";
import "./App.css";

function App() {
    // make and start a 440hz sine tone
    const osc = new Tone.Oscillator(440, "sine").toDestination();

    function toggleTone() {
        if (osc.state !== "started") {
            osc.start();
        } else {
            osc.stop();
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                Hallo Welt
                <div id="wrapper">
                    <button id="button" onClick={toggleTone}>
                        440hz sine
                    </button>
                </div>
            </header>
        </div>
    );
}

export default App;
