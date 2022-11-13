/* import { useState, useEffect } from "react";
import * as Tone from "tone";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import "./TonejsOscillator.css";

function TonejsOscillator() {
    const [oscState, setOscState] = useState(false);
    const [oscBtn, setOscBtn] = useState("start");
    /* const [freq, setFreq] = useState(440); */

    
    const osc = new Tone.Oscillator().toDestination();
    let freq = 440;
    console.log("useEffect freq:", freq);
    osc.frequency.value = freq;
    osc.mute = true;


    function oscToggle() {
        if (oscBtn === "start") {
            osc.start();
            setOscState(true);
            setOscBtn("mute");
            console.log("osc started, oscState: ", oscState);
        } else if (oscBtn === "mute") {
            osc.mute = true;
            setOscState(false);
            setOscBtn("unmute");
            console.log("osc muted, oscState: ", oscState);
        } else {
            osc.mute = false;
            setOscState(true);
            setOscBtn("mute");

            console.log("osc unmuted, oscState: ", oscState);
        }
    }
    function changeFreq(e: any) {
        console.log("Frequency: ", e.target.value);
        freq = e.target.value;
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
 */