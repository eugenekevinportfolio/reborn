import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import BlockQuote from "./BlockQuote";
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
          In 2017, I decided to undergo my end-of-studies internship in Tokyo,
          Japan. I worked for a retail startup called Locarise as designer and
          front developer. During my time there, I fully designed and coded an
          app for iPad and iPhone which has been in use for more than two years
          now in Tokyo’s shops.
        </p>
        <p className="article-paragraph">
          This wasn’t actually my first time in the country — two years before
          that, I did a linguistic exchange in Gifu, in rural Japan — but
          settling on my own and experiencing the local lifestyle was a first.
          And with every first comes its set of wonders.
        </p>
        <BlockQuote
          darkMode={darkMode}
          quote={
            "When I stepped down the bus in Shinjuku for the first time, I remember feeling completely overwhelmed."
          }
          shadow={"Too much"}
        />
        <p className="article-paragraph">
          When I stepped down the bus in Shinjuku for the first time, I remember
          feeling completely overwhelmed. I had to find my way through a huge
          crowd of hungry salarymen and women (it was noon and I hadn’t slept
          for a 24 hours) and the labyrinth-like organization of Shinjuku only
          accentuated the feeling. I had a meeting two hours later in Shinjuku
          with the person in charge of my guest house; yet, I barely made it on
          time though the meeting spot was just less than a mile away from my
          bus stop.
        </p>
        <p className="article-paragraph">
          This was the first time I started « feeling » what would later become
          iOS Mogi. What if my smartphone was smart enough to actually
          understand the context I was using it so it could adapt its UI/UX and
          be more relevant? A few months later, I put a word on this idea and
          called it: Contextual Awareness.
        </p>
        <BlockQuote
          darkMode={darkMode}
          quote={
            "Contextual Awareness is a new multitasking paradigm that allows the user to perform multiple actions at the same time in a fluid and elegant way."
          }
          shadow={"Smart"}
        />
        <p className="article-paragraph">
          Contextual Awareness stands at the core of iOS Mogi. It is a new
          multitasking paradigm that allows the user to perform multiple actions
          at the same time in a fluid and elegant way. Here’s an example of how
          it could be useful.
        </p>
        <p className="article-paragraph">
          Tokyo’s subway system is one of the best in the world, but also one of
          the hardest to navigate, especially if, like me, your understanding of
          Chinese characters (« Kanjis ») is limited. Most of my travels were
          stressful as I was always afraid of missing my stop. Also, since I
          could actually use my phone in the train thanks to the omnipresent
          cellular connection — magic of the Japanese engineering, I was all the
          more inclined to miss my stops since my attention was on the phone
          rather than the route.
        </p>
        <BlockQuote
          darkMode={darkMode}
          quote={
            "What if my phone understood the line I used, and proposed an interface that would allow me to do something else on my phone rather than constantly having to check the route in the Maps app?"
          }
          shadow={"Relax"}
        />
        <p className="article-paragraph">
          Imagine you’re eager to read Steve Jobs’ biography while riding Keio
          Line towards Takaosan. Well now you can with a simple swipe.
        </p>
        <p className="article-paragraph">
          This bubble that looks like a notification is what I call a « Live
          Notification ». It doesn’t go away after a few seconds like a regular
          one. Instead, it stays in reach all the time so you can access it very
          quickly without interrupting your current workflow. To open
          Notification Center, swipe further, in old iOS 10 Spotlight fashion.
        </p>
        <p className="article-paragraph">
          Another area of iOS which would greatly benefit from this new paradigm
          is Siri. Siri becoming a Live Notification paves the way for great new
          possibilities, like this one, which I call « Siri Actions ». (After
          Japan, I came back to France and studied for a year at a business
          school which gave me the tendency to give names to everything. Pretty
          useful.)
        </p>
        <BlockQuote
          darkMode={darkMode}
          quote={"In iOS Mogi, Siri becomes a Live Notification."}
          shadow={"Assistant"}
        />
        <p className="article-paragraph">
          You can ask Siri to find pictures for you and it will do so in the
          background while you are typing to your friend! (A small side note on
          the position of Siri. After iOS Mogi, I started seeing on the web a
          lot of concepts which minified Siri and put it in a card at the
          bottom: I think this is a mistake as it wouldn’t be possible to use
          Siri at the same time as using the keyboard.)
        </p>
        <p className="article-paragraph">
          Siri also makes styling your email to Craig a lot easier!
        </p>
        <p className="article-paragraph">
          And that’s a wrap for iOS Mogi! I believe this new paradigm paves the
          way for a wide array of actions and is another step towards an
          AI-driven ecosystem that helps making its users’ life a bit easier.
        </p>
        <p className="article-paragraph">
          Looking back on this concept I made about two years ago and published
          last year, I do realize it has a few flaws here and there… but this is
          the subject of another case study that I may publish in the coming
          months and includes a full redesign of how notifications behave on iOS
          (Spoiler: it’s called iOS Action Center).
        </p>
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
