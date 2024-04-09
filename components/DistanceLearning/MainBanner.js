import React from "react";
import Link from "next/link";
import { Carousel } from "react-bootstrap";
import { useStatic } from "../../providers/StaticProvider";

const MainBanner = () => {
  const staticData = useStatic();

  return (
    <div className=" ">
      <Carousel interval={3000} pause={false} indicators={true} prevLabel={true} nextLabel={true}>
        {staticData?.data?.banner?.map((b, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-80"
              src={b || "/images/Slide1.png"}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* <div
        className='text-center'
        style={{ position: 'relative', bottom: '45rem', zIndex: '100' }}
      >
        <h1 className='fw-bold text-white'>Go Learning</h1>
        <h1 className='fw-bold text-white'>Achieve Your Dreams</h1>
      </div> */}

      {/* <div className='d-table'>
        <div className='d-table-cell'>
          <div className='container'>
            <div className='banner-wrapper-text'>
              <h1>Build Skills With Experts Any Time, Anywhere</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <Link href='/courses-4'>
                <a className='default-btn'>
                  <i className='flaticon-user'></i>View All Courses<span></span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='banner-shape11'>
        <img src='/images/banner-shape12.png' alt='image' />
      </div>
      <div className='banner-shape12'>
        <img src='/images/banner-shape13.png' alt='image' />
      </div>
      <div className='banner-shape13'>
        <img src='/images/banner-shape14.png' alt='image' />
      </div> */}
    </div>
  );
};

export default MainBanner;
