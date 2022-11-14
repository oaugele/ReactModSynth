import TonejsOscillator from "../TonejsOscillator/TonejsOscillator";
import TonejsFilter from "../TonejsFilter/TonejsFilter";
import { useState, useEffect, useRef } from "react";

import Card from "react-bootstrap/Card";

import "./ModuleContainer.css";

function ModuleContainer() {
    let [osc, setOsc] = useState({});

    const callbackOsc = (childData: any) => {
        setOsc(childData);
    };

    return (
        <>
            <Card style={{ width: "12rem" }} className="module-container">
                <Card.Body className="text-center">
                    <TonejsOscillator />
                    <TonejsFilter /* parentCallback={callbackOsc} */ />
                </Card.Body>
            </Card>
        </>
    );
}

export default ModuleContainer;
