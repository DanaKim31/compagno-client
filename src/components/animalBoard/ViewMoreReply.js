import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ReplyComment from "./ReplyComment";

const ViewMoreReply = ({
  comment,
  receiveComments,
  boardAuthor,
  currentUser,
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
              <button
                className="repl-toggle-button"
                onClick={() => onRepl(comment)}
              >
                더보기 <IoIosArrowUp className="repl-toggle" />
              </button>
            </>
          ) : (
            <>
              {responseReply.animalCommentCode === undefined ? (
                <>
                  <button
                    className="repl-toggle-button"
                    onClick={() => onRepl(comment)}
                  >
                    더보기 <IoIosArrowUp className="repl-toggle" />
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    className="repl-toggle-button"
                    onClick={() => onRepl(comment)}
                  >
                    줄이기 <IoIosArrowDown className="repl-toggle" />
                  </button>
                  <ReplyComment
                    replies={comment.replies}
                    receiveComments={() => receiveComments()}
                    boardAuthor={boardAuthor}
                    currentUser={currentUser}
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
