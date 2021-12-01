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

const CURRENT_CONTAINER_ID = "current_container"

class Containers extends Component<props, state> {
    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            displaySettings: false,
            container: containers[1],
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
                    <div className={styles.containerContainer}>
                        <div className={`${styles.container} ${styles.emptyContainer}`}>
                            {this.state.empties}
                            <div className={`${styles.container} ${styles.currentContainer}`}
                                 id={CURRENT_CONTAINER_ID}>
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
        // Calculate the total and empty amount of containers
        let containerCount = this.props.toeters.length * (SHOTJE / this.state.container.capacity)
        let emptyContainerCount = toeterCount * (SHOTJE / this.state.container.capacity)
        let fullContainerCount = this.props.toeters.length * (SHOTJE / this.state.container.capacity) - emptyContainerCount
        // Calculate how much there should be left in the current container
        const fullness = fullContainerCount - Math.floor(fullContainerCount)

        // Round glass counts
        containerCount = Math.ceil(containerCount)
        emptyContainerCount = Math.floor(emptyContainerCount)
        // Calculate how much of the full image should be shown
        // (taking into account that the full image is bigger than a full container)
        const imageFullness = (relBottom +
            fullness * (container.height - container.top - relBottom)) / container.height
        const imageFullnessComplement = 1 / imageFullness
        const imageEmptiness = 1 - imageFullness
        const imageEmptinessComplement = 1 / imageEmptiness

        let empties = [], fulls = [];

        // Create arrays of empty and full containers
        for (let i = 0; i < emptyContainerCount; i++) {
            empties.push(<div className={styles.empty}>
                <img src={container.empty_img} alt={""}/>
            </div>)
        }
        // We start at +1, since the current container also counts (otherwise we would have one too many)
        for (let i = emptyContainerCount + 1; i < containerCount; i++) {
            fulls.push(<div className={styles.full}>
                <div>
                    <img src={container.full_img} alt={""}/>
                </div>
            </div>)
        }

        // Create the container currently being drank
        let current = <></>
        if (toeterCount <= this.props.toeters.length) {
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
        document.getElementById(CURRENT_CONTAINER_ID)?.scrollIntoView({
            behavior: 'smooth',
            block: "center",
            inline: "center"
        })
    }

    private onSettingsClose = (container: Container) => {
        this.setState({container, displaySettings: false})
    }
}

export default Containers
