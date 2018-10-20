import mogi_url from '../img/Mogi.jpeg';
import chatroom_url from '../img/Chatroom_Thumbnail.jpg';
import mac_url from '../img/MacOS.jpg';
import youtube_url from '../img/Youtube.jpg';

const initialState = {
  mogi: {
    img_url: mogi_url,
    ready: true,
    title: "iOS Mogi",
    description: "Non-intrusive Siri with contextual awareness, new accessibility features, a clipboard manager, contextual awareness in Apple Maps, Live Notifications, and much more. iOS Mogi is all about mobile multitasking and context preservation.",
    date: "August 2018",
    medium: "https://uxdesign.cc/redesigning-siri-and-adding-multitasking-features-to-ios-70c2f1a1569b",
    reddit: "https://www.reddit.com/r/apple/comments/947yrm/redesigning_siri_and_adding_multitasking_features/?utm_content=comments&utm_medium=user&utm_source=reddit&utm_name=frontpage",
    publishers: {
      "ninetofivemac": {
        publisher: "9TO5Mac",
        link: "https://9to5mac.com/2018/08/03/siri-concept-non-intrusive-multitasking-ios/",
        title: "Beautiful Siri concept imagines ‘parallel help’ ditching full-screen takeover, reinvents iOS multitasking"
      },
      macrumors: {
        publisher: "MacRumors",
        link: "https://www.macrumors.com/2018/08/03/ios-concept-reimagines-siri/",
        title: "iOS Concept Reimagines Siri With Non-Intrusive UI, Contextual Awareness, and More"
      }
    }
  },
  chatroom: {
    img_url: chatroom_url,
    ready: true,
    title: "iMessage Chatroom",
    description: "A new place to enjoy content or work with relatives in real time, new use cases for live collaboration, breaking out of the shell of iMessage, and more. iMessage Chatroom tries to ease live collaboration and sharing on iOS.",
    date: "August 2018",
    medium: "https://uxdesign.cc/redesigning-social-interactions-on-ios-with-imessage-17e9c8fa314",
  },
  newton: {
    img_url: mac_url,
    ready: false,
    title: "macOS Newton",
    description: "New window management for the desktop, inspired by the mobile. macOS Newton brings the mobile and the desktop closer than ever.",
    date: "July 2018",
    medium: "https://uxdesign.cc/my-attempt-at-redesigning-the-desktop-experience-macos-case-study-99f5f2fb3b10",
  },
  youtube: {
    img_url: youtube_url,
    ready: false,
    title: "Youtube 2.0",
    description: "A better homepage with a big emphasis on recommendations, picture-in-picture for the desktop, Instant Playlists, clear labelling in the video panel, digital wellbeing and much more. Youtube 2.0 vows to deliver a modern and intuitive experience to all its users.",
    date: "June 2018",
    medium: "https://uxdesign.cc/my-attempt-at-redesigning-youtube-for-a-more-intuitive-and-modern-experience-dbd7707c135c",
  },
};

export default (state = initialState, action) => {
  return state;
};
