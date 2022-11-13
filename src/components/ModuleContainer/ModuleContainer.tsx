import TonejsOscillator from "../TonejsOscillator/TonejsOscillator";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./ModuleContainer.css";

function ModuleContainer() {
    return (
        <>
            <Card style={{ width: "12rem" }} className="module-container">
                <Card.Body className="text-center">
                    <TonejsOscillator />
                </Card.Body>
            </Card>
        </>
    );
}

export default ModuleContainer;
