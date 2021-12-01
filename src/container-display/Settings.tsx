import {Component, FormEvent} from "react";
import {Button, FormLabel, FormSelect, Modal} from "react-bootstrap";
import {Container, containers} from "../config";

type props = {
    onClose: (selected: Container) => void
    selected: Container
}

type state = {
    show: boolean
    selected: Container
}

class Settings extends Component<props, state> {
    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            show: true,
            selected: props.selected,
        }
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.close} onExited={this.onClose}
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormLabel className="fw-bold">Playlist:</FormLabel>
                    <FormSelect size="lg" onChange={this.onChange}>
                        {containers.map((list, index) => {
                            return <option key={index} selected={list === this.props.selected}>{list.name}</option>
                        })}
                    </FormSelect>
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
        this.props.onClose(this.state.selected)
    }

    private onChange = (event: FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.selectedIndex
        this.setState({selected: containers[value]})
    }
}

export default Settings
