import "../../assets/style.css";
import { useState, useEffect } from "react";
// 가로 스크롤 !!
const Section3 = () => {
  // useEffect(() => {
  //   window.addEventListener("scroll", function () {
  //     let scroll = window.scrollY;
  //     document.querySelector(".scroll").textContent = scroll;

  //     let offset = scroll - document.getElementById("section2").offsetTop;

  //     if (scroll > document.getElementById("section2").offsetTop) {
  //       document.querySelector(".sec3").style.left = -offset + "px";
  //     }
  //   });
  // }, []);

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
              aliquam. Architecto, aspernatur.
            </p>
            <img
              src="../Compagno/resource/sahin-sezer-dincer-0uWVVuR3nsc-unsplash.jpg"
              alt=""
            />
          </div>
          <div className="son1">
            <h2>02</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              voluptatum velit tempore fugiat perferendis! Voluptatem
              perspiciatis cum laborum, doloribus similique quasi atque odit
              quos laudantium unde obcaecati aliquam. Architecto,
              aspernatur.quasi atque odit quos laudantium unde obcaecati
              aliquam. Architecto, aspernatur.
            </p>
            <img
              src="../Compagno/resource/sahin-sezer-dincer-0uWVVuR3nsc-unsplash.jpg"
              alt=""
            />
          </div>
          <div className="son1">
            <h2>03</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              voluptatum velit tempore fugiat perferendis! Voluptatem
              perspiciatis cum laborum, doloribus similique quasi atque odit
              quos laudantium unde obcaecati aliquam. Architecto,
              aspernatur.quasi atque odit quos laudantium unde obcaecati
              aliquam. Architecto, aspernatur.
            </p>
            <img
              src="../Compagno/resource/sahin-sezer-dincer-0uWVVuR3nsc-unsplash.jpg"
              alt=""
            />
          </div>
          <div className="son1">
            <h2>04</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              voluptatum velit tempore fugiat perferendis! Voluptatem
              perspiciatis cum laborum, doloribus similique quasi atque odit
              quos laudantium unde obcaecati aliquam. Architecto,
              aspernatur.quasi atque odit quos laudantium unde obcaecati
              aliquam. Architecto, aspernatur.
            </p>
            <img
              src="../Compagno/resource/sahin-sezer-dincer-0uWVVuR3nsc-unsplash.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Section3;
