import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import { playVideo } from "../actions/index.js";
import introVideo from "../videos/Portfolio.mp4";
import "../styles/Presentation.css";
import pause from "../img/Pause.svg";
import play from "../img/Play.svg";

class Presentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPresentation: false
    };
  }

  onPlayClick() {
    const { video_played } = this.props;
    this.props.playVideo(!video_played);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.video_played) {
      this.videoRef.play();
    } else {
      this.videoRef.pause();
    }
  }

  render() {
    const { video_played } = this.props;
    const videoControl = !video_played ? play : pause;
    return (
      <div id="presentation" className="section">
        <div className="max-width">
          <p className="section-sub">
            Images are worth more than a thousand words
          </p>
          <h3 className="section-title">About Me</h3>
          <div
            className={
              "video-container " +
              (!video_played ? "video-container--paused" : "")
            }
          >
            <video
              id="pres-video"
              className="pres-video"
              ref={ref => (this.videoRef = ref)}
              playsInline
              loop
              muted
            >
              <source src={introVideo} />
            </video>
            <div
              onClick={() => this.onPlayClick()}
              className="control-backdrop"
            >
              <img
                className="play-btn"
                alt="video-control"
                src={videoControl}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      playVideo
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["video_played"],
  video_played => {
    return {
      video_played
    };
  }
);

export default connect(
  selector,
  matchDispatchToProps
)(Presentation);
