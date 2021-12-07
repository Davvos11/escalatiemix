import {Component, FormEvent} from "react";
import {Button, Col, FormControl, FormLabel, FormSelect, InputGroup, Modal, Row} from "react-bootstrap";
import {Container, containers} from "../config";
import {SHOTJE} from "./Containers";

type props = {
    onClose: (container: Container, url: string) => void
    container: Container
    url: string
    toeterCount: number
}

type state = {
    show: boolean
    container: Container
    url: string
}

class Settings extends Component<props, state> {
    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            show: true,
            container: props.container,
            url: props.url
        }
    }

    render() {
        const amount = this.props.toeterCount * SHOTJE / this.state.container.capacity

        return (
            <Modal show={this.state.show} onHide={this.close} onExited={this.onClose}
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Kies glassoort</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormLabel className="fw-bold">Glas:</FormLabel>
                    <FormSelect size="lg" onChange={this.onChange}>
                        {containers.map((list, index) => {
                            return <option key={index} selected={list === this.props.container}>{list.name}</option>
                        })}
                    </FormSelect>
                </Modal.Body>
                <Modal.Body>
                    <Row>
                        <Col><FormLabel column>Inhoud:</FormLabel></Col>
                        <Col><FormControl type="number" value={this.state.container.capacity} readOnly /></Col>
                        <Col><FormLabel column>Aantal:</FormLabel></Col>
                        <Col><FormControl type="number" value={amount} readOnly/></Col>
                    </Row>
                </Modal.Body>
                <Modal.Body>
                    <FormLabel className="fw-bold">URL bij elke toeter (optioneel):</FormLabel>
                    <InputGroup>
                        <FormControl type="text" value={this.state.url}
                                     onChange={event => this.setState({url: event.target.value})} />
                        <Button variant="outline-primary" onClick={this.testUrl}>Test</Button>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.close} >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private close = () => {
        this.setState({show: false})
        // this.props.onClose() will be called after the modal exited
    }

    private onClose = () => {
        this.props.onClose(this.state.container, this.state.url)
    }

    private onChange = (event: FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.selectedIndex
        this.setState({container: containers[value]})
    }

    private testUrl = () => {
        fetch(this.state.url).then()
    }
}

export default Settings
