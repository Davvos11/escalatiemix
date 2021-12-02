import React, {Component} from "react";
import Settings from "./Settings";
import {Container, containers} from "../config";
import styles from './styles.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";

const SHOTJE = 35

type props = {
    time: number
    totalTime: number
    toeters: number[]
}

type state = {
    displaySettings: boolean
    container: Container
    toeterCount: number
    empties: JSX.Element[]
    current: JSX.Element
    fulls: JSX.Element[]
}

const IDS = {
    "currentContainer": "current_container",
    "containerContainer": "containers",
    "scrollLeft": "scroll_left",
    "scrollRight": "scroll_right"
}

class Containers extends Component<props, state> {
    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            displaySettings: false,
            container: containers[0],
            toeterCount: 0,
            empties: [],
            current: <></>,
            fulls: []
        }

    }

    render() {
        return (
            <>
                {/* Settings modal:*/}
                {this.state.displaySettings ?
                    <Settings selected={this.state.container}
                              onClose={this.onSettingsClose}/>
                    : null
                }

                <div className={styles.wrapper}>
                    <div className={styles.settingsButton}>
                        <Button aria-label="back"
                                onClick={() => this.setState({displaySettings: true})}>
                            <FontAwesomeIcon icon={faCog}/>
                        </Button>
                    </div>
                    <div className={styles.containerContainer} id={IDS.containerContainer}>
                        <div className={`${styles.container} ${styles.emptyContainer}`}>
                            {this.state.empties}
                            <div className={`${styles.container} ${styles.currentContainer}`}
                                 id={IDS.currentContainer}>
                                {this.state.current}
                            </div>
                        </div>
                        <div className={`${styles.container} ${styles.fullContainer}`}>
                            {this.state.fulls}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    componentDidMount() {
        // Update the amount and fullness of the containers
        this.updateContainers(this.state.toeterCount)
    }

    componentDidUpdate(prevProps: Readonly<props>, prevState: Readonly<state>, snapshot?: any) {
        if (prevProps.time !== this.props.time) {
            // Get the timestamp of the next toeter
            let newCount = this.state.toeterCount
            // Check if this timestamp has since passed
            let nextToeter = this.props.toeters[newCount]
            while (this.props.time >= nextToeter) {
                newCount += 1
                if (newCount >= this.props.toeters.length) {
                    newCount = this.props.toeters.length
                    break
                }
                nextToeter = this.props.toeters[newCount]
            }
            // Check if the current time is earlier than (what we believe is) the previous toeter
            // TODO more efficient
            nextToeter = this.props.toeters[newCount - 1]
            while (this.props.time < nextToeter) {
                newCount -= 1
                if (newCount < 0) {
                    newCount = 0
                    break
                }
                nextToeter = this.props.toeters[newCount]
                console.log(this.props.time, nextToeter, newCount)
            }

            if (newCount !== this.state.toeterCount)
                this.updateContainers(newCount)
            this.setState({toeterCount: newCount})
        }
        if (prevState.container !== this.state.container) {
            this.updateContainers(this.state.toeterCount)
        }
        if (prevState.empties.length !== this.state.empties.length) {
            // If a glass has been emptied, check if we need to scroll the glasses
            this.scrollContainers()
        }
    }

    private updateContainers = (toeterCount: number) => {
        const container = this.state.container
        const relBottom = container.height - container.bottom
        // Calculate the amount of total volume and containers
        let totalVolume = this.props.toeters.length * SHOTJE
        const totalContainers = Math.ceil((totalVolume) / container.capacity)
        // Calculate the excess volume (i.e. the volume that should already be gone from the first container)
        const excessVolume = totalContainers * container.capacity - totalVolume
        // Calculate the amount of already consumed volume and containers
        const consumedVolume = toeterCount * SHOTJE + excessVolume
        const emptyContainers = Math.floor(consumedVolume / container.capacity)
        // Calculate the amount of volume consumed from the current container
        const currentConsumed = consumedVolume % container.capacity
        const currentRemaining = container.capacity - currentConsumed
        const fullness = currentRemaining / container.capacity
        // Calculate the amount of full containers
        let fullContainers = totalContainers - emptyContainers - (currentConsumed > 0 ? 1 : 0)

        // Hacky fix for if SHOTJE === container.capacity
        fullContainers -= Math.floor(fullness)

        // Calculate how much of the full image should be shown
        // (taking into account that the full image is bigger than a full container)
        const imageFullness = (relBottom +
            fullness * (container.height - container.top - relBottom)) / container.height
        const imageFullnessComplement = 1 / imageFullness
        const imageEmptiness = 1 - imageFullness
        const imageEmptinessComplement = 1 / imageEmptiness

        let empties = [], fulls = [];

        // Create arrays of empty and full containers
        for (let i = 0; i < emptyContainers; i++) {
            empties.push(<div className={styles.empty}>
                <img src={container.empty_img} alt={""}/>
            </div>)
        }
        for (let i = 0; i < fullContainers; i++) {
            fulls.push(<div className={styles.full}>
                <div>
                    <img src={container.full_img} alt={""}/>
                </div>
            </div>)
        }

        // Create the container currently being drank
        let current = <></>
        if (fullness !== 0 && toeterCount < this.props.toeters.length) {
            current = (<div className={styles.current}>
                <div className={styles.emptyPart} style={{height: `${imageEmptiness * 100}%`}}>
                    <img src={container.empty_img} alt={""} style={{
                        height: `${imageEmptinessComplement * 100}%`
                    }}/>
                </div>
                <div className={styles.fullPart} style={{height: imageFullness * 100 + "%"}}>
                    <img src={container.full_img} alt={""} style={{
                        height: `${imageFullnessComplement * 100}%`,
                        top: `-${(imageFullnessComplement - 1) * 100}%`
                    }}/>
                </div>
            </div>)
        }

        this.setState({empties, current, fulls})
    }

    private scrollContainers = () => {
        document.getElementById(IDS.currentContainer)?.scrollIntoView({
            behavior: 'smooth',
            block: "nearest",
            inline: "center"
        })
    }

    private onSettingsClose = (container: Container) => {
        this.setState({container, displaySettings: false})
    }
}

export default Containers
