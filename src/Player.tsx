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
    onChange: (change: change) => void,
    emitTime: (time: number) => void,
}

export enum change {
    Play, Pause, Finish
}

class Player extends Component<props, state> {
    private readonly audio: HTMLAudioElement;

    constructor(props: Readonly<props> | props) {
        super(props);

        this.state = {
            paused: false,
            error: null
        }

        this.audio = new Audio(this.props.filename)

        // Get the starting time from the url
        const query = window.location.search
        const params = new URLSearchParams(query)
        const timeStr = params.get('t')
        let time = 0;
        if (timeStr !== null) {
            time = parseInt(timeStr)
        }
        // Change the starting point
        this.audio.currentTime = time
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

    private toggle = async () => {
        try {
            if (this.audio.paused) {
                await this.audio.play()
                this.setState({
                    paused: false,
                    error: null
                })
            } else {
                this.audio.pause()
                this.setState({
                    paused: true,
                    error: null
                });
            }
        } catch (e) {
            console.error(e, e.name)

            if (e.name === "NotAllowedError") {
                this.setState({
                    paused: true,
                    error: 'Autoplay is niet toegestaan, klik op de play knop om te starten.'
                });
            }
            else if (e.name === "AbortError" && !this.audio.paused) {
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
        // Check if the filename has changed
        if (prevProps.filename !== this.props.filename) {
            // Change the source
            this.audio.src = this.props.filename
            // Start playing
            return this.start();
        }
    }

    async componentWillUnmount() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    private async start() {
        await this.toggle();
        this.props.onChange(change.Play)
    }
}

export default Player