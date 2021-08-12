import {Component, FormEvent} from "react";
import styles from "./styles.module.css"
import {FormLabel, FormSelect} from "react-bootstrap";
import {playlist, playlists} from "./config";

type props = {
    custom: boolean,
    onChange: (index: number) => void
    selected: playlist
}
type state = {}

export default class PlaylistSelect extends Component<props, state> {
    render() {
        return (
            <div className={styles.playlistSelect}>
                <FormLabel className="fw-bold">Playlist:</FormLabel>
                <FormSelect size="lg" onChange={this.onChange}>
                    {playlists.map((list, index) => {
                        return <option key={index} selected={list === this.props.selected}>{list.name}</option>
                    })}
                    {this.props.custom ? <option selected={true}>Custom</option> : null}
                </FormSelect>
            </div>
        );
    }

    private onChange = (event: FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.selectedIndex
        this.props.onChange(Number(value))
    }
}