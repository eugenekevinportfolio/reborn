import React, { Component } from "react";

export default class ArticleImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedMedia: false,
      hasLoaded: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { index } = this.props;
    if (nextProps.currentMediaIndex === index) {
      this.setState({ focusedMedia: true });
    } else {
      this.setState({ focusedMedia: false });
    }
  }

  render() {
    const { imgSrc, mediaDescription, portrait } = this.props;
    const { focusedMedia, hasLoaded } = this.state;

    return (
      <div
        className={
          "article-media-container " +
          (!focusedMedia ? "article-media-container--paused" : "")
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
        <img
          alt="Media"
          onLoad={() => this.setState({ hasLoaded: true })}
          src={imgSrc}
          className={
            "article-media article-image " +
            (portrait ? "article-media--portrait" : "") +
            (!hasLoaded ? "article-media--unloaded" : "")
          }
        />
        <p
          className={
            "article-media-description " +
            (focusedMedia ? "article-media-description--played" : "") +
            (!hasLoaded ? "article-media-description--unloaded" : "")
          }
        >
          {mediaDescription}
        </p>
      </div>
    );
  }
}
