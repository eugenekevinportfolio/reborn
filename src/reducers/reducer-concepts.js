import mogi_url from "../img/Mogi.gif";
import chatroom_url from "../img/FujiSan.jpg";
import mac_url from "../img/MacOS.jpeg";
import youtube_url from "../img/Youtube.gif";
import ipadOS_url from "../img/iPad.jpg";

const initialState = {
  mogi: {
    gif: true,
    img_url: mogi_url,
    title: "iOS Mogi",
    description:
      "Non-intrusive Siri with contextual awareness, new accessibility features, a clipboard manager, contextual awareness in Apple Maps, Live Notifications, and much more. iOS Mogi is all about mobile multitasking and context preservation.",
    date: "August 2018",
    medium:
      "https://uxdesign.cc/redesigning-siri-and-adding-multitasking-features-to-ios-70c2f1a1569b",
    credits: "Mogi village near Nagasaki."
  },
  youtube: {
    gif: true,
    img_url: youtube_url,
    title: "Youtube 2.0",
    description:
      "A better homepage with a big emphasis on recommendations, picture-in-picture for the desktop, Instant Playlists, clear labelling in the video panel, digital wellbeing and much more. Youtube 2.0 vows to deliver a modern and intuitive experience to all its users.",
    date: "June 2018",
    medium:
      "https://uxdesign.cc/my-attempt-at-redesigning-youtube-for-a-more-intuitive-and-modern-experience-dbd7707c135c",
    credits: "Kyoto Station, eerie weather."
  },
  ipadOS: {
    img_url: ipadOS_url,
    title: "iPad OS",
    description:
      "New UX for Siri, new app management and navigation paradigm inspired by the iPhone X’s, saving elements and much more. iPad OS aspires to use bezel-less screens at their full potential for better productivity.",
    date: "October 2018",
    medium:
      "https://uxdesign.cc/ipad-os-redesigning-siri-and-multitasking-on-the-ipad-pro-in-the-wake-of-the-apple-event-445ac9bacb54",
    credits: "Taken somewhere in Hokkaido, Northern Japan."
  },
  chatroom: {
    img_url: chatroom_url,
    title: "iMessage Chatroom",
    description:
      "A new place to enjoy content or work with relatives in real time, new use cases for live collaboration, breaking out of the shell of iMessage, and more. iMessage Chatroom tries to ease live collaboration and sharing on iOS.",
    date: "August 2018",
    medium:
      "https://uxdesign.cc/redesigning-social-interactions-on-ios-with-imessage-17e9c8fa314",
    credits: "On top of Mount Fuji, after a long night hiking."
  },
  newton: {
    img_url: mac_url,
    title: "macOS Newton",
    description:
      "New window management for the desktop, inspired by the mobile. macOS Newton brings the mobile and the desktop closer than ever.",
    date: "July 2018",
    medium:
      "https://uxdesign.cc/my-attempt-at-redesigning-the-desktop-experience-macos-case-study-99f5f2fb3b10"
  }
};

export default (state = initialState, action) => {
  return state;
};
