import React, { Component } from "react";
import pause from "../img/Pause.svg";
import play from "../img/Play.svg";
import "../styles/ArticleVideo.css";

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
      videoPlayed: !videoPlayed,
      disableAutoPlay: !disableAutoPlay
    });
    if (videoPlayed) {
      this.videoRef.pause();
    } else {
      this.videoRef.play();
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
    const { videoSrc, mediaDescription } = this.props;
    const { videoPlayed, hasLoaded } = this.state;
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
          <div />
          <div />
        </div>
        <video
          onLoadedData={() => this.setState({ hasLoaded: true })}
          playsInline
          loop
          muted
          ref={ref => (this.videoRef = ref)}
          src={videoSrc}
          className={
            "article-media " + (!hasLoaded ? "article-media--unloaded" : "")
          }
        />
        <div
          onClick={() => this.onPlayClick()}
          className={
            "control-backdrop " +
            (!hasLoaded ? "control-backdrop--unloaded" : "")
          }
        >
          <img className="play-btn" alt="video-control" src={videoControl} />
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