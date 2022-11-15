import React from "react";
import { useState, useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { Oscillator } from "tone";
import { Filter } from "tone";
import { LFO } from "tone";
import { Destination } from "tone";

import TonejsOscillator from "./components/TonejsOscillator/TonejsOscillator";
import TonejsFilter from "./components/TonejsFilter/TonejsFilter";
import TonejsLFO from "./components/TonejsLFO/TonejsLFO";

import "./App.css";

function App() {
    const osc: any = useRef(null);
    const filter: any = useRef(null);
    const lfo: any = useRef(null);
    const [filterModule, setFilterModule] = useState(false);
    const [lfoModule, setLfoModule] = useState(false);
    const [oscBtn, setOscBtn] = useState("start");
    const [soundCard, setSoundCard] = useState("");
    const [lfoState, setLfoState] = useState("");

    useEffect(() => {
        osc.current = new Oscillator();
        filter.current = new Filter();
        lfo.current = new LFO(5, 400, 4000);

        if (soundCard === "osc") {
            osc.current.connect(Destination);
        } else if (soundCard === "filter") {
            osc.current.connect(filter.current);
            filter.current.connect(Destination);
        } else {
            osc.current.connect(Destination);
        }
        if (lfoState === "oscFreq") {
            lfo.current.connect(osc.current.frequency);
        } else if (lfoState === "oscVol") {
            lfo.current.connect(osc.current.volume);
        } else if (lfoState === "filterFreq") {
            lfo.current.connect(filter.current.frequency);
        } else {
            lfo.current.stop();
        }
    }, [soundCard, filterModule, lfoState]);

    let oscStop = function () {
        osc.current.stop();
        lfo.current.stop();
        setOscBtn("start");
        return;
    };

    function oscToggle() {
        oscStop();
        if (oscBtn === "start") {
            osc.current.start();
            if (lfoModule) {
                lfo.current.start();
            } else {
                setLfoState("");
            }
            setOscBtn("stop");
        } else {
            setOscBtn("start");
        }
    }
    function filterToggle() {
        oscStop();
        if (!filterModule) {
            setFilterModule(true);
            setSoundCard("filter");
            setOscBtn("start");
        } else {
            setFilterModule(false);
            setSoundCard("osc");
            setOscBtn("start");
        }
    }
    function lfoToggle() {
        oscStop();
        if (lfoModule) {
            setLfoModule(false);
            setOscBtn("start");
            setLfoState("");
        } else {
            setLfoModule(true);
            setOscBtn("start");
        }
    }

    function showFilter() {
        if (filterModule === false) {
            return (
                <>
                    <TonejsOscillator osc={osc} />
                </>
            );
        } else if (filterModule === true) {
            return (
                <>
                    <TonejsOscillator osc={osc} />
                    <TonejsFilter filter={filter} lfo={lfo} />
                </>
            );
        }
    }

    function showLfo() {
        if (lfoModule) {
            return (
                <>
                    <TonejsLFO
                        oscStop={oscStop}
                        lfo={lfo}
                        lfoState={lfoState}
                        setLfoState={setLfoState}
                        setOscBtn={setOscBtn}
                    />
                </>
            );
        }
    }

    return (
        <>
            <Navbar expand="md">
                <Container fluid>
                    <Button
                        className="osc-btn"
                        variant="primary"
                        onClick={() => {
                            oscToggle();
                        }}
                    >
                        {oscBtn}
                    </Button>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                            <NavDropdown
                                title="Toggle modules: "
                                id="navbarScrollingDropdown"
                            >
                                <NavDropdown.Item
                                    onClick={() => {
                                        filterToggle();
                                    }}
                                >
                                    Filter {filterModule}
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => {
                                        lfoToggle();
                                    }}
                                >
                                    LFO
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => {
                                        oscStop();
                                    }}
                                >
                                    Filter freq
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row className="row">
                {showFilter()}
                {showLfo()}
            </Row>
        </>
    );
}

export default App;
