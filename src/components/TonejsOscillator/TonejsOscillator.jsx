import { useState, useEffect, useRef } from "react";
import { Oscillator } from "tone";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import "./TonejsOscillator.css";

function TonejsOscillator() {
    const [oscState, setOscState] = useState(false);
    const [oscBtn, setOscBtn] = useState("start");
    let [freq, setFreq] = useState(440);

    const osc = useRef(null);
    useEffect(() => {
        osc.current = new Oscillator().toDestination();
        console.log("useEffect osc.current:", osc.current.frequency.value);
        console.log("useEffect freq:", freq);
    }, [freq]);
    console.log("draussen osc.current:", osc.current);

    function changeFreq(e) {
        osc.current.frequency.value = e.target.value;
        console.log("Frequency: ", e.target.value);
    }
    //osc.current.frequency.value = freq;
    function oscToggle() {
        if (oscBtn === "start") {
            osc.current.start();
            setOscState(true);
            setOscBtn("mute");
            console.log("osc started, oscState: ", oscState);
        } else if (oscBtn === "mute") {
            osc.current.mute = true;
            setOscState(false);
            setOscBtn("unmute");
            console.log("osc muted, oscState: ", oscState);
        } else {
            osc.current.mute = false;
            setOscState(true);
            setOscBtn("mute");

            console.log("osc unmuted, oscState: ", oscState);
        }
    }

    return (
        <>
            <Card.Title>Tone.js Oscillator</Card.Title>
            <Button
                value="{oscState}"
                className="osc-btn"
                variant="primary"
                onClick={() => {
                    oscToggle();
                }}
            >
                {oscBtn}
            </Button>
            <ListGroup.Item>
                <label className="form-label" htmlFor="frequency">
                    Frequency
                </label>
                <div className="range">
                    <input
                        name="frequency"
                        type="range"
                        className="form-range"
                        id="freqSlider"
                        min="80"
                        max="8000"
                        onChange={changeFreq}
                    />
                </div>
            </ListGroup.Item>
        </>
    );
}

export default TonejsOscillator;
