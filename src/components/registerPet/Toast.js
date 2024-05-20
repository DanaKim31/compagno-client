import { useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
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
