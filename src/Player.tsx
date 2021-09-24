import {Component} from "react";
import styles from "./styles.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";

type state = {
    paused: boolean,
    error: string | null
}
type props = {
    img: string,
    title: string,
    filename: string,
    index: number,
    onChange: (change: change) => void,
    emitTime: (time: number) => void,
    paused: boolean
    startTime: number
}

export enum change {
    Play, Pause, Finish
}

class Player extends Component<props, state> {
    private readonly audio: HTMLAudioElement;

    constructor(props: Readonly<props> | props) {
        super(props);

        this.state = {
            paused: props.paused,
            error: null
        }

        this.audio = new Audio(this.props.filename)

        // Change the starting point
        this.audio.currentTime = props.startTime
    }

    render() {
        const icon = this.state.paused ? faPlay : faPause

        return <>
            <div className={styles.albumArt} data-paused={this.state.paused}>
                <img src={this.props.img} alt={this.props.title}/>
                <span onClick={this.toggle}><FontAwesomeIcon icon={icon}/></span>
            </div>
            <h1><b>{this.props.title}</b></h1>
            {this.state.error && <h2>Error: {this.state.error}</h2>}
        </>
    }

    private play = async () => {
        try {
            await this.audio.play()
        } catch (e) {
            console.error(e, e.name)

            if (e.name === "NotAllowedError") {
                this.setState({
                    paused: true,
                    error: 'Autoplay is niet toegestaan, klik op de play knop om te starten.'
                });
            } else if (e.name === "AbortError" && !this.audio.paused) {
                /*
                 In Chrome, for some reason the player will emit the following error:
                 The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22
                 However the audio does start playing correctly, therefore we just ignore this error :)
                */
            } else {
                this.setState({
                    error: e.message
                });
            }
        }
        this.setState({
            paused: false,
            error: null
        })
    }

    private pause = async () => {
        this.audio.pause()
        this.setState({
            paused: true,
            error: null
        })
    }

    private toggle = async () => {
        if (this.audio.paused) {
            await this.play();
        } else {
            await this.pause();
        }
    }

    async componentDidMount() {
        // Start emitting the time every second
        setInterval(() => {
            this.props.emitTime(this.audio.currentTime)
        }, 1000)

        // Listen for changes
        this.audio.addEventListener("pause", ev => {
            this.props.onChange(change.Pause)
        })
        this.audio.addEventListener("play", ev => {
            this.props.onChange(change.Play)
        })
        this.audio.addEventListener("ended", ev => {
            this.props.onChange(change.Finish)
        })

        return this.start()
    }

    async componentDidUpdate(prevProps: Readonly<props>, prevState: Readonly<state>, snapshot?: any) {
        // Check if the playlist index has changed
        if (prevProps.index !== this.props.index) {
            // Change the source
            this.audio.src = this.props.filename
            // Change the starting point
            this.audio.currentTime = this.props.startTime
            // Start playing
            await this.start();
        }
        // Check if we need to toggle the play state
        if (prevProps.paused !== this.props.paused) {
            if (this.props.paused) {
                await this.pause()
            } else {
                await this.play()
            }
            this.setState({paused: this.props.paused})
        }
    }

    async componentWillUnmount() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    private async start() {
        if (!this.props.paused) {
            await this.play();
        }
        this.props.onChange(change.Play)
    }
}

export default Player
