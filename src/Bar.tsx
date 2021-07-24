import {Component} from "react";
import {mix} from "./functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import styles from "./styles.module.css"

type props = {
    mixes: mix[]
    duration: number
    elapsed: number
    onClick: (index: number) => void
}
type state = {}

class Bar extends Component<props, state> {
    render() {
        const progress = this.props.elapsed / this.props.duration * 100
        let width
        if (progress < 50) {
            width = `calc(${progress}% + 3px)`
        } else {
            width = `${progress}%`
        }

        return <div className={styles.barWrapper}>
            <div className={`${styles.bar} ${styles.progress}`} style={{width: width}}>placeholder</div>
            <div className={styles.bar}>
                {this.props.mixes.map((mix, index) => {
                    let length = 10
                    if (mix.duration !== undefined) {
                        length = mix.duration / this.props.duration * 100.
                    }

                    return <div style={{width: length + "%"}}
                                onClick={() => this.props.onClick(index)}
                                key={index} >
                        {this.getIcon(mix)}
                    </div>
                })}
            </div>
        </div>;
    }

    private getIcon = (mix: mix) => {
        let text;
        if (mix.icon !== undefined) {
            text = <FontAwesomeIcon icon={mix.icon}/>
        } else if (mix.number !== undefined) {
            text = mix.number
        }

        return text
    }
}

export default Bar