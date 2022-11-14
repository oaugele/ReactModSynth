import React from "react";
import { useState, useEffect, useRef } from "react";

import { Oscillator, PulseOscillator } from "tone";
import { Filter } from "tone";
import { LFO } from "tone";
import { Destination } from "tone";

import Header from "./components/Header/Header";
import TonejsOscillator from "./components/TonejsOscillator/TonejsOscillator";
import TonejsFilter from "./components/TonejsFilter/TonejsFilter";
import TonejsLFO from "./components/TonejsLFO/TonejsLFO";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    const [oscBtn, setOscBtn] = useState("start");
    const osc: any = useRef(null);
    const filter: any = useRef(null);
    const lfo: any = useRef(null);

    useEffect(() => {
        osc.current = new Oscillator();
        filter.current = new Filter().toDestination();
        lfo.current = new LFO(5, 400, 4000);
        osc.current.connect(filter.current);
        lfo.current.connect(filter.current.frequency);
        /* osc.current.connect(Destination); */
        /* filter.current.connect(Destination); */
    }, []);

    /*    const ModuleProps = {
        osc: osc.current,
    };
 */
    function oscToggle() {
        if (oscBtn === "start") {
            osc.current.start();
            lfo.current.start();
            setOscBtn("mute");
        } else if (oscBtn === "mute") {
            osc.current.mute = true;
            setOscBtn("unmute");
        } else {
            osc.current.mute = false;
            setOscBtn("mute");
        }
    }
    console.log("Parent: ", osc);
    return (
        <>
            <div className="App">
                <Button
                    className="osc-btn"
                    variant="primary"
                    onClick={() => {
                        oscToggle();
                    }}
                >
                    {oscBtn}
                </Button>
                <Header />

                <TonejsOscillator osc={osc} />

                <TonejsFilter filter={filter} />
                <TonejsLFO lfo={lfo} />
            </div>
        </>
    );
}

export default App;
