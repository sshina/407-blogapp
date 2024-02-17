import React from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
//import { useState, useEffect, useRef } from "react";
//import { usersInfo, postsData } from "./templatedata.js";
import { cloneDeep } from "lodash";

//temp data to work on functionality before db hosting and calls
const usersInfo = [
  {
    id: 0,
    username: "mud",
    nickname: "mud",
    email: "mud@localhost.com",
    password: "1234asdf",
    bio: "I am mud.",
    external: "",
    icon: 0,
    joindate: 1708022354,
    lastlogin: 1708028354,
    permissions: 1, //tba but 0=none, 1=global admin
  },
  {
    id: 1,
    username: "ghostlyTrickster",
    nickname: "john",
    email: "john@localhost.com",
    password: "asdf1234",
    bio: "i love to play with my hammer",
    external: "picard.ytmnd.com",
    icon: 1,
    joindate: 1708023774,
    lastlogin: 1708028384,
    permissions: 0,
  },
  {
    id: 2,
    username: "tentacleTherapist",
    nickname: "Miss Rose Lalonde",
    email: "rose@localhost.com",
    password: "droptable",
    bio: "Hmm...",
    external: "google.com",
    icon: 2,
    joindate: 1708025774,
    lastlogin: 1708028399,
    permissions: 0,
  },
  {
    id: 3,
    username: "turntechGodhead",
    nickname: "the",
    email: "the@localhost.com",
    password: "turntech",
    bio: "turntech",
    external: "",
    icon: 1,
    joindate: 1708026799,
    lastlogin: 1708027200,
    permissions: 0,
  },
];
const followingInfo = [
  { id_follows: 1, id_is_follwed: 3 },
  { id_follows: 3, id_is_follwed: 1 },
  { id_follows: 3, id_is_follwed: 2 },
  { id_follows: 2, id_is_follwed: 1 },
];
//icons stored as blobs in db
const iconInfo = [
  { id: 0, icon: "mud.png", public: true },
  { id: 1, icon: "fonz.png", public: true },
  { id: 2, icon: "gothic.png", public: false },
];
const postsData = [
  {
    id: 0,
    header: "Hello world",
    html: "<p>I am mud.</p>",
    uploaded: 1708022354,
    lastedit: -1, //-1 or null if unedited
    username: "mud", //username as PK for faster display
  },
  {
    id: 1,
    header: "Hello world 2",
    //html strings should be parsed, file linking will be processed real time i guess
    html: "<p>hi everyone! this is my favorite movie</p><img src={IMAGE_ID = 0} /><p>EDIT: what do you guys think?</p>",
    uploaded: 1708022554,
    lastedit: 1708022670,
    username: "ghostlyTrickster",
  },
];
const likingPostsData = [{ username: "turntechGodhead", postid: 1 }];
const commentsData = [
  {
    id: 0,
    text: "you are a nerd",
    username: "turntechGodhead",
    postid: 1,
    uploaded: 1708022670,
    lastedit: -1,
  },
  {
    id: 1,
    text: "Perhaps there was something I missed, but you did not strike me as a fan.",
    username: "tentacleTherapist",
    postid: 1,
    uploaded: 1708022670,
    lastedit: -1,
  },
];
const tagData = [
  { id: 0, tag: "mud" },
  { id: 1, tag: "movies" },
  {
    id: 2,
    tag: "nic cage",
  },
];
const postHasTagData = [
  {
    post_id: 0,
    tag_id: 0,
  },
  { post_id: 1, tag_id: 1 },
  { post_id: 1, tag_id: 2 },
];
const userImageData = [
  {
    id: 0,
    image: "conair.png",
  },
];
const postHasImageData = [
  {
    post_id: 1,
    username: "ghostlyTrickster",
    image_id: 0,
  },
];
//TBA fill these in
const userVideoData = [];
const postHasVideoData = [];
const userAudioData = [];
const postHasAudioData = [];
const userFileData = [];
const postHasFileData = [];

const epochToDate = (epoch) => {
  let obj = new Date(epoch.toString() * 1000);
  return (
    "" +
    obj.getMonth() +
    "/" +
    obj.getDate() +
    "/" +
    obj.getFullYear() +
    " " +
    obj.getHours() +
    ":" +
    obj.getMinutes() +
    ":" +
    obj.getSeconds()
  );
};

const getUserIcon = (username) => {
  let uslen = usersInfo.length;
  let icolen = iconInfo.length;
  for (let i = 0; i < uslen; i++) {
    if (usersInfo[i].username == username) {
      for (let j = 0; j < icolen; j++) {
        if (iconInfo[j].id == usersInfo[i].icon) {
          return iconInfo[j].icon;
        }
      }
    }
  }
};

const Mainfeed = (props) => {
  const calcLikes = (postId) => {
    let res = 0;
    for (let i = 0; i < likingPostsData.length; i++) {
      if (likingPostsData[i].postid == postId) {
        res++;
      }
    }
    return res;
  };
  const DisplayComments = (props) => {
    let postId = props.id;
    let iterateableComments = [];
    let commentsLen = commentsData.length;
    let count = 0;
    let maxComments = 0;
    for (let i = 0; i < commentsLen; i++) {
      //last ten comments
      if (commentsData[i].postid == postId) {
        if (count < 10) {
          iterateableComments[count] = commentsData[commentsLen - i - 1];
          count++;
        }
        maxComments++;
      }
    }
    return (
      <div>
        <p>
          Comments, {count}/{maxComments}
        </p>
        {iterateableComments.map((obj) => {
          return (
            <div>
              <hr />
              <p>
                Comment from {obj.username} at {epochToDate(obj.uploaded)} :
              </p>
              <img src={"./img/" + getUserIcon(obj.username)} width="50px" />
              <p>{obj.text}</p>
            </div>
          );
        })}
        <hr />
      </div>
    );
  };
  const ParsedHtml = (props) => {
    const getblob = (type, id) => {
      let arr = null;
      console.log(type, id);
      switch (type) {
        case "IMAGE_ID":
          console.log("yup");
          arr = userImageData;
          break;
        case "VIDEO_ID":
          arr = userVideoData;
          break;
        case "AUDIO_ID":
          arr = userAudioData;
          break;
        case "FILE_ID":
          res = userFileData;
          break;
      }
      if (arr == null) return;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
          switch (type) {
            case "IMAGE_ID":
              //FIXME: on db connection this will no longer work
              return "./img/" + arr[i].image;
            default:
              //FIXME
              return;
          }
        }
      }
    };
    let html = props.html;
    let strlen = html.length;
    //go through ALL characters in the string to parse
    for (i = 0; i < strlen; i++) {
      if (html[i] == "{") {
        //so now we know we might have to make some changes here
        let word = "";
        let wordid = "";
        let endword = 0;
        for (j = i; j < strlen; j++) {
          if (html[j] == "}") {
            break;
          }
          if (html[j] == "=") endword = 1;
          if (endword) wordid += html[j];
          else word += html[j];
        }
        //now we know what our word is
        let newinsert = getblob(
          word.substring(1, word.length - 1),
          parseInt(wordid.substring(2)),
        );
        console.log(newinsert);
        html = html.substring(0, i) + newinsert + html.substring(j + 1);
        i = j + 1;
      }
    }
    console.log(html);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };
  const DisplayPosts = () => {
    let iterateablePosts = [];
    let postsLen = postsData.length;
    let cap = postsLen >= 10 ? 10 : postsLen;
    for (let i = 0; i < cap; i++) {
      //last ten posts
      iterateablePosts[i] = postsData[postsLen - i - 1];
      console.log(iterateablePosts[i]);
    }
    return (
      <div>
        <hr />
        {iterateablePosts.map((obj) => {
          return (
            <div>
              <hr />
              <p>
                Post from {obj.username} at {epochToDate(obj.uploaded)}
                {obj.lastedit != -1
                  ? ", edited at " + epochToDate(obj.lastedit)
                  : ""}{" "}
                :
              </p>
              <img src={"./img/" + getUserIcon(obj.username)} width="50px" />
              <h3>{obj.header}</h3>
              <ParsedHtml html={obj.html} />
              <p>Likes: {calcLikes(obj.id)}</p>
              <DisplayComments id={obj.id} />
            </div>
          );
        })}
        <hr />
      </div>
    );
  };
  return (
    <div>
      <p>sup</p>
      <div className="postsContainer">
        <DisplayPosts />
      </div>
    </div>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.h2}>whaddup</Text>
        <View>
          <Text>hello?</Text>
          <Mainfeed user="test" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 8,
    fontSize: 16,
    textAlign: "center",
  },
  h1: {
    margin: 28,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  h2: {
    margin: 16,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
});
