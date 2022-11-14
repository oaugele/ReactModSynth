import { useState, useEffect, useRef } from "react";
import { Oscillator } from "tone";
import { Destination } from "tone";

/* import { Filter } from "tone"; */

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./TonejsOscillator.css";

function TonejsOscillator() {
    const [oscBtn, setOscBtn] = useState("start");
    let [type, setType] = useState("sine");
    let [freq, setFreq] = useState(50);
    let [freqSlider, setFreqSlider] = useState(freq);
    let [detune, setDetune] = useState(0);
    let [vol, setVol] = useState(-6);
    /*     let [filterFreq, setFilterFreq] = useState(50);
    let [filterFreqSlider, setFilterFreqSlider] = useState(freq); */

    const osc: any = useRef(null);
    /* const filter: any = useRef(null); */

    useEffect(() => {
        osc.current = new Oscillator(freq);
        osc.current.type = type;
        osc.current.connect(Destination);
    }, []);

    /*   useEffect(() => {
        filter.current = new Filter(filterFreq).toDestination();
        osc.current.connect(filter.current);
    }, []); */

    function oscToggle() {
        if (oscBtn === "start") {
            osc.current.start();
            setOscBtn("mute");
        } else if (oscBtn === "mute") {
            osc.current.mute = true;
            setOscBtn("unmute");
        } else {
            osc.current.mute = false;
            setOscBtn("mute");
        }
    }

    //console.log(osc.current);

    function changeFreq(e: any) {
        setFreq(e.target.value);
        osc.current.frequency.value = Math.pow(freq / 20, 1.55);
        setFreqSlider(
            (osc.current.frequency.value = Math.pow(freq / 20, 1.55))
        );
    }

    /*     function changeFilterFreq(e: any) {
        setFilterFreq(e.target.value);
        filter.current.frequency.value = Math.pow(filterFreq / 20, 1.55);
        setFilterFreqSlider(
            (filter.current.frequency.value = Math.pow(filterFreq / 20, 1.55))
        );
    } */

    function changeVol(e: any) {
        setVol((osc.current.volume.value = e.target.value));
    }

    function changeDetune(e: any) {
        setDetune((osc.current.detune.value = e.target.value));
    }

    function changeType() {
        const expr = type;
        switch (expr) {
            case "sine":
                setType((osc.current.type = "square"));
                break;
            case "square":
                setType((osc.current.type = "triangle"));
                break;
            case "triangle":
                setType((osc.current.type = "sawtooth"));
                break;
            case "sawtooth":
                setType((osc.current.type = "sine"));
                break;
            default:
                setType((osc.current.type = "square"));
        }
    }

    return (
        <>
            <Card.Title>Tone.js Oscillator</Card.Title>
            <ButtonGroup size="sm">
                <Button
                    className="osc-btn"
                    variant="primary"
                    onClick={() => {
                        oscToggle();
                    }}
                >
                    {oscBtn}
                </Button>
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
            {/*             <ListGroup.Item>
                <label className="form-label" htmlFor="frequency">
                    Filter Freq {filterFreqSlider.toFixed()} Hz
                </label>
                <input
                    value={filterFreq}
                    name="frequency"
                    type="range"
                    className="form-range"
                    id="freqSlider"
                    min="70"
                    max="6000"
                    onChange={changeFilterFreq}
                />
            </ListGroup.Item> */}
        </>
    );
}

export default TonejsOscillator;
