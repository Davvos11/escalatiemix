import React, {Component} from "react";
import Settings from "./Settings";
import {Container, containers} from "../config";
import styles from './styles.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";

export const SHOTJE = 35

type props = {
    toeterCount: number
    toetersTotal: number
    onUrlChange: (url: string, delay: number) => void
    toeterUrl: string
    toeterUrlDelay: number
}

type state = {
    displaySettings: boolean
    container: Container
    empties: JSX.Element[]
    current: JSX.Element
    fulls: JSX.Element[]
    showScrollLeft: boolean
    showScrollRight: boolean
}

const IDS = {
    "currentContainer": "current_container",
    "containerContainer": "containers",
    "scrollLeft": "scroll_left",
    "scrollRight": "scroll_right",
    "mainWrapper": "containerWrapper",
}

class Containers extends Component<props, state> {
    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            displaySettings: false,
            container: containers[0],
            empties: [],
            current: <></>,
            fulls: [],
            showScrollLeft: false,
            showScrollRight: false,
        }

    }

    render() {
        return (
            <>
                {/* Settings modal:*/}
                {this.state.displaySettings ?
                    <Settings container={this.state.container}
                              onClose={this.onSettingsClose}
                              toeterCount={this.props.toetersTotal}
                              url={this.props.toeterUrl}
                              delay={this.props.toeterUrlDelay}
                    />
                    : null
                }

                <div className={styles.wrapperWrapper} id={IDS.mainWrapper}>
                    <div className={`${styles.wrapper} ${styles.containerWrapper}`}>
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
                    <div className={`${styles.wrapper} ${styles.scrollWrapper}`}>
                        <div className={styles.settingsButton} style={{visibility: "hidden"}}>
                            <Button aria-label=""><FontAwesomeIcon icon={faCog}/></Button>
                        </div>
                        <div className={`${styles.containerContainer} ${styles.scrollContainer}`}>
                            {/* Will be shown when the bar is scrolled to the right*/}
                            <div id={IDS.scrollLeft} className={styles.scrollLeft}
                                style={{visibility: this.state.showScrollLeft ? "unset" : "hidden"}}/>
                            {/* Will be shown when the bar is scrolled to the left*/}
                            <div id={IDS.scrollRight} className={styles.scrollRight}
                                 style={{visibility: this.state.showScrollRight ? "unset" : "hidden"}}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    componentDidMount() {
        // Update the amount and fullness of the containers
        this.updateContainers(this.props.toeterCount)

        const container = document.getElementById(IDS.containerContainer)
        if (container !== null) {
            // Add a horizontal scroll functionality
            const wrapper = document.getElementById(IDS.mainWrapper)
            wrapper?.addEventListener("wheel", ev => {
                ev.preventDefault()
                container.scrollLeft += ev.deltaY
            })

            // Update the scrolling of the containers (after they have been loaded)
            setTimeout(this.scrollContainers, 1000)

            // Check if the "scroll indicators" at the right and/or left side have to be shown (on each scroll)
            // (they are shown if there are more containers left or right, that you can see by scrolling)
            container.addEventListener("scroll", ev => {
                this.updateScrollIndicators()
            })
        }
    }

    componentDidUpdate(prevProps: Readonly<props>, prevState: Readonly<state>, snapshot?: any) {
        if (prevState.container !== this.state.container) {
            this.updateContainers(this.props.toeterCount)
            setTimeout(this.scrollContainers, 1000)
        }
        if (prevState.empties.length !== this.state.empties.length) {
            // If a glass has been emptied, check if we need to scroll the glasses
            this.scrollContainers()
        }
        if (prevProps.toeterCount !== this.props.toeterCount) {
            this.updateContainers(this.props.toeterCount)
        }
    }

    private updateContainers = (toeterCount: number) => {
        const container = this.state.container
        const relBottom = container.height - container.bottom
        // Calculate the amount of total volume and containers
        const totalVolume = this.props.toetersTotal * SHOTJE;
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
        if (fullness !== 0 && toeterCount < this.props.toetersTotal) {
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
        this.updateScrollIndicators()
    }

    private onSettingsClose = (container: Container, url: string, delay: number) => {
        // Update state
        this.setState({container, displaySettings: false})
        // Send url update to parent
        this.props.onUrlChange(url, delay)
    }

    private updateScrollIndicators = () => {
        const container = document.getElementById(IDS.containerContainer)
        if (container === null)
            return
        // Calculate the scrolling progression
        const width = container.scrollWidth - container.clientWidth
        const scrolled = container.scrollLeft / width
        // Check if we need to show the indicators
        this.setState({
            showScrollLeft: scrolled > 0,
            showScrollRight: scrolled < 1 && width !== 0
        })
    }
}

export default Containers
