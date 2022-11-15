import React from "react";
import { useState, useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
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
    const [oscBtn, setOscBtn] = useState("start");
    const [soundCard, setSoundCard] = useState("");

    /*  let master = osc; */

    useEffect(() => {
        osc.current = new Oscillator();
        filter.current = new Filter();
        lfo.current = new LFO(5, 400, 4000);
        osc.current.connect(filter.current);
        lfo.current.connect(filter.current.frequency);
        if (soundCard === "osc") {
            osc.current.connect(Destination);
        } else if (soundCard === "filter") {
            filter.current.connect(Destination);
        } else {
            osc.current.connect(Destination);
        }
    }, [soundCard, filterModule]);

    function oscToggle() {
        if (oscBtn === "start") {
            osc.current.start();
            lfo.current.start();
            setOscBtn("stop");
        } else {
            osc.current.stop();
            lfo.current.stop();
            setOscBtn("start");
        }
    }
    function filterToggle() {
        if (filterModule === false) {
            osc.current.stop();
            setFilterModule(true);
            setSoundCard("filter");
            setOscBtn("start");
        } else {
            osc.current.stop();
            setFilterModule(false);
            setSoundCard("osc");
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
                    <TonejsFilter filter={filter} lfo={lfo} />;
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
                                        /* filterToggle(); */
                                    }}
                                >
                                    LFO
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/*                 <TonejsOscillator osc={osc} />
                <TonejsFilter filter={filter} lfo={lfo} /> */}
            {showFilter()}
            <TonejsLFO lfo={lfo} />
        </>
    );
}

export default App;
