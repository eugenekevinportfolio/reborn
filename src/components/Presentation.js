import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import introVideo from "../videos/Portfolio.mp4";
import "../styles/Presentation.css";
import pause from "../img/Pause.svg";
import play from "../img/Play.svg";
import map from "lodash/map";
import Intro from "./Intro";
import { showIntro, disappearIntro } from "../actions/index.js";

class Presentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false,
      showPresentation: false
    };
  }

  onPlayClick() {
    const { paused } = this.state;
    this.setState({ paused: !paused });
    paused && this.videoRef.play();
    !paused && this.videoRef.pause();
  }

  renderIntros() {
    const { intro } = this.props;
    return map(intro, (item, index) => (
      <Intro
        key={index}
        lastIntro={index === intro.length - 1 && true}
        {...item}
      />
    ));
  }

  handleScroll() {
    const { intro } = this.props;
    const { showPresentation } = this.state;
    const intros = document.getElementsByClassName("intro");
    let introsTopPositions = [];
    for (let i = 0; i < intros.length; i++) {
      introsTopPositions.push(intros[i].getBoundingClientRect().top);
    }

    if (
      introsTopPositions[0] <
      window.innerHeight / 2 + window.innerHeight / 10
    ) {
      !showPresentation && this.setState({ showPresentation: true });
    } else {
      showPresentation && this.setState({ showPresentation: false });
    }

    for (let i in introsTopPositions) {
      if (introsTopPositions[i] <= 100) {
        !intro[i].disappear && this.props.disappearIntro(Number(i), true);
      } else {
        intro[i].disappear && this.props.disappearIntro(Number(i), false);
      }

      if (
        introsTopPositions[i] <
        window.innerHeight / 2 + (2 * window.innerHeight) / 10
      ) {
        !intro[i].show && this.props.showIntro(Number(i), true);
      } else {
        intro[i].show && this.props.showIntro(Number(i), false);
      }
    }
  }

  render() {
    const { paused, showPresentation } = this.state;
    const { canScroll } = this.props;
    const videoControl = paused ? play : pause;
    return (
      <div id="presentation-container" className="presentation-container">
        <video
          className={paused ? "paused-video" : ""}
          ref={ref => (this.videoRef = ref)}
          autoPlay
          playsInline
          loop
          muted
        >
          <source src={introVideo} />
        </video>
        <div onClick={() => this.onPlayClick()} className="play-btn">
          <img src={videoControl} style={paused ? { marginLeft: 2 } : {}} />
        </div>

        <div
          onScroll={() => this.handleScroll()}
          className={
            "presentation " +
            (showPresentation ? "shown-presentation " : "") +
            (canScroll ? "can-scroll " : "")
          }
        >
          <div className="intro-container">{this.renderIntros()}</div>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showIntro,
      disappearIntro
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["intro"],
  intro => {
    return {
      intro
    };
  }
);

export default connect(
  selector,
  matchDispatchToProps
)(Presentation);
