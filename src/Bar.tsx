import {Component} from "react";
import {getMixTitle, mix} from "./functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import styles from "./styles.module.css"
import BarEntryTitle from "./BarEntryTitle";

type props = {
    mixes: mix[]
    duration: number
    elapsed: number
    elapsedInCurrentSong: number
    currentMix: number
    onClick: (index: number) => void
    centimerionTime: number | undefined
}
type state = {}

class Bar extends Component<props, state> {
    render() {
        const progress = this.props.elapsed / this.props.duration * 100

        const width = progress < 50 ? `calc(${progress}% + 3px)` : `${progress}%`;

        return <div className={styles.barWrapper}>
            <div className={`${styles.bar} ${styles.progress}`} style={{width: width}}>placeholder</div>
            <div className={styles.bar}>
                {this.props.mixes.map((mix, index) => {
                    let duration = mix.duration
                    if (this.props.centimerionTime !== undefined && index === 1) {
                        duration -= this.props.centimerionTime
                    }

                    let length = 10
                    if (duration !== undefined) {
                        length = duration / this.props.duration * 100.
                    }

                    const className = index < this.props.currentMix ? styles.elapsedMix :
                        (index === this.props.currentMix ? styles.currentMix : '')

                    if (index === this.props.currentMix) {
                        // Calculate progress bar for the current song, for the mobile view
                        const progress = this.props.elapsedInCurrentSong / mix.duration * 100
                        let width
                        if (progress < 50) {
                            width = `calc(${progress}% + 3px)`
                        } else {
                            width = `${progress}%`
                        }
                    }

                    return <div style={{width: length + "%"}}
                                onClick={() => this.props.onClick(index)}
                                key={index}
                                className={className}
                    >
                        <BarEntryTitle mix={mix}/>
                    </div>
                })}
            </div>
        </div>;
    }

}

export const getIcon = (mix: mix) => {
    let text;
    if (mix.icon !== undefined) {
        text = [<FontAwesomeIcon icon={mix.icon}/>]
        if (mix.number !== undefined) {
            text = [...text, <span style={{width: "5px"}}/>, <sup>{mix.number}</sup>]
        }
    } else if (mix.number !== undefined) {
        text = mix.number
    }

    return text
}

export default Bar
