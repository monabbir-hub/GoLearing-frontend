import React, { useEffect, useState } from "react";
import buttons from "../styles/Button.module.css";
import Answers from "./Answers";
import Button from "./Button";
import { Spinner } from "react-bootstrap";
function Result({ quesAnalysis, score, submittedAns, retake }) {
  const [question, setQuestion] = useState([]);
  const [spinner, setSpinner] = useState(true);

  function createMarkup(description) {
    return { __html: description };
  }
  useEffect(() => {
    setTimeout(myFunction, 3000);
  }, []);

  const myFunction = () => {
    setSpinner(false);
  };
  return (
    // <></>
    <div>
      {/* {spinner && (
        <div className="my-5 py-5 text-center">
          <Spinner animation="border" />
        </div>
      )} */}

      {quesAnalysis.length > 0 && !spinner ? (
        <>
          <div className="">
            {/* <AiOutlineExclamationCircle size={40} /> */}
            <h5 style={{ color: "red" }}>Total Score: {score} </h5>
          </div>

          {quesAnalysis.map((q, index) => (
            <div
              key={q._id}
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              <h5 style={{ marginBottom: "1rem" }}>
                {index + 1 + ". " + " " + q.title}
                <br />

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
              </h5>
              <Answers
                text={q.a}
                // onClick={selectedAns}
                a_id="a"
                q_id={q._id}
                disabled={true}
                ansType={`${
                  q.right_ans[0] === "a"
                    ? "correct"
                    : submittedAns[q._id] == "a" && q.status === false
                    ? "wrong"
                    : null
                }`}
                checked={submittedAns[q._id] == "a" ? true : false}
                // ansType={`${q.right_ans === q.a ? 'correct' : null}`}
              />
              <Answers
                text={q.b}
                // onClick={selectedAns}
                a_id="b"
                q_id={q._id}
                disabled={true}
                ansType={`${
                  q.right_ans[0] === "b"
                    ? "correct"
                    : submittedAns[q._id] == "b" && q.status === false
                    ? "wrong"
                    : null
                }`}
                checked={submittedAns[q._id] == "b" ? true : false}
              />
              <Answers
                text={q.c}
                // onClick={selectedAns}
                a_id="c"
                q_id={q._id}
                disabled={true}
                ansType={`${
                  q.right_ans[0] === "c"
                    ? "correct"
                    : submittedAns[q._id] == "c" && q.status === false
                    ? "wrong"
                    : null
                }`}
                checked={submittedAns[q._id] == "c" ? true : false}
              />
              <Answers
                text={q.d}
                // onClick={selectedAns}
                a_id="d"
                q_id={q._id}
                disabled={true}
                ansType={`${
                  q.right_ans[0] === "d"
                    ? "correct"
                    : submittedAns[q._id] == "d" && q.status === false
                    ? "wrong"
                    : null
                }`}
                checked={submittedAns[q._id] == "d" ? true : false}
              />
            </div>
          ))}
        </>
      ) : (
        <div className="my-5 py-5 text-center">
          <Spinner animation="border" />
        </div>
      )}
      {!spinner && retake && (
        <Button className={buttons.quizSubmitButton} onClick={retake}>
          Retake Quiz
        </Button>
      )}
    </div>
  );
}

export default Result;
