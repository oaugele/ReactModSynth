import { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./TonejsFilter.css";

function TonejsFilter(filter: any) {
    let [type, setType] = useState("lowpass");
    let [rolloff, setRolloff] = useState("-12");
    let [filterQ, setFilterQ] = useState(1);
    let [filterFreq, setFilterFreq] = useState(100);
    let [filterFreqSlider, setFilterFreqSlider] = useState(50);

    useEffect(() => {}, []);

    console.log(filter);

    function changeFilterQ(e: any) {
        setFilterQ((filter.filter.current.Q.value = e.target.value));
    }

    function changeFilterFreq(e: any) {
        setFilterFreq(e.target.value);
        filter.filter.current.frequency.value = Math.pow(filterFreq / 20, 1.55);
        setFilterFreqSlider(
            (filter.filter.current.frequency.value = Math.pow(
                filterFreq / 20,
                1.55
            ))
        );
    }

    function changeType() {
        const expr = type;
        switch (expr) {
            case "highpass":
                setType((filter.filter.current.type = "lowpass"));
                break;
            case "lowpass":
                setType((filter.filter.current.type = "bandpass"));
                break;
            case "bandpass":
                setType((filter.filter.current.type = "highpass"));
                break;

            default:
                setType((filter.filter.current.type = "lowpass"));
        }
    }

    function changeRolloff() {
        const expr = rolloff;
        switch (expr) {
            case "-12":
                setRolloff((filter.filter.current.rolloff = "-24"));
                break;
            case "-24":
                setRolloff((filter.filter.current.rolloff = "-48"));
                break;
            case "-48":
                setRolloff((filter.filter.current.rolloff = "-12"));
                break;

            default:
                setRolloff((filter.filter.current.rolloff = "-12"));
        }
    }

    return (
        <>
            <Card style={{ width: "16rem" }} className="module-container">
                <Card.Body className="text-center">
                    <Card.Title>Filter</Card.Title>
                    <ButtonGroup size="sm">
                        <Button
                            className="osc-btn"
                            variant="primary"
                            onClick={() => {
                                changeRolloff();
                            }}
                        >
                            {rolloff}
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
                        <label className="form-label" htmlFor="volume">
                            Q {filterQ}
                        </label>
                        <div className="range">
                            <input
                                value={filterQ}
                                name="q"
                                type="range"
                                className="form-range"
                                id="qSlider"
                                min="0"
                                max="10"
                                onChange={changeFilterQ}
                            />
                        </div>
                    </ListGroup.Item>
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
                </Card.Body>
            </Card>
        </>
    );
}

export default TonejsFilter;
