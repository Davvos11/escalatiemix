import {Component} from "react";
import styles from "./styles.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause} from "@fortawesome/free-solid-svg-icons";

type state = {}
type props = {
    img: string,
    title: string,
    filename: string,
    onChange: (change: change) => void,
    emitTime: (time: number) => void
}

export enum change {
    Play, Pause, Finish
}

class Player extends Component<props, state> {
    private audio: HTMLAudioElement;

    constructor(props: Readonly<props> | props) {
        super(props);

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
        return <>
            <div className={styles.albumArt}>
                <img src={this.props.img} alt={this.props.title}/>
                <span onClick={this.toggle}><FontAwesomeIcon icon={faPause}/></span>
            </div>
            <h1><b>{this.props.title}</b></h1>
        </>
    }

    private toggle = async () => {
        try {
            if (this.audio.paused) {
                await this.audio.play()
            } else {
                await this.audio.pause()
            }
        } catch (e) {
            console.error(e)
        }
    }

    async componentDidMount() {
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

    private async start() {
        // Start playing
        try {
            await this.audio.play()
        } catch (error) {
            console.error(error)
        }
        this.props.onChange(change.Play)
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
    }
}

export default Player