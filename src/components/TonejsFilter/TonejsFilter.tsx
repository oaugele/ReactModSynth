import { useState, useEffect, useRef } from "react";
import { Filter } from "tone";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./TonejsFilter.css";

function TonejsFilter() {
    let [type, setType] = useState("highpass");
    let [filterFreq, setFilterFreq] = useState(50);
    let [filterFreqSlider, setFilterFreqSlider] = useState(50);

    const filter: any = useRef(null);

    useEffect(() => {
        filter.current = new Filter(filterFreq).toDestination();
        /* osc.current.connect(filter.current); */
    }, []);

    console.log(filter.current);

    function changeFilterFreq(e: any) {
        setFilterFreq(e.target.value);
        filter.current.frequency.value = Math.pow(filterFreq / 20, 1.55);
        setFilterFreqSlider(
            (filter.current.frequency.value = Math.pow(filterFreq / 20, 1.55))
        );
    }

    function changeType() {
        const expr = type;
        switch (expr) {
            case "highpass":
                setType((filter.current.type = "lowpass"));
                break;
            case "lowpass":
                setType((filter.current.type = "bandpass"));
                break;
            case "bandpass":
                setType((filter.current.type = "highpass"));
                break;

            default:
                setType((filter.current.type = "lowpass"));
        }
    }

    return (
        <>
            <Card.Title>Tone.js Filter</Card.Title>
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
            </ListGroup.Item>
        </>
    );
}

export default TonejsFilter;
