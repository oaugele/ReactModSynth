import { useState, useEffect } from "react";
import * as Tone from "tone";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import "./TonejsOscillator.css";

function TonejsOscillator() {
    const [oscState, setOscState] = useState("on");
    const [freq, setFreq] = useState(440);

    const osc = new Tone.Oscillator().toDestination();

    console.log("useEffect freq:", freq);
    osc.frequency.value = freq;

    /*   useEffect(() => {

    }, [osc.frequency, freq]);  */

    console.log("osc :", osc);

    document.querySelector("button")?.addEventListener("click", async () => {
        await osc.start();
        console.log("audio is ready");
    });
    document.querySelector(".osc-btn")?.addEventListener("click", async () => {
        if (oscState === "on") {
            setOscState("off");

            await osc.start();
            console.log("audio is ready");
        } else {
            setOscState("on");
            osc.stop();
        }
    });

    /*     function oscToggle() {
        if (oscState === "on") {
            setOscState("off");
            osc.start();
        } else {
            setOscState("on");
            osc.stop();
        }
    } */

    function changeFreq(e: any) {
        console.log("Frequency: ", e.target.value);
        setFreq(e.target.value);
    }

    return (
        <>
            <Card.Title>Tone.js Oscillator</Card.Title>
            <Button
                value="{oscState}"
                className="osc-btn"
                variant="primary"
                /*                 onClick={() => {
                    oscToggle();
                }} */
            >
                {oscState}
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
