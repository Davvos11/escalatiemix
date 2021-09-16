import {Component} from "react";
import {Button, FormControl, FormGroup, Modal} from "react-bootstrap";
import {generateUrlParams} from "./functions";
import {inspect} from "util";
import styles from './styles.module.css';

type props = {
    onClose: (resume: boolean) => void
    onStart: () => void
}

type state = {
    show: boolean
    play: boolean
}

class PianoManDialog extends Component<props, state> {
    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            show: true,
            play: false
        }
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.close} onExited={this.exit}
                   centered dialogClassName={this.state.play ? styles.pianoManDialog : undefined}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Piano Man</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.play ? (
                        <video style={{width: "100%", height: "70vh"}} controls autoPlay>
                            <source src={process.env.PUBLIC_URL + "/pianoman.mp4"} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    ) : "Weet je zeker dat je de borrel wilt beëindigen?"}
                </Modal.Body>
                <Modal.Footer>
                    {this.state.play ? (
                        <Button variant="secondary" onClick={this.close}>Sluiten</Button>
                    ) : (<>
                        <Button variant="secondary" onClick={this.close}>
                            <img src={process.env.PUBLIC_URL + "/neehoor.gif"} alt="Nee hoor" className={styles.icon}/>
                        </Button>
                        <Button variant="primary" onClick={this.play}>
                            <img src={process.env.PUBLIC_URL + "/jahoor.gif"} alt="Ja hoor" className={styles.icon}/>
                        </Button>
                    </>)}
                </Modal.Footer>
            </Modal>
        );
    }

    private close = () => {
        this.setState({show: false})
        // exit() will be called after the modal exited
    }

    private exit = () => {
        this.props.onClose(!this.state.play)
    }

    private play = () => {
        this.props.onStart()
        this.setState({play: true})
    }

}

export default PianoManDialog
