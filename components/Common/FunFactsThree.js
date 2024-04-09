import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const FunFactsThree = () => {
  // const [statData, setStatData] = useState({})
  // useEffect(() => {
  //   getStat()
  // }, [])

  // const getStat = async () => {
  //   try {
  //     const res = await axios.get(GetReportEnd, {
  //       headers: {
  //         'go-learning': localStorage.getItem('go-learning'),
  //       },
  //     })

  //     if (res.status === 200) {
  //       setStatData(res?.data)
  //     }
  //   } catch (error) {}
  // }

  return (
    <div className="funfacts-area-two">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="single-funfacts">
              <img src="/images/funfacts-shape2.png" alt="image" />
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <div style={{ height: "3.4rem" }}>
                    {isVisible ? (
                      <CountUp
                        start={0}
                        end={400}
                        duration={1.1}
                        suffix="+"
                        separator=","
                        style={{
                          color: "#F8B03C",
                          fontSize: "2.4em",
                          fontWeight: "800",
                        }}
                        className="counter d-block"
                      />
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
              {/* <h3>500</h3> */}
              <p>Video Tutorial</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="single-funfacts">
              <img src="/images/funfacts-shape2.png" alt="image" />
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <div style={{ height: "3.4rem" }}>
                    {isVisible ? (
                      <CountUp
                        start={0}
                        end={80}
                        duration={1.1}
                        separator=","
                        suffix="+"
                        style={{
                          color: "#F8B03C",
                          fontSize: "2.4em",
                          fontWeight: "800",
                        }}
                        className="counter d-block"
                      />
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
              {/* <h3>2,000</h3> */}
              <p>Quiz</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="single-funfacts">
              <img src="/images/funfacts-shape2.png" alt="image" />
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <div style={{ height: "3.4rem" }}>
                    {isVisible ? (
                      <CountUp
                        start={0}
                        end={30}
                        duration={1.1}
                        separator=","
                        suffix="+"
                        style={{
                          color: "#F8B03C",
                          fontSize: "2.4em",
                          fontWeight: "800",
                        }}
                        className="counter d-block"
                      />
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
              <p>Mentors</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="single-funfacts">
              <img src="/images/funfacts-shape2.png" alt="image" />
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <div style={{ height: "3.4rem" }}>
                    {isVisible ? (
                      <CountUp
                        start={0}
                        end={1200}
                        duration={1.1}
                        separator=","
                        suffix="+"
                        style={{
                          color: "#F8B03C",
                          fontSize: "2.4em",
                          fontWeight: "800",
                        }}
                        className="counter d-block"
                      />
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
              <p>Students</p>
            </div>
          </div>

          {/* <div className='col-lg-3 col-md-3 col-sm-6 '>
            <div className='single-funfacts'>
              <img src='/images/funfacts-shape2.png' alt='image' />
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <div>
                    {isVisible ? (
                      <CountUp
                        start={0}
                        end={2000}
                        duration={1.1}
                        separator=','
                        style={{
                          color: '#F8B03C',
                          fontSize: '2.4em',
                          fontWeight: '800',
                        }}
                        className='counter d-block'
                      />
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
              <p>Students</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FunFactsThree;
