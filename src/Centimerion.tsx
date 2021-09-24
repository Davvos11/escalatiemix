import {Component} from 'react';
import {Button, Col, Collapse, Form, FormProps, Row} from 'react-bootstrap';
import moment from 'moment';

import styles from './styles.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

export interface CentimerionFormValues {
    time: string;
    expanded: boolean
}

export interface CentimerionFormProps extends Omit<FormProps, 'onSubmit'> {
    onSubmit: (values: CentimerionFormValues, event: React.FormEvent<HTMLFormElement>) => void;
}

export type state = CentimerionFormValues;

export class Centimerion extends Component<CentimerionFormProps, state> {
    constructor(props: Readonly<CentimerionFormProps>) {
        super(props);


        this.state = {
            time: "00:20:00",
            expanded: false
        };
    }

    render() {
        const {onSubmit, ...props} = this.props;

        return (
            <div className={styles.centimerionWrapper}>
                <Button variant="light"
                    onClick={() => this.setState({expanded: !this.state.expanded})}
                    aria-expanded={this.state.expanded}
                >
                    Centimerion {this.state.expanded ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>}
                </Button>
                <Collapse in={this.state.expanded}>
                    <Form onSubmit={(event) => onSubmit(this.state, event)} {...props} className={styles.forms}>
                        <Row xs={1}>
                            <Col>
                                <Form.Group controlId="schedule-time">
                                    <Form.Label className="fw-bold">Timer</Form.Label>
                                </Form.Group>
                                <input name="time" data-duration={this.state.time}
                                       className="html-duration-picker"
                                       onChange={(event) => this.setState({time: event.target.value})}/>
                            </Col>
                        </Row>
                        <Button className={styles.startButton} size="lg" type="submit">
                            Start timer
                        </Button>
                    </Form>
                </Collapse>
            </div>
        )
    }
}
