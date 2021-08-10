import React, {Component} from 'react';
import {Button, Container} from 'react-bootstrap';
import moment, {Moment, Duration} from 'moment';

import {getMixes, mix} from './functions';
import styles from './styles.module.css';
import Player, {change} from './Player';
import Bar from './Bar';
import {ScheduleForm, ScheduleFormProps} from './ScheduleForm';

type state = {
    mixes: mix[] | undefined,
    elapsedFinished: number,
    elapsed: number,
    duration: number,
    left: number,
    eta: Date,
    index: number,
    started: boolean,
    startAt?: Moment,
    startAtDuration?: Duration,
    scheduleTickIntervalId?: NodeJS.Timeout,
    loadingPart: number,
    loadingTotal: number
}

class App extends Component<{}, state> {
    constructor(props: Readonly<{}>) {
        super(props);
        // Get the starting song from the url
        const query = window.location.search
        const params = new URLSearchParams(query)
        const song = params.get('song')
        let index = 0;
        if (song !== null) {
            index = parseInt(song)
        }

        this.state = {
            mixes: undefined,
            elapsedFinished: 0,
            elapsed: 0,
            duration: 0,
            left: 0,
            eta: new Date(),
            index: index,
            started: false,
            startAt: undefined,
            startAtDuration: undefined,
            loadingPart: 0,
            loadingTotal: 0
        }
    }


    render() {
        // If the metadata has not been processed yet, show a loading screen
        if (this.state.mixes === undefined) {
            return <div className={styles.start}>
                <div className={styles.large}>Loading {this.state.loadingPart}/{this.state.loadingTotal}</div>
            </div>
        }

        // If the user has not pressed start yet, show the start button
        if (!this.state.started && !this.state.startAt) {
            return (
                <div className={styles.start}>
                    <h1><i>Letterlijk</i> alle escalatiemixen</h1>
                    <Button className={styles.startButton} size="lg"
                            onClick={() => this.setState({started: true})}>
                        Start
                    </Button>

                    <ScheduleForm className="my-3" onSubmit={this.handleScheduleSubmit} />
                </div>
            );
        } else if (!this.state.started && this.state.startAt) {
            return (
                <div className={styles.start}>
                    <h1><i>Letterlijk</i> alle escalatiemixen</h1>

                    <h3 className="mt-5 mb-3">Scheduled for {this.state.startAt.format('YYYY-MM-DD HH:mm')}</h3>
                    {this.state.startAtDuration && <h3 className="my-3">Starting in {this.formatStartAtDuration()}</h3>}
                </div>
            );
        }

        const mix = this.state.mixes[this.state.index]

        return <Container fluid className={styles.container}>
            <Player img={mix.img} title={mix.title} filename={mix.filename}
                    onChange={this.onPlayerChange} emitTime={this.onTimeChange}/>

            <div className={styles.times}>
                <h1>{this.secsToTime(this.state.elapsed)}</h1>
                <h1>{this.getEta(this.state.eta)}</h1>
                <h1>{this.secsToTime(this.state.left)}</h1>
            </div>

            <Bar mixes={this.state.mixes}
                 onClick={this.loadSong}
                 duration={this.state.duration}
                 elapsed={this.state.elapsed}/>
        </Container>

    }

    async componentDidMount() {
        // Get the mixes
        const mixes = await getMixes(this.displayProgress);
        this.setState({mixes: mixes})
        // Calculate the total time
        let duration = 0;
        mixes.forEach(mix => {
            duration += mix.duration
        })
        this.setState({duration: duration})
        // Load the first song
        this.loadSong(this.state.index);
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<state>, snapshot?: any) {
        if (!prevState.started && this.state.started) {
            // Resize icons that are too big
            this.resizeIcons();
            // Listen for resizes
            window.addEventListener("resize", () => {
                this.resizeIcons()
            })
        }
    }

    componentWillUnmount() {
        if (this.state.scheduleTickIntervalId) {
            clearInterval(this.state.scheduleTickIntervalId);
        }
    }

    private handleScheduleSubmit: ScheduleFormProps['onSubmit'] = (values, event) => {
        event.preventDefault();

        this.setState({
            startAt: moment(`${values.date} ${values.time}`, 'YYYY-MM-DD HH:mm'),
            scheduleTickIntervalId: setInterval(this.scheduleTick, 1000)
        });
    }

    private scheduleTick = () => {
        if (this.state.startAt) {
            const diff = this.state.startAt.diff(moment());

            if (diff < 0) {
                this.setState({
                    started: true
                });

                if (this.state.scheduleTickIntervalId) {
                    clearInterval(this.state.scheduleTickIntervalId);
                }
            } else {
                this.setState({
                    startAtDuration: moment.duration(diff)
                });
            }
        }
    }

    private formatStartAtDuration = () => {
        const duration = this.state.startAtDuration;
        if (!duration) {
            return;
        }

        const parts = [Math.floor(duration.asHours()), duration.minutes(), duration.seconds()];
        return parts.map((s) => s.toString().padStart(2, '0')).join(':');
    }

    private loadSong = (index: number) => {
        // Calculate the duration of the songs before this one
        let elapsed = 0;
        this.state.mixes?.slice(0, index).forEach(mix => {
            if (mix.duration !== undefined)
                elapsed += mix.duration
        })
        this.setState({index: index, elapsedFinished: elapsed});
    }

    private onPlayerChange = (type: change) => {
        if (type === change.Finish) {
            // Load the next song
            if (this.state.index + 1 < this.state.loadingTotal) {
                this.setState({index: this.state.index + 1})
                this.loadSong(this.state.index)
            }
        }
    }

    private onTimeChange = (time: number) => {
        const elapsed = this.state.elapsedFinished + time
        const left = Math.max(0, this.state.duration - this.state.elapsed)
        const eta = new Date((new Date()).getTime() + left * 1000)
        this.setState({elapsed, left, eta})
    }

    private secsToTime = (seconds: number) => {
        return new Date(seconds * 1000).toISOString().substr(11, 8)
    }

    private getEta = (date: Date) => {
        return `${this.zeroPad(date.getHours())}:${this.zeroPad(date.getMinutes())}`
    }

    private zeroPad = (number: number) => {
        if (number.toString().length === 0) {
            return "00"
        } else if (number.toString().length === 1) {
            return "0"+number
        }
        return number
    }

    private displayProgress = (part: number, total: number) => {
        this.setState({loadingPart: part, loadingTotal: total})
    }

    private resizeIcons = () => {
        // Resize icons that are too big
        const icons = document.querySelectorAll(`.${styles.bar} div`)
        icons.forEach(icon => {
            if (icon.clientWidth <= 48) {
                const newSize = Math.min(icon.clientWidth, 30)

                let style = icon.getAttribute("style")
                style = style == null ? "" : style
                style = style.replace(/font-size: \S+;/i, "")
                style += `font-size: ${newSize}px;`

                icon.setAttribute("style", style)
            }
        })
    }

}

export default App;
