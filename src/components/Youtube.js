import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import ArticleVideo from "./ArticleVideo";
import home from "../videos/HomePage.mp4";
import player from "../videos/Player.mp4";
import videoPlayer from "../img/VideoPlayer.jpg";
import playerView from "../img/PlayerView.jpg";
import pip from "../videos/Pip.mp4";
import instantPlaylist from "../videos/InstantPlaylist.mp4";
import save from "../videos/Save.mp4";
import BlockQuote from "./BlockQuote";
import ArticleImage from "./ArticleImage";

class Youtube extends Component {
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
        <ArticleVideo
          index={0}
          currentMediaIndex={currentMediaIndex}
          videoSrc={home}
          mediaDescription={
            "The new HomePage in action, with a better emphasis on recommendations."
          }
        />
        <p className="article-paragraph">
          First, the HomePage. The new HomePage is all about recommendations.
          Recommended videos preview automatically in the background. You can
          start watching the video directly from there, pause the preview, or
          add it to the "Watch Later" playlist.
        </p>
        <p className="article-paragraph">
          You can also create a playlist with all the recommended videos simply
          by clicking the red play button.
        </p>
        <BlockQuote
          darkMode={darkMode}
          quote={
            "Youtube 2.0 vows to build a trust relationship with the user, so that their typical experience consists in launching their recommendations and adjusting the playlist on the go."
          }
          shadow={"Trust"}
        />
        <p className="article-paragraph">
          Next: the player. In Youtube 2.0, the player has been completely
          redesigned, to offer a fresh new modal look inspired by the mobile,
          along with new multitasking features.
        </p>
        <ArticleVideo
          index={1}
          currentMediaIndex={currentMediaIndex}
          videoSrc={player}
          mediaDescription={"The new Player View."}
        />
        <p className="article-paragraph">
          In this concept, the Like and Dislike buttons sit on top of the video
          player.
        </p>
        <ArticleImage
          index={2}
          currentMediaIndex={currentMediaIndex}
          imgSrc={videoPlayer}
          mediaDescription={
            "The new video player, with the Like and Dislike buttons directly accessible from there."
          }
        />
        <p className="article-paragraph">
          Their position in the current interface make them hardly reachable:
          you have to quit the fullscren mode in order to see them. An
          incoherent design choice is also that the current interface encourages
          you to jump to the next video directly from the player.
        </p>
        <p className="article-paragraph">
          As a consequence, most of the time, I end up leaving the video without
          having liked (or disliked) it. It’s something that should be avoided
          because then the youtubers are not rewarded for their work, and also
          because I missed a chance as a user to tell Youtube what my
          preferences were, and it could potentially end up in less relevant
          recommendations.
        </p>
        <p className="article-paragraph">
          Sometimes, I also hit the Like button before even watching the video
          but that can prove misleading for the algorithms as well, and it’s not
          how the Like/Dislike buttons were supposed to work after all.
        </p>
        <p className="article-paragraph">
          Another change is that you see people's votes only after voting
          yourself, so as to help fighting against toxic online behaviors such
          as trolling or harassment.
        </p>
        <BlockQuote
          darkMode={darkMode}
          quote={
            "A simple change to the behavior of the Like/Dislike buttons can lead to a more inclusive, less normative and healthier platform."
          }
          shadow={"Healthy"}
        />
        <p className="article-paragraph">
          Now, let's focus on the right side of the Player View.
        </p>
        <ArticleImage
          portrait
          index={3}
          currentMediaIndex={currentMediaIndex}
          imgSrc={playerView}
          mediaDescription={
            "The right side of the Player View, organised differently."
          }
        />
        <p className="article-paragraph">
          The right side has been completely redesigned. It still shows relevant
          videos, but organize them in a more explicit and consistent way to
          remove any ambiguity and mental cognitive load.
        </p>
        <p className="article-paragraph">
          "My Playlist" displays videos in the queue that will play after the
          current one.
        </p>
        <p className="article-paragraph">
          "My Recommendations" is the same playlist as the one found in the
          HomePage. These are general recommendations and do not depend on the
          video currently watched.
        </p>
        <p className="article-paragraph">
          Finally, "More Like This One" groups videos that are similar the
          current one.
        </p>
        <BlockQuote
          darkMode={darkMode}
          quote={
            "The changes made to the organization of the videos aim at being more informative about the decisions made by the AI. Transparency is key when it comes to building trust relationships."
          }
          shadow={"Transparent"}
        />
        <p className="article-paragraph">
          The next feature I designed is something I have been wanting for a
          long time: Picture-in-Picture (PiP).
        </p>
        <p className="article-paragraph">
          The new design of the Player View implements PiP in an intuitive and
          elegant way. Simply click the drag bar at the top (or the Search Bar),
          the panel will be dismissed and the video will enter PiP mode.
        </p>
        <ArticleVideo
          index={4}
          currentMediaIndex={currentMediaIndex}
          videoSrc={pip}
          mediaDescription={"Picture-in-Picture in Youtube 2.0."}
        />
        <p className="article-paragraph">
          PiP is great for multitasking. You can now search for other videos
          without having to leave the current one, which makes for a more fluid
          experience.
        </p>
        <p className="article-paragraph">
          To add a video in the Up Next Queue, simply drag a video to the bottom
          of the page: you have just created what I call an "Instant Playlist".
          You can add as many videos as you want.
        </p>
        <ArticleVideo
          index={5}
          currentMediaIndex={currentMediaIndex}
          videoSrc={instantPlaylist}
          mediaDescription={"Creating an Instant Playlist."}
        />
        <p className="article-paragraph">
          Instant Playlists are temporary: when you leave the website, they stop
          existing. However, you can transform an Instant Playlist into an
          actual Playlist with a click.
        </p>
        <ArticleVideo
          index={6}
          currentMediaIndex={currentMediaIndex}
          videoSrc={save}
          mediaDescription={
            "Transform an Instant Playlist into a playlist with a click."
          }
        />
        <p className="article-paragraph">And that's a wrap for Youtube 2.0!</p>
        <BlockQuote
          darkMode={darkMode}
          quote={
            "Youtube 2.0 relies on two key principles: transparency and fluidity. Transparency is an obligation for AI-oriented platforms such as this one. And modern interactions help for a better and more fluid experience tailored for new generations of users coming from the mobile."
          }
          shadow={"Modern"}
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

export default connect(selector)(Youtube);
