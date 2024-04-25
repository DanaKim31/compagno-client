import { useState, useEffect } from "react";
import { getRegisterBoardFaqs } from "../../api/registerPetBoard";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const Div = styled.div`
  width: 90%;
  margin: auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
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
      align-items: flex-end;
      line-height: 25px;
      .btn {
        width: 80px;
        margin-left: 10px;
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
      <Button variant="dark" className="register">
        등록
      </Button>
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
              {faq.regiFaqAnswer}
              <div className="btns">
                <Button variant="outline-dark" className="btn edit">
                  수정
                </Button>
                <Button variant="outline-warning" className="btn delete">
                  삭제
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </Div>
  );
};

export default RegisterPetFaq;
