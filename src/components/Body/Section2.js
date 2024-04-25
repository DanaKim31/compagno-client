import "../../assets/style.css";
// 화면 노출 관련 js
const Section2 = () => {
  const Section = () => {
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
          counter.classList.add("active"); // css에 있는 .active의 생각대로 추가하겠다
        }

        if (loop && (rect.bottom <= 0 || rect.top >= winHeight)) {
          counter.classList.remove("active"); // css에 있는 .active의 생각대로 제거하겠다
        }
      });
    };
    // 이벤트추가 인데 조건이 있음 (이벤트이름, 함수)
    document.addEventListener("scroll", handleScroll);

    handleScroll(); // 페이지 로드시 한번 실행
  };
  Section(); // Section2 함수 호출
  return (
    <>
      <section id="section2">
        <div className="scroll_wrap">
          <div className="scroll_on type_bottom">
            <p>안 녕 하 세 요 꼼 빠 뇨 에 이 전 시 입 니 다</p>
          </div>
          <div className="scroll_on type_bottom">
            <h1>
              저희는 반려동물과 함께하는 즐거움, 특별함의 서비스를 제공하고
              이웃과의 다양한 모임을 통해 소중한 인연과 추억을 지속적인 유지를
              이어가고 있습니다
            </h1>
          </div>
          <div className="scroll_on type_bottom">
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
