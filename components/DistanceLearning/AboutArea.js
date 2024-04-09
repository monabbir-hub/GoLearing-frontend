import React from "react";
import { useStatic } from "../../providers/StaticProvider";
import VideoCarousel from "./VideoCarousel";

const AboutArea = () => {
  const staticData = useStatic();

  const [seeMore, setSeeMore] = React.useState(false);

  if (staticData) {
  }

  return (
    <div className="about-area-three ptb-100">
      <div className="container">
        <div className="row align-items-start">
            <VideoCarousel staticData={staticData} />
        </div>
      </div>

      <div className="shape3">
        <img src="/images/shape3.png" alt="image" />
      </div>
      <div className="shape4">
        <img src="/images/shape4.png" alt="image" />
      </div>
    </div>
  );
};

export default AboutArea;
