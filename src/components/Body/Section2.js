import "../../assets/style.css";
import { useRef, useState, useEffect } from "react";

// 화면 노출 관련 js
const Section2 = () => {
  // const [loop, setLoop] = useState(false); // boolean 처리로 참거짓을 나눈다
  const scrollRef1 = useRef(null);
  // const scrollRef2 = useRef(null);
  // const scrollRef3 = useRef(null);
  const [container1, setContainer1] = useState(false);
  // const [container2, setContainer2] = useState(false);
  // const [container3, setContainer3] = useState(false);

  // // const counters = scrollRef;

  const handleScroll = () => {
    // 각각의 요소들의 위치
    const rect = scrollRef1.current.getBoundingClientRect();
    // const rect = scrollRef2.current.getBoundingClientRect();
    // 네비게이션 부분을 제외한 높이
    const winHeight = window.innerHeight;
    // 각가의 요소들의 높이
    const contentHeight = rect.bottom - rect.top; //실제 높이 !! .scroll_on의 부분의 높이값

    if (
      rect.top <= winHeight - contentHeight &&
      rect.bottom >= contentHeight // 역역의 위치가 다들어와서 커질때
    ) {
      setContainer1(true); // css에 있는 .active의 생각대로 추가하겠다
      // setContainer2(true);
      // setContainer3(true);
    } else {
      setContainer1(false); // css에 있는 .active의 생각대로 제거하겠다
      // setContainer2(false);
      // setContainer3(false);
    }
  };

  // 직접 접근하기위한 Ref 사용관련
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section id="section2">
        <div className="scroll_wrap">
          <div
            ref={scrollRef1}
            className={`scroll_on type_bottom ${container1 ? "active" : ""}`}
          >
            <p>안 녕 하 세 요 꼼 빠 뇨 에 이 전 시 입 니 다</p>
          </div>
          <div
          // ref={scrollRef2}
          // className={`scroll_on type_bottom ${container2 ? "active" : ""}`}
          >
            <h1>
              저희는 반려동물과 함께하는 즐거움, 특별함의 서비스를 제공하고
              이웃과의 다양한 모임을 통해 소중한 인연과 추억을 지속적인 유지를
              이어가고 있습니다
            </h1>
          </div>
          <div
          // ref={scrollRef3}
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
