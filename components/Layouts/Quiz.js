import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import Answers from "../../components/Answers";
import Button from "../../components/Button";
import Result from "../../components/Result";
import Time from "../../components/Time";
import { useCourseDetails } from "../../providers/CourseDetails";
import buttons from "../../styles/Button.module.css";
import quizClasses from "../../styles/Quiz.module.css";
import {
  QuizAttemptCreateEnd,
  QuizAttemptEditEnd,
  QuizAttemptGetEnd,
} from "../../utils/EndPoints";
import Toast from "../../utils/Toast";

export default function Quiz() {
  const [question, setQuestion] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [showAttemptButton, setShowAttemptButton] = useState(true);
  const [duration, setDuration] = useState();
  const [attemptID, setAttemptID] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedAns, setSubmittedAns] = useState([]);
  const [quesAnalysis, setQuesAnalysis] = useState([]);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const [disableQuiz, setDisableQuiz] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const timer = new Date().getTime() + duration * 60000;
  // const timer = new Date().getTime() + 0.15 * 60000
  const activeBar = useCourseDetails();
  const resources = activeBar?.activeBar;
  const qtitle = resources?.title;
  const qdescription = resources?.description;
  const numberOfques = resources?.questions?.length;
  const qduration = resources?.duration;
  // const courseID = resources.
  const [resubmit, setResubmit] = useState(false);

  useEffect(() => {
    const arr = Array(numberOfques).fill(0);
    setDisableQuiz(arr);
    console.log("disable quiz", arr);
  }, [numberOfques]);

  useEffect(() => {
    preAttemptFetch();
  }, [activeBar?.activeBar?.quiz_id, activeBar?.activeBar?._id]);

  useEffect(async () => {
    if (!!question && question?.length > 0 && !!attemptID) {
      let temp = [];

      question.map(
        (ques) =>
          ques?.checked !== undefined &&
          temp.push({ [ques._id]: [ques.checked] })
      );
      let selected_ans = Object.assign({}, ...temp);

      try {
        const res = await axios.put(
          QuizAttemptEditEnd,
          {
            quiz_attempt_id: attemptID,
            submitted: submitted,
            selected_ans,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token"),
            },
          }
        );

        if (res.status === 200) {
          setSubmittedAns((val) => [...temp]);
        } else throw new Error(res?.data?.msg);
      } catch (error) {
        Toast("err", error?.response?.data?.msg || "Try again later!");
      }
    }
  }, [question]);

  const selectedAns = async (q_id, ans_id) => {
    const arr = disableQuiz;
    let index, i;

    for (i = 0; i < question.length; i++) {
      if (question[i]._id === q_id) index = i;
    }
    console.log("index", index);
    arr.splice(index, 1, 1);
    console.log("after splice", arr);
    setDisableQuiz(arr);

    setQuestion(
      question.map((ques) =>
        ques._id === q_id && ques.checked !== ans_id
          ? { ...ques, checked: ans_id }
          : ques._id === q_id && ques.checked === ans_id
          ? { ...ques, checked: null }
          : { ...ques }
      )
    );
  };
  const timeEnd = async (timeUp) => {
    if (timeUp) {
      handleShow();
    }
  };

  const disabled = (q_id)=>{
    let index, i;

    for (i = 0; i < question.length; i++) {
      if (question[i]._id === q_id) index = i;
    }

    if (disableQuiz[index]) return true;
    return false;
  }

  const fetchQuestion = async () => {
    setShowAttemptButton(false);
    setShowPrev(false);
    setSubmitted(false);
    setAttemptID("");
    setSpinner(true);
    try {
      const res = await axios.post(
        QuizAttemptCreateEnd,
        { quiz_id: activeBar?.activeBar?.quiz_id || activeBar?.activeBar?._id },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );

      if (res.status === 200) {
        const receivedData = Object.values(res.data);
        const ques = Object.values(receivedData[1].questions);
        setQuestion(ques);
        setSpinner(false);
        setDuration(receivedData[1].duration);
        setAttemptID(receivedData[1]._id);
        // setTitle(receivedData[1].title)
        // setDesc(receivedData[1].description)
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later!");
    }
  };

  if (submitted) submitAns();
  async function submitAns() {
    let temp = [];

    submittedAns.map(
      (val) =>
        !val[Object.keys(val)].includes(null) &&
        temp.push(Object.assign({}, val))
    );

    let selected_ans = Object.assign({}, ...temp);

    try {
      const res = await axios.put(
        QuizAttemptEditEnd,
        {
          quiz_attempt_id: attemptID,
          submitted: submitted,
          selected_ans,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );

      if (res.status === 200) {
        const receivedData = Object.values(res.data);
        const ques = Object.values(receivedData[1].questions);
        setQuesAnalysis(ques);
        setScore(receivedData[1].total_score);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      // Toast('err', error?.response?.data?.msg || 'Try again later!') // need to fix this
    }
  }

  const preAttemptFetch = async () => {
    try {
      const res = await axios.get(
        QuizAttemptGetEnd +
          `?quiz_id=${
            activeBar?.activeBar?.quiz_id || activeBar?.activeBar?._id
          }`,
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );

      if (res.status === 200 && res?.data?.data) {
        // const receivedData = Object.values(res.data.data)

        const ques = Object.values(res?.data?.data?.questions);
        setSubmittedAns([res?.data?.data?.submitted_ans]);

        setQuesAnalysis(ques);
        setScore(res?.data?.data?.total_score);
        setShowPrev(true);
        setShowAttemptButton(false);
      } else {
        setQuesAnalysis([]);
        setScore(0);
        setShowPrev(false);
        setShowAttemptButton(true);
        throw new Error(res?.data?.msg);
      }
    } catch (error) {
      // Toast('err', error?.response?.data?.msg || 'Try again later!') // need to fix this
    }
  };

  function createMarkup(description) {
    return { __html: description };
  }

  return (
    <div
      className="container"
      style={{ marginBottom: "40px", backgroundColor: "white" }}
    >
      <h2 className="fw-bold">{qtitle}</h2>
      <br />
      <h4 className="fw-bold mb-4">
        {" "}
        <div
          dangerouslySetInnerHTML={createMarkup(qdescription)}
          style={{
            whiteSpace: "wrap",
            overflow: "visible",
            textOverflow: "ellipsis",
            wordBreak: "break-all",
          }}
        />
        {/* <ReadOnly dataa={qdescription} /> */}
      </h4>

      <h5 className="fw-bold mb-4">Quiz Rules</h5>
      {/* infobox starts */}
      <div className={`row ${quizClasses.infobox}`}>
        <div className="col-sm-12 col-md-4">
          <div className="d-flex  align-items-center">
            <div className="col-3">
              <AiOutlineExclamationCircle size={40} />
            </div>
            <div className="col-9">
              Total Questions <br />
              <span style={{ fontWeight: "bolder" }}>{numberOfques}</span>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="d-flex  align-items-center">
            <div className="col-3">
              <AiOutlineExclamationCircle size={40} />
            </div>
            <div className="col-9">
              Mark of Each <br />
              <span style={{ fontWeight: "bolder" }}>1 </span>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-4">
          <div className="d-flex  align-items-center">
            <div className="col-3">
              <BiTimeFive size={40} />
            </div>
            <div className="col-9">
              {!duration ? (
                <span>
                  Duration <br />
                  <span style={{ fontWeight: "bolder" }}>
                    {" "}
                    {qduration + " "}minutes{" "}
                  </span>
                </span>
              ) : submitted ? (
                <span>
                  Answer <br />
                  Submitted
                </span>
              ) : (
                <span>
                  Time left <br />
                  <Time timer={timer} timeEnd={timeEnd} />{" "}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* infobox ends */}
      <div
        className={quizClasses.timer}
        style={{
          backgroundColor: !duration || submitted ? "" : "#262a5b",
          color: "white",
          padding: "10px",
          width: "100px",
          borderRadius: "5px",
          opacity: !duration || submitted ? "0" : "1",
        }}
      >
        {!duration ? (
          <span>
            Duration <br />
            <span style={{ fontWeight: "bolder" }}>
              {" "}
              {qduration + " "}mins{" "}
            </span>
          </span>
        ) : submitted ? (
          <span style={{ display: "none" }}>
            Answer <br />
            Submitted
          </span>
        ) : (
          <span>
            Time left <br />
            <Time timer={timer} timeEnd={timeEnd} />{" "}
          </span>
        )}
      </div>

      {showAttemptButton && (
        <>
          <p>Timer will start as soon as you click. </p>
          <Button className={buttons.normalButton} onClick={fetchQuestion}>
            <span>Start Quiz</span>
          </Button>
        </>
      )}

      {duration && !submitted && (
        <>
          {question.map((q, index) => (
            <div
              key={q._id}
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              <h5 style={{ marginBottom: "1rem" }}>
                {index + 1 + ". " + " " + q.title}
                <br />
              </h5>
              <div>
                {}
                <div
                  dangerouslySetInnerHTML={createMarkup(q.description)}
                  style={{
                    whiteSpace: "wrap",
                    overflow: "visible",
                    textOverflow: "ellipsis",
                    wordBreak: "break-all",
                  }}
                />
                {/* <ReadOnly dataa={q?.description} /> */}
              </div>
              <Answers
                text={q.a}
                onChange={selectedAns}
                disabled={disabled(q._id)}
                a_id="a"
                q_id={q._id}
                checked={q.checked === "a" ? true : false}
              />
              <Answers
                text={q.b}
                onChange={selectedAns}
                disabled={disabled(q._id)}
                a_id="b"
                q_id={q._id}
                checked={q.checked === "b" ? true : false}
              />
              <Answers
                text={q.c}
                onChange={selectedAns}
                a_id="c"
                q_id={q._id}
                disabled={disabled(q._id)}
                checked={q.checked === "c" ? true : false}
              />
              <Answers
                text={q.d}
                onChange={selectedAns}
                disabled={disabled(q._id)}
                a_id="d"
                q_id={q._id}
                checked={q.checked === "d" ? true : false}
              />
            </div>
          ))}
          <Button
            className={buttons.quizSubmitButton}
            onClick={() => setSubmitted(true)}
          >
            <span>Submit Quiz</span>
          </Button>
        </>
      )}

      {submitted && showPrev == false ? (
        <>
          <h3 className="fw-bold">Result Summary</h3>
          {quesAnalysis.length > 0 && (
            <Result
              quesAnalysis={quesAnalysis}
              score={score}
              submittedAns={Object.assign({}, ...submittedAns)}
              retake={() => fetchQuestion()}
            />
          )}
        </>
      ) : (
        showPrev === true && (
          <>
            <h3 className="fw-bold" style={{ marginTop: "50px" }}>
              Previous Attempt
            </h3>
            <Result
              quesAnalysis={quesAnalysis}
              score={score}
              submittedAns={Object.assign({}, ...submittedAns)}
              retake={() => fetchQuestion()}
            />
          </>
        )
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your time is up. Press the button to see result.
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={buttons.normalButton}
            onClick={() => {
              setSubmitted(true);
              setShow(false);
            }}
          >
            Go to Result
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
