import React, {Component, Fragment} from 'react';
import {Button, Container} from 'react-bootstrap';
import moment, {Moment, Duration} from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    getMixes,
    getUrlParamBoolean,
    getUrlParamInt,
    getUrlParamIntArray,
    mix,
    orderMixes,
    setUrlParams
} from './functions';
import styles from './styles.module.css';
import Player, {change} from './Player';
import Bar from './Bar';
import {ScheduleForm, ScheduleFormProps} from './ScheduleForm';
import {centurionLength, playlist, playlists} from "./config";
import SortableBar from "./SortableBar";
import PlaylistSelect from "./PlaylistSelect";
import {faArrowLeft, faBell, faShareAlt} from "@fortawesome/free-solid-svg-icons";
import ShareDialog from "./ShareDialog";
import {shuffle} from "underscore";
import PianoManDialog from "./PianoManDialog";
import {Centimerion, CentimerionFormProps, CentimerionFormValues} from "./Centimerion";

type state = {
    mixes: mix[] | undefined,
    elapsedFinished: number,
    elapsed: number,
    elapsedInCurrentSong: number,
    duration: number,
    left: number,
    eta: Date,
    index: number,
    autoStart: boolean,
    started: boolean,
    startAt?: Moment,
    startAtDuration?: Duration,
    scheduleTickIntervalId?: NodeJS.Timeout,
    loadingPart: number,
    loadingTotal: number,
    playlist: playlist,
    customPlaylist: boolean,
    showShareDialog: boolean,
    showPianoManDialog: boolean,
    order: number[] | undefined,
    paused: boolean,
    centimerionTime: number | undefined
    startTime: number
}

class App extends Component<{}, state> {
    constructor(props: Readonly<{}>) {
        super(props);

        // Get url parameters
        const index = getUrlParamInt('song')
        const startTime = getUrlParamInt('t')
        const order = getUrlParamIntArray('order')

        let list;
        let custom = false;

        // If an order has been specified, create the custom playlist
        if (order.length > 0) {
            list = {name: "Custom", list: order}
            custom = true;
        } else {
            // Otherwise, try to get the specified or default playlist
            const index = getUrlParamInt('list')
            list = playlists[index]
        }

        this.state = {
            mixes: undefined,
            elapsedFinished: 0,
            elapsed: 0,
            elapsedInCurrentSong: 0,
            duration: 0,
            left: 0,
            eta: new Date(),
            index: index,
            autoStart: getUrlParamBoolean('autostart'),
            started: false,
            startAt: undefined,
            startAtDuration: undefined,
            loadingPart: 0,
            loadingTotal: 0,
            playlist: list,
            customPlaylist: custom,
            showShareDialog: false,
            showPianoManDialog: false,
            order: custom ? order : undefined,
            paused: false,
            centimerionTime: undefined,
            startTime
        }
    }

    private mixes: mix[] | undefined = undefined
    private playlists = playlists


    render() {
        // If the metadata has not been processed yet, show a loading screen
        if (this.state.mixes === undefined) {
            return <div className={styles.start}>
                <div className={styles.large}>Loading {this.state.loadingPart}/{this.state.loadingTotal}</div>
            </div>
        }

        // If the user has not pressed start yet, show the start button and playlist selection
        if (!this.state.started) {
            const content = [];
            if (!this.state.startAt) {
                content.push(
                    <Fragment key="start">
                        <h1><i>Letterlijk</i> alle escalatiemixen</h1>
                        <Button className={styles.startButton} size="lg"
                                onClick={() => this.setState({started: true})}>
                            Start nu
                        </Button>

                        <div className={styles.dropdownWrapper}>
                            <Centimerion onSubmit={this.handleCentimerionSubmit}/>
                            <ScheduleForm className="my-3" onSubmit={this.handleScheduleSubmit}/>
                        </div>
                    </Fragment>
                );
            } else {
                content.push(
                    <Fragment key="scheduled-start">
                        <h1><i>Letterlijk</i> alle escalatiemixen</h1>

                        <h3 className="mt-5 mb-3">Scheduled for {this.state.startAt.format('YYYY-MM-DD HH:mm')}</h3>
                        {this.state.startAtDuration &&
                        <h3 className="my-3">Starting in {this.formatStartAtDuration()}</h3>}
                    </Fragment>
                );
            }

            // Show the playlist selection
            content.push(<div key="playlist-select" className={styles.playlistSelectWrapper}>
                    <PlaylistSelect custom={this.state.customPlaylist}
                                    selected={this.state.playlist}
                                    onChange={this.loadPlaylist}/>
                    <Button onClick={this.shufflePlaylist}>Shuffle</Button>
                </div>
            )
            // Show the current playlist
            if (this.mixes !== undefined) {
                content.push(<SortableBar key={this.state.playlist.name} mixes={this.mixes}
                                          duration={this.state.duration}
                                          playlist={this.state.playlist.list}
                                          onUpdate={this.loadCustomList}/>)
            }

            return (
                <Container fluid className={styles.start}>{content}</Container>
            )
        }

        // Check if we need to show the "share" or "piano man" modal
        let modal;
        if (this.state.showShareDialog) {
            modal = <ShareDialog song={this.state.index}
                                 getTime={() => this.state.elapsedInCurrentSong}
                                 onClose={() => this.setState({showShareDialog: false})}/>
        } else if (this.state.showPianoManDialog) {
            modal = <PianoManDialog
                onClose={(resume) => {
                    this.setState({showPianoManDialog: false})
                    if (resume) {
                        this.setState({paused: false})
                    }
                }}
                onStart={() => this.setState({paused: true})}
            />
        } else {
            modal = null;
        }

        // Get the current mix
        const mix = this.state.mixes[this.state.index]

        return <Container fluid className={styles.container}>
            <div className={styles.topButtons}>
                <Button aria-label="back"
                        onClick={this.backToHome}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>
                <Button aria-label="share" className={styles.share}
                        onClick={() => this.setState({showShareDialog: true})}>
                    <FontAwesomeIcon icon={faShareAlt}/>
                </Button>
                <Button aria-label="piano-man"
                        onClick={() => this.setState({showPianoManDialog: true})}>
                    <img src={process.env.PUBLIC_URL + "/piano.svg"} alt="piano man"
                         className={styles.icon} style={{filter: "invert(100%)"}}/>
                </Button>
            </div>
            <Player img={mix.img} title={mix.title} filename={mix.filename} index={this.state.index}
                    onChange={this.onPlayerChange} emitTime={this.onTimeChange}
                    paused={this.state.paused} startTime={this.state.startTime}
            />

            <div className={styles.times}>
                <h1>{this.secsToTime(this.state.elapsed)}</h1>
                <h1>{this.getEta(this.state.eta)}</h1>
                <h1>{this.secsToTime(this.state.left)}</h1>
            </div>

            <Bar mixes={this.state.mixes}
                 onClick={this.loadSong}
                 duration={this.state.duration}
                 elapsed={this.state.elapsed}
                 centimerionTime={this.state.centimerionTime}
            />

            {modal}
        </Container>

    }

    async componentDidMount() {
        // Get the mixes (and save them in their original order)
        this.mixes = await getMixes(this.displayProgress);
        // Sort the mixes according to the provided playlist
        const mixes = orderMixes(this.mixes, this.state.playlist.list)
        this.setState({mixes: mixes})
        // Load the mixes
        this.loadMixes(mixes)
        // Resize icons that are too big
        this.resizeIcons();

        // Listen for resizes
        window.addEventListener("resize", () => {
            this.resizeIcons()
        })

        const centimerionDuration = getUrlParamInt('centimerion')
        if (centimerionDuration !== 0) {
            this.startCentimerion(centimerionDuration)
        }
        if (this.state.autoStart) {
            this.setState({
                started: true
            });
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<state>, snapshot?: any) {
        if (!prevState.started && this.state.started) {
            // Resize icons that are too big
            this.resizeIcons();
        }

        if (prevState.playlist !== this.state.playlist
            && this.mixes !== undefined && this.state.playlist !== undefined) {
            // Sort the mixes according to the provided playlist
            const mixes = orderMixes(this.mixes, this.state.playlist.list)
            this.setState({mixes: mixes})
            // Load the mixes
            this.loadMixes(mixes)

            // Wait until the page has updated
            setTimeout(() => {
                // Resize icons that are too big
                this.resizeIcons();
            }, 50)
        }
    }

    componentWillUnmount() {
        if (this.state.scheduleTickIntervalId) {
            clearInterval(this.state.scheduleTickIntervalId);
        }
    }

    private loadMixes = (mixes: mix[]) => {
        // Calculate the total time
        let duration = 0;
        mixes.forEach(mix => {
            duration += mix.duration
        })
        if (this.state.centimerionTime !== undefined) {
            duration -= this.state.centimerionTime
        }
        this.setState({duration: duration})
        // Load the first song
        this.loadSong(this.state.index);

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
                // If we are doing centimerion and we are now loading the second "song"
                // i.e. the middle part of centurion, skip to the calculated time
                if (this.state.centimerionTime !== undefined && this.state.index === 0) {
                    // Change the starting time of the next song
                    this.setState({startTime: this.state.centimerionTime})
                } else if (this.state.startTime !== 0)  {
                    // Reset the starting time if it was set for the previous song
                    this.setState({startTime: 0})
                }
                this.setState({index: this.state.index + 1})
                this.loadSong(this.state.index)
            }
        }
    }

    private onTimeChange = (time: number) => {
        let elapsed = this.state.elapsedFinished + time
        let left = Math.max(0, this.state.duration - this.state.elapsed)

        if (this.state.centimerionTime !== undefined) {
            // During the intro of centimerion, the elapsed time is normal,
            // but we need to change the time left
            if (this.state.index === 0) {
                elapsed = this.state.elapsedFinished + time
                left = Math.max(0, this.state.duration - this.state.elapsed - this.state.centimerionTime)
            } else {
                // During the rest, we need to subtract the skipped time from the elapsed time,
                // but the time left can be calculated normally
                elapsed = this.state.elapsedFinished + time - this.state.centimerionTime
                left = Math.max(0, this.state.duration - this.state.elapsed)
            }
        }

        const eta = new Date((new Date()).getTime() + left * 1000)
        this.setState({elapsed, left, eta, elapsedInCurrentSong: time})
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
            return "0" + number
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
            let style = icon.getAttribute("style")
            style = style == null ? "" : style

            if (icon.clientWidth <= 48) {
                const newSize = Math.min(icon.clientWidth, 30)

                // Set / replace the font-size attribute
                style = style.replace(/font-size: \S+;/i, "")
                style += `font-size: ${newSize}px;`
            } else {
                // Remove the font-size attribute (we may have set it before)
                style = style.replace(/font-size: \S+;/i, "")
            }

            icon.setAttribute("style", style)
        })
    }

    private loadPlaylist = (index: number) => {
        const playlist = this.playlists[index]
        this.setState({playlist: playlist, customPlaylist: false, order: undefined})
        setUrlParams([["list", index.toString()], ["order", null]])
    }

    private loadCustomList = (list: number[]) => {
        const playlist = {name: "Custom", list: list}
        this.setState({playlist: playlist, customPlaylist: true, order: list})
        setUrlParams([["list", null], ["order", list.toString().replace(/^\[|]$/, "")]])
    }

    private loadCentimerionList = (list: number[], duration: number) => {
        const playlist = {name: "Centimerion", list: list}
        this.setState({playlist: playlist, customPlaylist: true, order: list})
        setUrlParams([["list", null], ["order", null], ["centimerion", duration.toString()]])
    }

    private backToHome = () => {
        // Remove the autostart, song and time parameters from the URL
        setUrlParams([
            ["autostart", null], ["song", null], ["t", null], ["centimerion", null]
        ])
        // Reload the page
        window.location.reload()
    }

    private shufflePlaylist = () => {
        let newOrder: number[]
        // Shuffle the playlist
        if (this.state.order !== undefined) {
            newOrder = shuffle(this.state.order)
        } else {
            newOrder = shuffle(this.state.playlist.list)
        }

        // Load the list
        this.loadCustomList(newOrder)
    }

    private handleCentimerionSubmit: CentimerionFormProps['onSubmit'] = (values, event) => {
        event.preventDefault();

        const duration = moment.duration(values.time).asSeconds()
        this.startCentimerion(duration)
    }

    private startCentimerion = (duration: number) => {
        // Calculate the amount of centurions
        const centurionCount = duration / centurionLength
        const centurionNumber = Math.ceil(centurionCount)
        // Calculate the start time of the first centurion
        const startAt = centurionLength - (centurionCount % 1) * centurionLength
        this.setState({centimerionTime: startAt})

        // Create a playlist (16 is the intro, 17 the middle and 18 the ending of centurion)
        const list = [16, ...(Array(centurionNumber).fill(17)), 18]
        this.loadCentimerionList(list, duration)

        // Start playing
        this.setState({started: true})
    }
}

export default App;
