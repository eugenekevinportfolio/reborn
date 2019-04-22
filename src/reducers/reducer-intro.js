const initialState = [
  {
    content:
      "The past few years have been extremely enriching, both professionally and humanly.",
    show: false,
    disappear: false
  },
  {
    content:
      "Two years ago, I was living in Japan. I stayed there for almost a year.",
    show: false,
    disappear: false
  },
  {
    content:
      "During that time, I worked in a startup as designer and developer.",
    show: false,
    disappear: false
  },
  {
    content:
      "I learned so much in design and code, and released an app for iPhone and iPad in less than three months.",
    show: false,
    disappear: false
  },
  {
    content:
      "This app is still in use today in Tokyo, in famous stores like Louis Vuitton's among others.",
    show: false,
    disappear: false
  },
  {
    content:
      "When I came back, I decided to finish my studies with something completely different than my previous studies.",
    show: false,
    disappear: false
  },
  {
    content:
      "I entered HEC Paris, the world’s leading business school, to broaden my knowledge in business, communication, and management.",
    show: false,
    disappear: false
  },
  {
    content:
      "After my graduation last year, I worked my way to become a professional designer.",
    show: false,
    disappear: false
  },
  {
    content: "I decided to publish a few of my ideas on Medium.",
    show: false,
    disappear: false
  },
  {
    content: "Each of the article received great feedback.",
    show: false,
    disappear: false
  },
  {
    content:
      "Some of them even got published by great American tech journalism websites, like 9to5Mac.",
    show: false,
    disappear: false
  },
  {
    content: "This website is a portfolio of these articles.",
    show: false,
    disappear: false
  },
  {
    content: "If you liked one of them, shoot me an email!",
    show: false,
    disappear: false
  },
  {
    content:
      "I am always eager to receive feedback that helps me grow as designer and human.",
    show: false,
    disappear: false
  },
  {
    content: "Say Hi!",
    show: false,
    disappear: false
  }
];

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_INTRO":
      return state.map((item, index) => {
        if (index !== action.index) {
          return item;
        }
        return {
          ...item,
          show: action.payload
        };
      });
    case "DISAPPEAR_INTRO":
      return state.map((item, index) => {
        if (index !== action.index) {
          return item;
        }
        return {
          ...item,
          disappear: action.payload
        };
      });
  }
  return state;
};
