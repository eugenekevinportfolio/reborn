import React, { Component } from "react";
import pause from "../img/Pause.svg";
import play from "../img/Play.svg";
import "../styles/ArticleVideo.css";
import "../styles/Presentation.css";

export default class ArticleVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoPlayed: false,
      disableAutoPlay: false,
      hasLoaded: false
    };
  }

  onPlayClick() {
    const { videoPlayed, disableAutoPlay } = this.state;
    this.setState({
      videoPlayed: !videoPlayed
    });
    if (videoPlayed) {
      this.videoRef.pause();
      this.setState({
        disableAutoPlay: true
      });
    } else {
      this.videoRef.play();
      if (disableAutoPlay) {
        this.setState({
          disableAutoPlay: false
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { index } = this.props;
    const { disableAutoPlay } = this.state;
    if (!disableAutoPlay) {
      if (nextProps.currentMediaIndex === index) {
        this.videoRef.play();
        this.setState({ videoPlayed: true });
      } else {
        this.videoRef.pause();
        this.setState({ videoPlayed: false });
      }
    }
  }

  render() {
    const { videoSrc, mediaDescription, portrait } = this.props;
    const { videoPlayed, hasLoaded, disableAutoPlay } = this.state;
    const videoControl = !videoPlayed ? play : pause;
    return (
      <div
        onClick={() => this.onPlayClick()}
        className={
          "article-media-container " +
          (!videoPlayed ? "article-media-container--paused" : "")
        }
      >
        <div
          className={
            "loader-container " + (hasLoaded ? "loader-container--hidden" : "")
          }
        >
          <div />
        </div>
        <div
          className={
            "article-media " +
            (!hasLoaded ? "article-media--unloaded " : "") +
            (portrait ? "article-media--portrait" : "")
          }
        >
          <video
            onLoadedData={() => this.setState({ hasLoaded: true })}
            playsInline
            loop
            muted
            ref={ref => (this.videoRef = ref)}
            src={videoSrc}
            className={"article-video"}
          />
          <div
            onClick={() => this.onPlayClick()}
            className={
              "control-backdrop " +
              (!hasLoaded ? "control-backdrop--unloaded " : "") +
              (disableAutoPlay ? "control-backdrop--disabled" : "")
            }
          >
            <img className="play-btn" alt="video-control" src={videoControl} />
          </div>
        </div>
        <p
          className={
            "article-media-description " +
            (videoPlayed ? "article-media-description--played " : "") +
            (!hasLoaded ? "article-media-description--unloaded" : "")
          }
        >
          {mediaDescription}
        </p>
      </div>
    );
  }
}
