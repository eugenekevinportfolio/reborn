import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import ArticleVideo from "./ArticleVideo.js";
import ArticleImage from "./ArticleImage.js";
import apple_maps from "../videos/Apple Maps.mp4";
import reading from "../videos/Reading.mp4";
import notification_centre from "../videos/Notification Centre.mp4";
// import stopwatch from "../img/Stopwatch.jpg";
// import uber from "../img/Uber.jpg";
// import lockscreen from "../img/Lockscreen.jpg";
import stopwatch_video from "../videos/Stopwatch.mp4";
import livesharing from "../videos/LiveSharing.mp4";
import summoning from "../videos/Summoning Siri.mp4";
import sending from "../videos/Sending.mp4";
import switching from "../videos/Switching.mp4";
import actions from "../videos/Siri actions.mp4";
import mail from "../videos/EditOnTheGo.mov";
import saving from "../videos/SavePicture.mp4";
import saved_dragged from "../videos/SavedDragged.mp4";
// import clipboard_img from "../img/Clipboard.jpg";
// import pick from "../img/Pick.jpg";
// import cards from "../img/Cards.jpg";
import factorized from "../videos/Factorized.mp4";
// import universal_messages from "../img/MessagesApps.jpg";
import universal_contacts from "../videos/Contact.mp4";

class Mogi extends Component {
  render() {
    const { currentMediaIndex, concepts, selected_concept } = this.props;
    const darkMode = selected_concept && concepts[selected_concept].darkMode;

    return (
      <div
        id="article-body"
        className={
          "article-body max-width " + (darkMode ? "article-body--dark" : "")
        }
      >
        <p className="article-paragraph">
          Live Notifications stand at the core of this concept. They are my
          attempt at bringing true multitasking to the mobile, meaning, the
          ability to do multiple things at the same time. To have a clear
          understanding of what they stand for, let’s imagine first that Apple
          Maps is able to determine which line the user is currently using.
        </p>
        <ArticleVideo
          portrait
          index={0}
          currentMediaIndex={currentMediaIndex}
          videoSrc={apple_maps}
          mediaDescription={
            "Once the line is confirmed, itineraries will be calculated using the line as a starting point."
          }
        />
      </div>
    );
  }
}

const selector = createSelector(
  state => state["selected_concept"],
  state => state["concepts"],
  (selected_concept, concepts) => {
    return {
      selected_concept,
      concepts
    };
  }
);

export default connect(selector)(Mogi);
