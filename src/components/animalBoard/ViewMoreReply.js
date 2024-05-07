import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ReplyComment from "./ReplyComment";
import styled from "styled-components";

const Button = styled.button`
  color: rgb(244, 245, 219);
  background-color: rgb(70, 92, 88);
`;

const ViewMoreReply = ({
  comment,
  receiveComments,
  boardAuthor,
  currentUser,
  countCommentAPI,
}) => {
  // 대댓글 토글
  const [replToggle, setReplToggle] = useState(true);
  const [responseReply, setResponseReply] = useState({ comment });
  //   const [prevReply, setprevReply] = useState({});
  //   setResponseReply(comment);
  console.log(replToggle);
  const onRepl = async (comment) => {
    console.log(comment.animalCommentCode);
    setResponseReply(comment);
    if (replToggle) {
      setReplToggle(false);
    } else {
      setReplToggle(true);
    }
  };
  return (
    <>
      {comment.replies.length === 0 ? (
        <></>
      ) : (
        <>
          {replToggle &&
          responseReply.animalCommentCode === comment.animalCommentCode ? (
            <>
              <Button
                className="repl-toggle-button"
                onClick={() => onRepl(comment)}
              >
                더보기 <IoIosArrowUp className="repl-toggle" />
              </Button>
            </>
          ) : (
            <>
              {responseReply.animalCommentCode === undefined ? (
                <>
                  <Button
                    className="repl-toggle-button"
                    onClick={() => onRepl(comment)}
                  >
                    더보기 <IoIosArrowUp className="repl-toggle" />
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    className="repl-toggle-button"
                    onClick={() => onRepl(comment)}
                  >
                    줄이기 <IoIosArrowDown className="repl-toggle" />
                  </Button>
                  <ReplyComment
                    replies={comment.replies}
                    receiveComments={() => receiveComments()}
                    boardAuthor={boardAuthor}
                    currentUser={currentUser}
                    countCommentAPI={() => countCommentAPI()}
                  />
                </>
              )}

              {/* </>
              )} */}
            </>
          )}
        </>
      )}
    </>
  );
};
export default ViewMoreReply;
