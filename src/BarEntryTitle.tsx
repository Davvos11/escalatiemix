import {Component} from "react";
import {getMixTitle, mix} from "./functions";
import {getIcon} from "./Bar";
import styles from "./styles.module.css"

export default class BarEntryTitle extends Component<{ mix: mix }, {}> {
    render() {
        return (<>
                <span>{getIcon(this.props.mix)}</span>
                <span className={styles.mixTitle}>{getMixTitle(this.props.mix.title)}</span>
            </>
        )

    }
}
