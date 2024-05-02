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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              voluptatum velit tempore fugiat perferendis! Voluptatem
              perspiciatis cum laborum, doloribus similique quasi atque odit
              quos laudantium unde obcaecati aliquam. Architecto,
              aspernatur.quasi atque odit quos laudantium unde obcaecati
              aliquam. Architecto, aspernatur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eius voluptatum velit tempore fugiat
              perferendis! Voluptatem perspiciatis cum laborum, doloribus
              similique quasi atque odit quos laudantium unde obcaecati aliquam.
              Architecto, aspernatur.quasi atque odit quos laudantium unde
              obcaecati aliquam. Architecto, aspernatur. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Eius voluptatum velit tempore
              fugiat perferendis! Voluptatem perspiciatis cum laborum, doloribus
              similique quasi atque odit quos laudantium unde obcaecati aliquam.
              Architecto, aspernatur.quasi atque odit quos laudantium unde
              obcaecati aliquam. Architecto, aspernatur.
            </p>
            <img src="/img/mountain.jpg" alt="logo image" />
          </div>
          <div className="son1">
            <h2>02</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              voluptatum velit tempore fugiat perferendis! Voluptatem
              perspiciatis cum laborum, doloribus similique quasi atque odit
              quos laudantium unde obcaecati aliquam. Architecto,
              aspernatur.quasi atque odit quos laudantium unde obcaecati
              aliquam. Architecto, aspernatur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eius voluptatum velit tempore fugiat
              perferendis! Voluptatem perspiciatis cum laborum, doloribus
              similique quasi atque odit quos laudantium unde obcaecati aliquam.
              Architecto, aspernatur.quasi atque odit quos laudantium unde
              obcaecati aliquam. Architecto, aspernatur. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Eius voluptatum velit tempore
              fugiat perferendis! Voluptatem perspiciatis cum laborum, doloribus
              similique quasi atque odit quos laudantium unde obcaecati aliquam.
              Architecto, aspernatur.quasi atque odit quos laudantium unde
              obcaecati aliquam. Architecto, aspernatur.
            </p>
            <img src="/img/mountain.jpg" alt="logo image" />
          </div>
          <div className="son1">
            <h2>03</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              voluptatum velit tempore fugiat perferendis! Voluptatem
              perspiciatis cum laborum, doloribus similique quasi atque odit
              quos laudantium unde obcaecati aliquam. Architecto,
              aspernatur.quasi atque odit quos lauda Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eius voluptatum velit tempore fugiat
              perferendis! Voluptatem perspiciatis cum laborum, doloribus
              similique quasi atque odit quos laudantium unde obcaecati aliquam.
              Architecto, aspernatur.quasi atque odit quos laudantium unde
              obcaecati aliquam. Architecto, aspernatur.ntium unde obcaecati
              aliquam. Architecto, aspernatur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eius voluptatum velit tempore fugiat
              perferendis! Voluptatem perspiciatis cum laborum, doloribus
              similique quasi atque odit quos laudantium unde obcaecati aliquam.
              Architecto, aspernatur.quasi atque odit quos laudantium unde
              obcaecati aliquam. Architecto, aspernatur.
            </p>
            <img src="/img/mountain.jpg" alt="logo image" />
          </div>
          <div className="son1">
            <h2>04</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              voluptatum velit tempore fugiat perferendis! Voluptatem
              perspiciatis cum laborum, doloribus similique quasi atque odit
              quos laudantium unde obcaecati aliquam. Architecto,
              aspernatur.quasi atque odit quos laudantium unde obcaecati
              aliquam. Architecto, aspernatur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eius voluptatum velit tempore fugiat
              perferendis! Voluptatem perspiciatis cum laborum, doloribus
              similique quasi atque odit quos laudantium unde obcaecati aliquam.
              Architecto, aspernatur.quasi atque odit quos laudantium unde
              obcaecati aliquam. Architecto, aspernatur. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Eius voluptatum velit tempore
              fugiat perferendis! Voluptatem perspiciatis cum laborum, doloribus
              similique quasi atque odit quos laudantium unde obcaecati aliquam.
              Architecto, aspernatur.quasi atque odit quos laudantium unde
              obcaecati aliquam. Architecto, aspernatur.
            </p>
            <img src="/img/mountain.jpg" alt="logo image" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Section3;
