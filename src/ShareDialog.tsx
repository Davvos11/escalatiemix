import {Component} from "react";
import {Button, FormControl, FormGroup, Modal} from "react-bootstrap";
import {generateUrlParams} from "./functions";

type props = {
    song: number,
    getTime: () => number,
    onClose: () => void
}

type state = {
    show: boolean
    url: string
}

class ShareDialog extends Component<props, state> {
    private timeGetter: NodeJS.Timeout | undefined = undefined;

    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            show: true,
            url: this.generateUrl()
        }
    }

    componentDidMount() {
        // Get the time every second
        this.timeGetter = setInterval(() => {
            this.setState({url: this.generateUrl()})
        }, 1000)
    }

    componentWillUnmount() {
        if (this.timeGetter !== undefined) {
            clearInterval(this.timeGetter)
        }
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.close} onExited={this.props.onClose}
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <FormControl type="text" readOnly value={this.state.url}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.close}>
                        Sluiten
                    </Button>
                    <Button variant="primary"
                            onClick={() => navigator.clipboard.writeText(this.state.url)}
                    >
                        Kopiëer
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private close = () => {
        this.setState({show: false})
        // this.props.onClose() will be called after the modal exited
    }

    private generateUrl = () => {
        const time = Math.round(this.props.getTime())

        // Generate the url
        // We do not have to add the playlist / order, that will already be added upon playlist selection
        const params: [key: string, value: string | null][] = [
            ["song", this.props.song.toString()],
            ["t", time.toString()],
            ["autostart", "true"]
        ]
        return window.location.origin + window.location.pathname + generateUrlParams(params)
    }
}

export default ShareDialog