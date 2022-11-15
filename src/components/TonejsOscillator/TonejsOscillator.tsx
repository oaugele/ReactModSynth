import { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./TonejsOscillator.css";

function TonejsOscillator(osc: any) {
    let [type, setType] = useState("sine");
    let [freq, setFreq] = useState(50);
    let [freqSlider, setFreqSlider] = useState(freq);
    let [detune, setDetune] = useState(0);
    let [vol, setVol] = useState(-6);

    useEffect(() => {}, []);

    function changeFreq(e: any) {
        setFreq(e.target.value);
        osc.osc.current.frequency.value = Math.pow(freq / 20, 1.55);
        setFreqSlider(
            (osc.osc.current.frequency.value = Math.pow(freq / 20, 1.55))
        );
    }

    function changeVol(e: any) {
        setVol((osc.osc.current.volume.value = e.target.value));
    }

    function changeDetune(e: any) {
        setDetune((osc.osc.current.detune.value = e.target.value));
    }

    function changeType() {
        const expr = type;
        switch (expr) {
            case "sine":
                setType((osc.osc.current.type = "square"));
                break;
            case "square":
                setType((osc.osc.current.type = "triangle"));
                break;
            case "triangle":
                setType((osc.osc.current.type = "sawtooth"));
                break;
            case "sawtooth":
                setType((osc.osc.current.type = "sine"));
                break;
            default:
                setType((osc.osc.current.type = "square"));
        }
    }

    return (
        <>
            <Card style={{ width: "16rem" }} className="module-container">
                <Card.Body className="text-center">
                    <Card.Title>Tone.js Oscillator</Card.Title>
                    <ButtonGroup size="sm">
                        <Button
                            className="osc-btn"
                            variant="primary"
                            onClick={() => {
                                changeType();
                            }}
                        >
                            {type}
                        </Button>
                    </ButtonGroup>
                    <ListGroup.Item>
                        <label className="form-label" htmlFor="frequency">
                            Frequency {freqSlider.toFixed()} Hz
                        </label>
                        <input
                            value={freq}
                            name="frequency"
                            type="range"
                            className="form-range"
                            id="freqSlider"
                            min="70"
                            max="6000"
                            onChange={changeFreq}
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <label className="form-label" htmlFor="volume">
                            Volume {vol} dB
                        </label>
                        <div className="range">
                            <input
                                value={vol}
                                name="volume"
                                type="range"
                                className="form-range"
                                id="volSlider"
                                min="-60"
                                max="0"
                                onChange={changeVol}
                            />
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <label className="form-label" htmlFor="volume">
                            Detune {detune} %
                        </label>
                        <div className="range">
                            <input
                                value={detune}
                                name="volume"
                                type="range"
                                className="form-range"
                                id="volSlider"
                                min="-100"
                                max="100"
                                onChange={changeDetune}
                            />
                        </div>
                    </ListGroup.Item>
                </Card.Body>
            </Card>
        </>
    );
}

export default TonejsOscillator;
