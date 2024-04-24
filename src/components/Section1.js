import "../assets/style.css";
// import { useState, useEffect } from "react";

// 이미지랑 폰트 관련 등장 JS

const Section1 = () => {
  // 문서가 로드되면 실행하는 함수
  // document.addEventListener("DOMContentLoaded", function () {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.4,
  //   };
  //   // 문서 전체에 해당하는 "D"

  //   // IMAGE ANIMATION
  //   //이미지 애니메이션을 위한
  //   let revealCallback = (entries) => {
  //     entries.forEach((entry) => {
  //       let container = entry.target;

  //       if (entry.isIntersecting) {
  //         // console.log(container);
  //         container.classList.add("animating");
  //         return;
  //       }

  //       if (entry.boundingClientRect.top > 0) {
  //         container.classList.remove("animating");
  //       }
  //     });
  //   };

  //   let revealObserver = new IntersectionObserver(revealCallback, options);

  //   document.querySelectorAll(".reveal").forEach((reveal) => {
  //     revealObserver.observe(reveal);
  //   });

  //   // TEXT ANIMATION
  //   // 텍스트 함수를위한
  //   let fadeupCallback = (entries) => {
  //     entries.forEach((entry) => {
  //       let container = entry.target;
  //       container.classList.add("not-fading-up");

  //       if (entry.isIntersecting) {
  //         container.classList.add("fading-up");
  //         return;
  //       }

  //       if (entry.boundingClientRect.top > 0) {
  //         container.classList.remove("fading-up");
  //       }
  //     });
  //   };

  //   let fadeupObserver = new IntersectionObserver(fadeupCallback, options);

  //   document.querySelectorAll(".fadeup").forEach((fadeup) => {
  //     fadeupObserver.observe(fadeup);
  //   });
  // });

  return (
    <>
      <section id="section1">
        <p className="fadeup">Compagno .</p>
        <h1 className="fadeup">우린 동물를 지키고 사랑합니다</h1>
        <div className="reveal">
          <div className="image-wrap">
            <img src="/img/Section.jpg" alt="logo image" />
            <img src="../assets/images/Section1-2.jpg" alt="" />
            <img src="../assets/images/Section1-3.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Section1;
