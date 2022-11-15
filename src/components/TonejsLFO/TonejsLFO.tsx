import { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import "./TonejsLFO.css";

interface lfoProps {
    oscStop: any;
    lfo: any;
    lfoState: string;
    setLfoState: any;
    setOscBtn: any;
}

function TonejsLFO(props: lfoProps) {
    //let [lfoState, setlfoState] = useState("oscFreq");
    let [type, setType] = useState("sine");
    let [freq, setFreq] = useState(50);
    let [freqSlider, setFreqSlider] = useState(freq);

    useEffect(() => {
        props.setLfoState("oscFreq");
    }, []);

    function changeFreq(e: any) {
        setFreq(e.target.value);
        props.lfo.current.frequency.value = Math.pow(freq / 20, 1.55);
        setFreqSlider(
            (props.lfo.current.frequency.value = Math.pow(freq / 20, 1.55))
        );
    }

    function changeType() {
        const expr = type;
        switch (expr) {
            case "sine":
                setType((props.lfo.current.type = "square"));
                break;
            case "square":
                setType((props.lfo.current.type = "triangle"));
                break;
            case "triangle":
                setType((props.lfo.current.type = "sawtooth"));
                break;
            case "sawtooth":
                setType((props.lfo.current.type = "sine"));
                break;
            default:
                setType((props.lfo.current.type = "square"));
        }
    }
    console.log("lfo:", props.lfoState);
    return (
        <>
            <Card style={{ width: "12rem" }} className="module-container">
                <Card.Body className="text-center">
                    <Card.Title>LFO {props.lfoState}</Card.Title>
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
                        <DropdownButton
                            as={ButtonGroup}
                            title=""
                            id="bg-nested-dropdown"
                        >
                            <Dropdown.Item
                                onClick={() => {
                                    props.oscStop();
                                    props.setLfoState("oscFreq");
                                }}
                            >
                                Osc freq
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    props.oscStop();
                                    props.setLfoState("filterFreq");
                                }}
                            >
                                Filter freq
                            </Dropdown.Item>
                        </DropdownButton>
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
                </Card.Body>
            </Card>
        </>
    );
}

export default TonejsLFO;
