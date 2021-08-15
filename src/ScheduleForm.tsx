import {Component} from 'react';
import {Button, Col, Collapse, Form, FormProps, Row} from 'react-bootstrap';
import moment from 'moment';

import styles from './styles.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

export interface ScheduleFormValues {
    date: string;
    time: string;
    expanded: boolean
};

export interface ScheduleFormProps extends Omit<FormProps, 'onSubmit'> {
    onSubmit: (values: ScheduleFormValues, event: React.FormEvent<HTMLFormElement>) => void;
};

export type SccheduleFormState = ScheduleFormValues;

export class ScheduleForm extends Component<ScheduleFormProps, SccheduleFormState> {
    constructor(props: Readonly<ScheduleFormProps>) {
        super(props);

        const start = moment().startOf('hour').add(1, 'hour');

        this.state = {
            date: start.format('YYYY-MM-DD'),
            time: start.format('HH:mm'),
            expanded: false
        };
    }

    render() {
        const {onSubmit, ...props} = this.props;
        const now = moment();

        return (
            <div className={styles.scheduleWrapper}>
                <Button variant="light"
                    onClick={() => this.setState({expanded: !this.state.expanded})}
                    aria-expanded={this.state.expanded}
                >
                    Schedule start {this.state.expanded ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>}
                </Button>
                <Collapse in={this.state.expanded}>
                    <Form onSubmit={(event) => onSubmit(this.state, event)} {...props} className={styles.forms}>
                        <Row xs={1} sm={2}>
                            <Col>
                                <Form.Group controlId="schedule-date">
                                    <Form.Label className="fw-bold">Datum</Form.Label>
                                    <Form.Control name="date" type="date" min={now.format('YYYY-MM-DD')}
                                                  value={this.state.date}
                                                  onChange={(event) => this.setState({date: event.target.value})}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="schedule-time">
                                    <Form.Label className="fw-bold">Tijd</Form.Label>
                                    <Form.Control name="time" type="time"
                                                  value={this.state.time}
                                                  onChange={(event) => this.setState({time: event.target.value})}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className={styles.startButton} size="lg" type="submit">
                            Schedule start
                        </Button>
                    </Form>
                </Collapse>
            </div>
        )
    }
};
