import mogi_url from "../img/Mogi.gif";
import youtube_url from "../img/Youtube.gif";
import ipadOS_url from "../img/iPad.gif";
import youtube_article from "../img/YoutubeArticle.jpg";
import mac_article from "../img/MacArticle.jpg";
import chatroom_article from "../img/ChatroomArticle.jpg";
import mogi_article from "../img/MogiArticle.jpg";
import ipad_article from "../img/iPadArticle.jpg";
import mogiPreview from "../videos/Mogi.mp4";

const initialState = {
  mogi: {
    gif: true,
    local: true,
    img_url: mogi_url,
    img_article: mogi_article,
    preview: mogiPreview,
    title: "iOS Mogi",
    sub: "Introducing Contextual Awareness",
    subheader: "Introducing Contextual Awareness",
    scroll: "Lay back and feel the breeze",
    description:
      "Non-intrusive Siri with contextual awareness, new accessibility features, a clipboard manager, contextual awareness in Apple Maps, Live Notifications, and much more. iOS Mogi is all about mobile multitasking and context preservation.",
    date: "August 2018",
    medium:
      "https://uxdesign.cc/redesigning-siri-and-adding-multitasking-features-to-ios-70c2f1a1569b",
    credits: "Mogi village near Nagasaki.",
    external_links: [
      {
        main:
          "Beautiful Siri concept imagines ‘parallel help’ ditching full-screen takeover, reinvents iOS multitasking",
        website: "9to5Mac",
        link:
          "https://9to5mac.com/2018/08/03/siri-concept-non-intrusive-multitasking-ios/"
      },
      {
        main:
          "iOS Concept Reimagines Siri With Non-Intrusive UI, Contextual Awareness, and More",
        website: "MacRumors",
        link:
          "https://www.macrumors.com/2018/08/03/ios-concept-reimagines-siri/"
      },
      {
        main:
          "Concept iOS Mogi : davantage de souplesse pour Siri et les notifications",
        website: "iGeneration (FR)",
        link:
          "https://www.igen.fr/ios/2018/08/concept-ios-mogi-davantage-de-souplesse-pour-siri-et-les-notifications-104852"
      },
      {
        main: "Redesigning Siri and adding multitasking features to iOS",
        website: "Medium",
        link:
          "https://uxdesign.cc/redesigning-siri-and-adding-multitasking-features-to-ios-70c2f1a1569b"
      }
    ]
  },
  youtube: {
    gif: true,
    local: true,
    darkMode: true,
    link: "articles/youtube20",
    sub: "Designing a modern streaming platform",
    subheader: "A Modern Streaming Platform",
    scroll: "Grab a seat and some popcorn",
    img_url: youtube_url,
    img_article: youtube_article,
    title: "Youtube 2.0",
    description:
      "A better homepage with a big emphasis on recommendations, picture-in-picture for the desktop, Instant Playlists, clear labelling in the video panel, digital wellbeing and much more. Youtube 2.0 vows to deliver a modern and intuitive experience to all its users.",
    date: "June 2018",
    medium:
      "https://uxdesign.cc/my-attempt-at-redesigning-youtube-for-a-more-intuitive-and-modern-experience-dbd7707c135c",
    credits: "Kyoto Station, eerie weather.",
    external_links: [
      {
        main: "Redesigning Youtube for a more intuitive and modern experience",
        website: "Medium",
        link:
          "https://uxdesign.cc/my-attempt-at-redesigning-youtube-for-a-more-intuitive-and-modern-experience-dbd7707c135c"
      }
    ]
  },
  ipadOS: {
    gif: true,
    img_url: ipadOS_url,
    img_article: ipad_article,
    title: "iPad OS",
    description:
      "New UX for Siri, new app management and navigation paradigm inspired by the iPhone X’s, saving elements and much more. iPad OS aspires to use bezel-less screens at their full potential for better productivity.",
    date: "October 2018",
    medium:
      "https://uxdesign.cc/ipad-os-redesigning-siri-and-multitasking-on-the-ipad-pro-in-the-wake-of-the-apple-event-445ac9bacb54",
    credits: "Taken somewhere in Hokkaido, Northern Japan.",
    external_links: [
      {
        main:
          "Gorgeous iOS concept imagines refreshed Siri, Dock, and multitasking for 2018 iPad Pro models",
        website: "9to5Mac",
        link:
          "https://9to5mac.com/2018/10/25/ios-concept-new-siri-dock-multitasking-ipad/"
      },
      {
        main: "iOS sur iPad : voici un nouveau concept plein de bonnes idées",
        website: "iGeneration (FR)",
        link:
          "https://www.igen.fr/ios/2018/10/ios-sur-ipad-voici-un-nouveau-concept-plein-de-bonnes-idees-105712"
      },
      {
        main: "Redesigning Siri and multitasking on the iPad Pro",
        website: "Medium",
        link:
          "https://uxdesign.cc/ipad-os-redesigning-siri-and-multitasking-on-the-ipad-pro-in-the-wake-of-the-apple-event-445ac9bacb54"
      }
    ]
  },
  chatroom: {
    img_article: chatroom_article,
    title: "iMessage",
    description:
      "A new place to enjoy content or work with relatives in real time, new use cases for live collaboration, breaking out of the shell of iMessage, and more. iMessage Chatroom tries to ease live collaboration and sharing on iOS.",
    date: "August 2018",
    medium:
      "https://uxdesign.cc/redesigning-social-interactions-on-ios-with-imessage-17e9c8fa314",
    credits: "On top of Mount Fuji, after a long night hiking.",
    external_links: [
      {
        main: "Redesigning social interactions on iOS with iMessage",
        website: "Medium",
        link:
          "https://uxdesign.cc/redesigning-social-interactions-on-ios-with-imessage-17e9c8fa314"
      }
    ]
  },
  newton: {
    img_article: mac_article,
    title: "macOS",
    description:
      "New window management for the desktop, inspired by the mobile. macOS Newton brings the mobile and the desktop closer than ever.",
    date: "July 2018",
    medium:
      "https://uxdesign.cc/my-attempt-at-redesigning-the-desktop-experience-macos-case-study-99f5f2fb3b10",
    external_links: [
      {
        main: "Redesigning the desktop",
        website: "Medium",
        link:
          "https://uxdesign.cc/my-attempt-at-redesigning-the-desktop-experience-macos-case-study-99f5f2fb3b10"
      }
    ]
  }
};

export default (state = initialState, action) => {
  return state;
};
