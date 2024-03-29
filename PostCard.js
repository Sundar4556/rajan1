import "./PostCard.css";
import { RxHeartFilled } from "react-icons/rx";
import { RxBookmarkFilled } from "react-icons/rx";
import { RxBookmark } from "react-icons/rx";
import { RxShare2 } from "react-icons/rx";
import { RxHeart } from "react-icons/rx";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsDot } from "react-icons/bs";

import { useData } from "../../Context/dataContext";
import { LikePopover } from "../Popover/LikePopover";
import { useAuth } from "../../Context/authContext";
import { EditMenu } from "../Popover/EditPopover";
import {
  bookmarkPost,
  likePost,
  removeBookmarkedPost,
  unlikePost,
} from "../../AsyncUtilities/dataAsyncHelpers";
import { renderMessageWithLinks, timeOfPost } from "../../../Utils/utils";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { successToast } from "../../../Utils/toast";
import { PostCardPlaceHolder } from "./PostCardPlaceHolder";

export const PostCard = ({ post }) => {
  const [timeDifference, setTimeDifference] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  const {
    dataState: { users, bookmark },
    dataDispatch,
  } = useData();

  const { token, user } = useAuth();
  const findUser = users?.find(({ username }) => username === post?.username);

  const sharePostHandler = () => {
    if (navigator.share) {
      navigator.share({
        text: "Checkout this post from @" + post?.username,
        url: `https://ember-react.netlify.app/post/` + post?._id,
        title: "Ember",
        icon: "https://www.svgrepo.com/show/445730/ember.svg",
      });
    } else {
      navigator.clipboard.writeText(
        "https://ember-react.netlify.app/post/" + post?._id
      );
      successToast("Link Copied");
      if ("vibrate" in navigator) {
        navigator.vibrate(100);
      }
    }
  };

  useEffect(() => {
    setTimeDifference(timeOfPost(post?.updatedAt));
    const interval = setInterval(() => {
      setTimeDifference(timeOfPost(post?.updatedAt));
    }, 10000);
    console.log(post?.updatedAt);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const loadImage = () => {
    const img = new Image();
    img.src = findUser?.avatar;
    img.onload = () => {
      setTimeout(() => {
        setImageLoading(false);
      },500);
    };
  };

  useEffect(() => {
    loadImage();
  }, [findUser]);

  const content = renderMessageWithLinks(post?.content, navigate);

  return (
    <>
      {imageLoading ? (
        <PostCardPlaceHolder />
      ) : (
        <div className="postcard-container">
          <img
            src={findUser?.avatar}
            height="40"
            onClick={() => navigate("/profile/" + post?.username)}
            loading="lazy"
            onLoad={() => setImageLoading(false)}
          />
          <div className="postcard-info-container">
            <div className="postcard-header-flex">
              <div
                className="postcard-info-container-header"
                onClick={() => navigate("/profile/" + post?.username)}
              >
                <span className="header-name">
                  {findUser?.firstName} {findUser?.lastName}
                  <span className="header-name-edit">
                    {post?.edited ? " edited" : ""}
                  </span>
                  <BsDot />
                  <span className="header-name-time">{timeDifference}</span>
                </span>
                <span className="header-username"> @{findUser?.username}</span>
              </div>

              <div className="header-menu">
                {user?.username === post?.username && (
                  <EditMenu
                    content={post?.content}
                    user={user}
                    postId={post?._id}
                    token={token}
                    dispatch={dataDispatch}
                  >
                    <BiDotsHorizontalRounded />
                  </EditMenu>
                )}
              </div>
            </div>
            <div
              className="postcard-info-container-body"
              onClick={() => navigate("/post/" + post?._id)}
            >
              {/* Parsed Content */}
              <div className="postcard-info-container-body-content">
                {content}
              </div>

              {/* <p>{post?.content}</p> */}
            </div>
            <div className="postcard-action-container">
              <div className="postcard-action postcard-action-flex">
                {post?.likes?.likedBy?.some(
                  ({ username }) => username === user?.username
                ) ? (
                  <RxHeartFilled
                    onClick={() => unlikePost(post?._id, token, dataDispatch)}
                  />
                ) : (
                  <RxHeart
                    onClick={() => likePost(post?._id, token, dataDispatch)}
                  />
                )}
                {post?.likes?.likeCount > 0 && (
                  <LikePopover likedBy={post?.likes?.likedBy}>
                    <span className="postcard-action-likeCount">
                      {post?.likes?.likeCount}
                    </span>
                  </LikePopover>
                )}
              </div>
              <div className="postcard-action">
                {bookmark?.some(({ _id }) => _id === post?._id) ? (
                  <RxBookmarkFilled
                    onClick={() =>
                      removeBookmarkedPost(post?._id, token, dataDispatch)
                    }
                  />
                ) : (
                  <RxBookmark
                    onClick={() => bookmarkPost(post?._id, token, dataDispatch)}
                  />
                )}
              </div>
              <div className="postcard-action">
                <RxShare2 onClick={sharePostHandler} />
              </div>
            </div>
          </div>
        </div>
      )}
      <hr className="postcard-hr" />
    </>
  );
};