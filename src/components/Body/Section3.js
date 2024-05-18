import "../../assets/style.css";
import { useState, useEffect } from "react";
// 가로 스크롤 !!
const Section3 = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop; // 스크롤 Top값 !!
      setScroll(scrollTop);

      const section2Top = document
        .getElementById("section2")
        .getBoundingClientRect().top;
      const offset = scrollTop - section2Top;

      if (scrollTop > section2Top) {
        document.querySelectorAll(".sec3").forEach((element) => {
          element.style.left = -offset + "px";
        });
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section id="section3" className="page-start">
        <div className="sec3">
          <div className="son1">
            <h2>01</h2>
            <p>
              Compagno는 이탈리아어로 '동료' 또는 '친구'를 의미합니다. <br />{" "}
              <br />
              우리의 사이트는 반려동물을 사랑하는 사람들이 모여 소통하고 정보를
              공유하며, 함께 성장할 수 있는 따뜻한 커뮤니티를 제공합니다.
              Compagno에서는 반려동물에 대한 다양한 정보와 팁을 나누고,
              반려동물과의 소중한 추억을 공유할 수 있습니다. 동물을 위한
              여러가지 서비스를 확인할 수 있습니다.
              <br /> <br /> Compagno는 반려동물을 가족처럼 사랑하는 모든 이들을
              위한 공간입니다. 여기서 여러분은 새로운 친구를 만나고, 서로의
              경험을 나누며, 반려동물과 함께하는 삶을 더욱 풍요롭게 만들어갈 수
              있습니다. 반려동물과의 특별한 동행, Compagno와 함께하세요!
            </p>
            <img src="/img/콤파뇨-1.jpg" alt="logo image" />
          </div>
          <div className="son1">
            <h2>02</h2>
            <p>
              시작하기 앞서, 저는 일상생활을 하면서 우리와 같이 지내며 가족처럼
              여기는 애완동물들을 바라보던중 유기동물 문제에 대해
              생각해보게되었습니다.
              <br />
              <br />
              2022년 기준으로 한국에서 약 11만 3천 마리의 유기동물이 발생하였고.
              이 중 원래 보호자에게 반환된 비율은 12.4%에 불과하고. 자연사와
              안락사 비율은 각각 26.9%와 16.8%로 매우 높습니다. 특히 유기묘의
              경우 반환율이 1.3%로 낮고, 절반 이상이 보호소에서 자연사했습니다.
              개의 반환율이 16.8%인 것과 비교하면 현저히 낮은 수치를 보고.
              <br />
              <br />
              이러한 유기동물의 문제가 매우 심각하며, 더 많은 관심과 노력의
              필요성을 가지게 되었습니다.
            </p>
            <img src="/img/유기동물.png" alt="logo image" />
          </div>
          <div className="son1">
            <h2>03</h2>
            <p>
              우리는 현행 정책과 법의 한계를 보며, 아직도 유기동물 보호가 미비한
              부분들을 채우기 위해. 보호소 환경 개선에 대한 지원 , 사회적 인식
              제고와 교육, 정책 개선을 위한 제안, 그리고 유기동물 보호소와의
              협력을 강화를 생각을 하게 되었습니다.
              <br /> <br />
              이를 통해 유기동물들이 더 나은 환경에서 지내고, 새로운 가정을
              찾아가는 과정을 더욱 원활하게 할 수 있도록 하며. 우리의 목표는
              단순히 유기동물의 수를 줄이는 것에 그치지 않고, 이들이 건강하고
              행복한 삶을 살 수 있도록 하는 것입니다.
              <br /> <br />
              우리는 이렇게 함으로써, 유기동물 대한 같은 마음과 관심을 가진
              분들과 함께 회사를 만들게 되었습니다
            </p>
            <img src="/img/동물보호.jpg" alt="logo image" />
          </div>
          <div className="son1">
            <h2>04</h2>
            <p>
              우리는 Compagno라는 따뜻한 커뮤니티를 통해 반려동물을 사랑하는
              이들이 모여 소통하고 정보를 공유할 수 있는 공간을 제공합니다.
              그러나 한국에서는 매년 약 11만 3천 마리의 유기동물이 발생하며, 이
              중 원래 보호자에게 반환된 비율은 12.4%에 불과합니다. 이러한 상황을
              고려할 때, 우리는 현행 정책과 법의 한계를 보완하고 보호소 환경을
              개선하여 유기동물의 삶을 향상시키는 노력이 필요합니다. 이를 통해
              유기동물들이 더 나은 환경에서 살고, 새로운 가정을 찾아가는 과정이
              원활해질 것입니다. 우리의 목표는 유기동물에 대한 사회적 인식을
              높이고, 정책 개선을 통해 이들의 보호를 강화하는 것입니다. 함께하는
              Compagno의 회원들과 함께, 우리는 유기동물들에게 더 나은 미래를
              제공하기 위해 노력할 것입니다.
            </p>
            <img src="/img/mountain.jpg" alt="logo image" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Section3;
