import { useState, useEffect } from "react";

const Home = () => {
  return (
    <>
      <section id="section1">
        <p className="fadeup">Compagno .</p>
        <h1 className="fadeup">우린 동물를 지키고 사랑합니다</h1>
        <div className="reveal">
          <div className="image-wrap">
            <img src="../assets/images/Section1-1.jpg" alt="" />
            <img src="../assets/images/Section1-2.jpg" alt="" />
            <img src="../assets/images/Section1-3.jpg" alt="" />
          </div>
        </div>
      </section>
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
      <section id="section4">
        <div className="container">
          <div className="row row-cols-2">
            <div className="col">
              <h1>동물 등록</h1>
              <img src="" alt="" />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
                accusantium. A minima distinctio deserunt cum quia corrupti
                aspernatur harum, quibusdam beatae voluptas voluptatum
                reiciendis alias, doloribus fuga id laudantium quis?
              </p>
            </div>
            <div className="col">
              <h1>구조 동물</h1>
              <img src="" alt="" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                molestias fugiat, ad exercitationem nobis minima expedita in
                suscipit rem? Error necessitatibus possimus ducimus blanditiis
                quae eveniet assumenda aspernatur nihil temporibus.
              </p>
            </div>
            <div className="col">
              <h1>제품 등록</h1>
              <img src="" alt="" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                deserunt illo quam quibusdam impedit repudiandae, at voluptatum
                quo ratione similique reprehenderit eaque. Exercitationem rerum
                iste deserunt qui quis harum repellat!
              </p>
            </div>
            <div className="col">
              <h1>다양한 게시판</h1>
              <img src="" alt="" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, tempora culpa! Recusandae ab, explicabo debitis
                similique ad ex facilis porro non nostrum! Magni repellat itaque
                hic laboriosam, unde non ea!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="section5">
        <div className="marquee">
          <h1 className="adt">
            <i className="fa-solid fa-arrow-right"></i>Advertisement
          </h1>
          <a href="" className="adtdetail">
            더 많은 사용후기 보기
          </a>
          <div>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
          </div>
        </div>
        <div className="marquee">
          <i className="fa-solid fa-arrow-right"></i>
          <h1 className="odc">
            <i className="fa-solid fa-arrow-right"></i>OneDayclassName
          </h1>
          <a href="" className="odcdetail">
            더 많은 사용후기 보기
          </a>
          <div>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
            <span>
              <img src="../Compagno/resource/김현수.png" alt="" />
            </span>
          </div>
        </div>
      </section>
      <section id="section6">
        <div className="message">
          <div className="content">
            <h1>Messenger</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto nam nisi natus voluptates ea magnam ex. Incidunt
              doloribus quibusdam excepturi? Rerum autem amet iusto quidem
              eveniet labore fugiat dignissimos veniam! Eos culpa corrupti
              eligendi cupiditate, incidunt quia illum asperiores ex distinctio
              debitis placeat unde cum, sapiente assumenda eaque provident natus
              impedit, hic in! Quae eveniet eaque asperiores eos necessitatibus!
              Consequuntur. Debitis aspernatur beatae enim velit suscipit quod
              totam dicta sequi earum repellendus nisi, aliquam recusandae
              ratione at soluta possimus sunt eos odio, quasi libero perferendis
              ipsum! Ex perferendis iste provident. Aperiam ipsam, corrupti
              inventore quisquam a nemo eveniet itaque vero, veniam libero error
              rem nostrum sequi ipsum dignissimos tempora cum architecto
              voluptatibus aliquam suscipit natus consequatur vel recusandae
              quis? Ab.
            </p>
            <a href="">유저들과의 대화를 원하시나요</a>
          </div>
          <div className="photo">
            <img src="../Compagno/resource/setion6 message 세로.jpg" alt="" />
            <img
              src="../Compagno/resource/message 이미지 section6.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
      <footer>
        <section id="section7">
          <div className="text">
            <div>
              <span>
                You spin me right round, baby. Like a record, hello yes
              </span>
            </div>
          </div>
          <div className="footer"></div>
        </section>
      </footer>
    </>
  );
};

export default Home;
