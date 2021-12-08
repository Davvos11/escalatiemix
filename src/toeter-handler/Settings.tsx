import {Component, FormEvent} from "react";
import {Button, Col, FormControl, FormLabel, FormSelect, InputGroup, Modal, Row} from "react-bootstrap";
import {Container, containers} from "../config";
import {SHOTJE} from "./Containers";

type props = {
    onClose: (container: Container, url: string, delay: number) => void
    container: Container
    url: string
    delay: number
    toeterCount: number
}

type state = {
    show: boolean
    container: Container
    url: string
    delay: number
}

class Settings extends Component<props, state> {
    private airhornAudio: HTMLAudioElement;

    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            show: true,
            container: props.container,
            url: props.url,
            delay: props.delay,
        }

        this.airhornAudio = new Audio("toeter.ogg")
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
                        <Col><FormControl type="number" value={this.state.container.capacity} readOnly/></Col>
                        <Col><FormLabel column>Aantal:</FormLabel></Col>
                        <Col><FormControl type="number" value={amount} readOnly/></Col>
                    </Row>
                </Modal.Body>
                <Modal.Body>
                    <FormLabel className="fw-bold">URL bij elke toeter (optioneel):</FormLabel>
                    <Row>
                        <Col xs={12} md={3}>
                            <FormLabel column>Delay:</FormLabel>
                            <FormControl type="number" step={0.1} value={this.state.delay}
                                         onChange={event => this.setState({delay: parseFloat(event.target.value)})}/>
                        </Col>
                        <Col xs={12} md={9}>
                            <FormLabel column>URL:</FormLabel>
                            <InputGroup>
                                <FormControl type="text" value={this.state.url}
                                             onChange={event => this.setState({url: event.target.value})}/>
                                <Button variant="outline-primary" onClick={this.testUrl}>Test</Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.close}>
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
        this.props.onClose(this.state.container, this.state.url, this.state.delay)
    }

    private onChange = (event: FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.selectedIndex
        this.setState({container: containers[value]})
    }

    private testUrl = () => {
        // Fire the GET request
        fetch(this.state.url).then()
        // Play the toeter sound after the specified delay
        setTimeout(() => {
            this.airhornAudio.currentTime = 0
            this.airhornAudio.play().then()
        }, this.state.delay * 1000)
    }
}

export default Settings
