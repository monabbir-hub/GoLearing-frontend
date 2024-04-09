import React from 'react'
import { Carousel } from 'react-bootstrap'
import extractYoutubeVideoId from '../../utils/extractYoutubeVideoId'

const VideoCarousel = ({ staticData }) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <Carousel
      interval={null}
      indicators={true}
      prevLabel={true}
      onSlid={(number) => setActiveIndex(number)}
    >
      {staticData?.data?.youtube_video?.map((v, idx) => (
        <Carousel.Item key={idx}>
          <iframe
            style={{
              aspectRatio: '16/9',
            }}
            src={`https://www.youtube.com/embed/${extractYoutubeVideoId(v)}/${
              activeIndex !== idx && 'modestbranding=0'
            }`}
            title='YouTube video player'
            frameBorder={0}
            allow='clipboard-write; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            stopVideo
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default VideoCarousel
