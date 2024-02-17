const usersInfo = {
  mud: {
    nick: "Mud",
    email: "mud@localhost.com",
    password: "1234asdf",
    bio: "I am mud.",
    icon: "mud.png",
    admin: true,
    joindate: 1708022354,
    lastlogin: 1708028354,
  },
  ghostlyTrickster: {
    nick: "john",
    email: "john@localhost.com",
    password: "asdf1234",
    bio: "i love to play with my hammer",
    icon: "slimer.png",
    admin: false,
    joindate: 1708023774,
    lastlogin: 1708028384,
  },
  tentacleTherapist: {
    nick: "Miss Rose Lalonde",
    email: "rose@localhost.com",
    password: "droptable",
    bio: "Hmm...",
    icon: "evilsquiddle.png",
    admin: false,
    joindate: 1708025774,
    lastlogin: 1708028399,
  },
  turntechGodhead: {
    nick: "the",
    email: "the@localhost.com",
    password: "turntech",
    bio: "turntech",
    icon: "turntech.png",
    admin: true,
    joindate: 1708026799,
    lastlogin: 1708027200,
  },
};

const postsData = {
  0: {
    author: "mud",
    title: "I am mud.",
    rawHtml: "I am mud.",
    likecount: 1,
    comments: [{ author: "ghostlyTrickster", text: "great moves!" }],
  },
  1: {
    author: "ghostlyTrickster",
    title: "hello world",
    rawHtml:
      "this is my favorite movie <br /><img src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' />",
    likecount: 2,
    comments: [],
  },
  2: {
    author: "ghostlyTrickster",
    title: "also this!",
    rawHtml: "what the heck...",
    likecount: 0,
    comments: [
      {
        author: "tentacleTherapist",
        text: "You fell off",
      },
      { author: "mud", text: "I am mud." },
    ],
  },
  3: {
    author: "ghostlyTrickster",
    title: "hello world 2 electric boogaloo",
    rawHtml: "this is also my favorite movie",
    likecount: 0,
    comments: [
      {
        author: "turntechGodhead",
        text: "I am turntechGodhead.",
      },
    ],
  },
};

const isFollowing = {}; //tba
