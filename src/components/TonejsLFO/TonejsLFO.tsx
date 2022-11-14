import { useState, useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./TonejsLFO.css";

function TonejsLFO(lfo: any) {
    let [type, setType] = useState("sine");
    let [freq, setFreq] = useState(50);
    let [freqSlider, setFreqSlider] = useState(freq);

    useEffect(() => {}, []);

    function changeFreq(e: any) {
        setFreq(e.target.value);
        lfo.lfo.current.frequency.value = Math.pow(freq / 20, 1.55);
        setFreqSlider(
            (lfo.lfo.current.frequency.value = Math.pow(freq / 20, 1.55))
        );
    }

    function changeType() {
        const expr = type;
        switch (expr) {
            case "sine":
                setType((lfo.lfo.current.type = "square"));
                break;
            case "square":
                setType((lfo.lfo.current.type = "triangle"));
                break;
            case "triangle":
                setType((lfo.lfo.current.type = "sawtooth"));
                break;
            case "sawtooth":
                setType((lfo.lfo.current.type = "sine"));
                break;
            default:
                setType((lfo.lfo.current.type = "square"));
        }
    }

    return (
        <>
            <ButtonGroup size="sm">
                <p>LFO</p>
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
                    min="0.5"
                    max="4000"
                    onChange={changeFreq}
                />
            </ListGroup.Item>
        </>
    );
}

export default TonejsLFO;
