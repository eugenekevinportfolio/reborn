import React, { Component } from "react";

export default class ArticleImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedMedia: false
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
    const { focusedMedia } = this.state;

    return (
      <div
        className={
          "article-media-container " +
          (!focusedMedia ? "article-media-container--paused" : "")
        }
      >
        <img
          alt="Media"
          // onLoad={() => console.log("hey")}
          src={imgSrc}
          className={
            "article-media " + (portrait ? "article-media--portrait" : "")
          }
        />
        <p
          className={
            "article-media-description " +
            (focusedMedia ? "article-media-description--played" : "")
          }
        >
          {mediaDescription}
        </p>
      </div>
    );
  }
}
