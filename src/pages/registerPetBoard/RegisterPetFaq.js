import { useState, useEffect } from "react";
import { getRegisterBoardFaqs } from "../../api/registerPetBoard";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;
  width: 90%;
  margin: auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }

  .header {
    display: flex;
    justify-content: center;
    line-height: 80px;
    font-size: 2rem;
    color: #455c58ff;
    border: 3px solid #455c58ff;
    border-radius: 15px;
    margin-bottom: 50px;
  }

  .register {
    width: 80px;
    margin-bottom: 20px;
  }

  .faq-list {
    margin-bottom: 20px;

    .faq-answer {
      display: flex;
      flex-direction: column;
      line-height: 25px;

      .btns {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

const RegisterPetFaq = () => {
  const [faqs, setFaqs] = useState([]);

  const faqsAPI = async () => {
    const result = await getRegisterBoardFaqs();
    setFaqs(result.data);
  };

  useEffect(() => {
    faqsAPI();
  }, []);

  return (
    <Div>
      <h1>동물등록 FAQ</h1>

      <div className="header">동물등록 FAQ</div>

      {/* <Button variant="dark" className="register">
        등록
      </Button> */}
      {faqs?.map((faq) => (
        <Accordion>
          <Accordion.Item
            eventKey="0"
            key={faq.regiFaqCode}
            className="faq-list"
          >
            <Accordion.Header className="faq-question">
              {faq.regiFaqQuestion}
            </Accordion.Header>
            <Accordion.Body className="faq-answer">
              <div>{faq.regiFaqAnswer}</div>
              {/* <div className="btns">
                <button>수정</button>
                <button>삭제</button>
              </div> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </Div>
  );
};

export default RegisterPetFaq;
