import { useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
  /* background: white;
  border: 1px solid #455c58ff;
  margin-bottom: 16px;
  padding: 0 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px gray; */
  p {
    color: orange;
    font-size: 0.9rem;
  }
`;

function Toast({ setToast, text }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <Div>
      <p>{text}</p>
    </Div>
  );
}

export default Toast;
