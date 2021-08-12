import {Component} from "react";
import {ReactSortable} from "react-sortablejs";

import {mix} from "./functions";
import styles from "./styles.module.css"
import {getIcon} from "./Bar";
import _ from "underscore";

type item = {
    id: number;
    name: string;
}

type props = {
    mixes: mix[]
    playlist: number[]
    duration: number
    onUpdate: (playlist: number[]) => void
}
type state = {
    list: item[],
}

class SortableBar extends Component<props, state> {
    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            list: this.getList()
        }
    }

    componentDidMount() {
        this.setState({list: this.getList()})
    }

    render() {
        const list = this.state.list.slice(0, this.props.mixes.length)

        return <div className={styles.barWrapper}>
            <ReactSortable className={styles.bar}
                           list={this.state.list}
                           setList={this.onUpdate}
            >
                {list.map((item, index) => {
                    const mix = this.props.mixes[item.id]

                    let length = 10
                    if (mix.duration !== undefined) {
                        length = mix.duration / this.props.duration * 100.
                    }

                    return <div style={{width: length + "%"}} key={index}
                    >
                        {getIcon(mix)}
                    </div>
                })}
            </ReactSortable>
        </div>;
    }

    private getList = () => {
        return this.props.playlist.map(i => {
            return {id: i, name: this.props.mixes[i].title}
        })
    }

    private onUpdate = (list: item[]) => {
        // Check if there has been a change
        if (hasChanged(list, this.state.list)) {
            this.setState({list})
            // Update the rest of the app
            this.props.onUpdate(list.map(i => i.id))
        }
    }


}

const hasChanged = (list1: item[], list2: item[]) => {
    const items1 = list1.map(i => i.id)
    const items2 = list2.map(i => i.id)
    return !(_.isEqual(items1, items2))
}

export default SortableBar