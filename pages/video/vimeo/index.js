import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import withProtected from "../../../hooks/withProtected";
import { useRouter } from "next/router";
import axios from "axios";
import {
  VideoVimeoEnd,
} from "../../../utils/EndPoints";

const VideoVimeoGet = () => {
  const [spinner, setSpinner] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const router = useRouter();
  const videoUrlFromQuery = router?.query?.video_url;
  const accessToken = router?.query?.token;

  const hasAccessToken = ((typeof accessToken) === 'string' || accessToken instanceof String) && (accessToken.length > 0)
  const isLoggedIn = ((typeof videoUrl) === 'string' || videoUrl instanceof String) && (videoUrl.length > 0)

  useEffect(() => {
    loadVideoUrl();
  }, [videoUrlFromQuery, hasAccessToken, accessToken]);

  const loadVideoUrl = async () => {
    setSpinner(true);

    try {
      const res = await axios.get(
        VideoVimeoEnd + `?video_url=${videoUrlFromQuery}`,
        {
          headers: {
            "x-access-token": hasAccessToken ? accessToken : localStorage.getItem("x-access-token"),
          },
        }
      );
      if (res.status === 200) {
        const data = res?.data?.data;
        // console.log("data", data);
        setVideoUrl(data?.video_url);
      } else {
        const errorMsg = res?.data?.msg || "Something went wrong, can't load video";
        // console.log("error http", errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      // console.log("error try catch", error?.response?.data?.msg);
      // Toast('err', error?.response?.data?.msg)
    } finally {
      setSpinner(false);
    }
  };

  if (spinner) {
    return (
      <div style={{ display: "flex", backgroundColor: "black", margin: "0px", width: "100vw", height: "100vh", color: "white" }}>
        <Spinner style={{ margin: "auto" }} animation="border" />
      </div>
    );
  } else if (!isLoggedIn) {
    return (
      <div style={{ display: "flex", backgroundColor: "black", margin: "0px", width: "100vw", height: "100vh", color: "white" }}>
        <p style={{ margin: "auto" }}>Please log in to see the video</p>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", backgroundColor: "black", margin: "0px", width: "100vw", height: "100vh", color: "white" }}>
        <iframe
          style={{ margin: "auto" }}
          src={ videoUrl }
          width="100%" height="100%" frameborder="0" allow="fullscreen"
          allowfullscreen></iframe>
      </div>
    );
  }
};

export default VideoVimeoGet;
