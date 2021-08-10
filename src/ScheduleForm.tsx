import {Component} from 'react';
import {Button, Col, Form, FormProps, Row} from 'react-bootstrap';
import moment from 'moment';

import styles from './styles.module.css';

export interface ScheduleFormValues {
    date: string;
    time: string;
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
            time: start.format('HH:mm')
        };
    }

    render() {
        const {onSubmit, ...props} = this.props;
        const now = moment();

        return (
            <Form onSubmit={(event) => onSubmit(this.state, event)} {...props}>
                <Row xs={1} sm={2}>
                    <Col>
                        <Form.Group controlId="schedule-date">
                            <Form.Label className="fw-bold">Date</Form.Label>
                            <Form.Control name="date" type="date" min={now.format('YYYY-MM-DD')}
                                value={this.state.date} onChange={(event) => this.setState({date: event.target.value})} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="schedule-time">
                            <Form.Label className="fw-bold">Time</Form.Label>
                            <Form.Control name="time" type="time" min={now.format('HH:mm')}
                                value={this.state.time} onChange={(event) => this.setState({time: event.target.value})} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button className={styles.startButton} size="lg" type="submit">
                    Schedule start
                </Button>
            </Form>
        )
    }
};
