import "../../assets/style.css";
import { useRef, useState, useEffect } from "react";
// 화면 노출 관련 js
const Section2 = () => {
  const [container1, setContainer1] = useState(false);
  //     변수이름    ,   함수이름        초기값을 false로 처리
  // const [container2, setContainer2] = useState(false);
  // const [container3, setContainer3] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      window.addEventListener("scroll", scrollEvent);
    } else {
      window.removeEventListener("scroll", scrollEvent);
    }
  }, [scrollRef.current]);

  const rect = getBoundingClientRect();
  const winHeight = window.innerHeight;
  const contentHeight = rect.bottom - rect.top;

  const scrollEvent = () => {
    const scroll = scrollRef.current.getBoundingClientRect();

    setContainer1(scroll);
  };

  const [Scroll, setSroll] = useState();
  const scrollRef = useRef(null);

  const Section2 = () => {
    const counters = document.querySelectorAll(".scroll_on");
    const exposurePercentage = 100;
    const loop = true;

    const handleScroll = () => {
      counters.forEach((counter) => {
        const rect = counter.getBoundingClientRect();
        const winHeight = window.innerHeight;
        const contentHeight = rect.bottom - rect.top;

        if (
          rect.top <= winHeight - (contentHeight * exposurePercentage) / 100 &&
          rect.bottom >= (contentHeight * exposurePercentage) / 100
        ) {
          console.log("active");
          counter.classList.add("active");
        }

        if (loop && (rect.bottom <= 0 || rect.top >= winHeight)) {
          counter.classList.remove("active");
          console.log("remove");
        }
      });
    };

    document.addEventListener("scroll", handleScroll);
    handleScroll(); // 페이지 로드시 한번 실행
  };

  return (
    <>
      <section id="section2">
        <div className="scroll_wrap">
          <div
            ref={scrollRef}
            className={`scroll_on type_bottom ${container1 ? "active" : ""}`}
          >
            <p>안 녕 하 세 요 꼼 빠 뇨 에 이 전 시 입 니 다</p>
          </div>
          <div
          // ref={scrollRef}
          // className={`scroll_on type_bottom ${container2 ? "active" : ""}`}
          >
            <h1>
              저희는 반려동물과 함께하는 즐거움, 특별함의 서비스를 제공하고
              이웃과의 다양한 모임을 통해 소중한 인연과 추억을 지속적인 유지를
              이어가고 있습니다
            </h1>
          </div>
          <div
          // ref={scrollRef}
          // className={`scroll_on type_bottom ${container3 ? "active" : ""}`}
          >
            <h4>
              다양한 시스템과 커뮤니티를 통해 우리는 보다 최선의 방법을 통해
              최선을 다하고 있습니다 .
            </h4>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section2;
