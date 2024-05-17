import "../../assets/style.css";

const Section4 = () => {
  return (
    <>
      <section id="section4">
        <div className="container">
          <div
            className="row row-cols-2"
            style={{ position: "relative", bottom: "25px" }}
          >
            <div className="col">
              <div style={{ display: "flex" }}>
                <h1>동물 등록</h1>
              </div>
              <img src="" alt="" />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
                accusantium. A minima distinctio deserunt cum quia corrupti
                aspernatur harum, quibusdam beatae voluptas voluptatum
                reiciendis alias, doloribus fuga id laudantium quis?
              </p>
            </div>
            <div className="col">
              <div>
                <h1>구조 동물</h1>
              </div>
              <img
                src="/img/동물입양메인.png"
                alt="adoption image"
                style={{ objectFit: "contain" }}
              />
              <p>
                <span>
                  [입양 공고 게시판]
                  <br /> 개나 고양이를 키우고 싶다면 유기동물 보호시설에서
                  보호하고 있는 유기동물을 입양하는게 어떨까요? 동물을 입양한
                  당신이 자랑스럽습니다!
                </span>
                <br />
                <br />
                <span>
                  [동물 분실 게시판]
                  <br />
                  동물 분실 관련 정보를 공유하는 공간입니다. 동물보호법상
                  동물소유자가 하는 동물분실신고는 해당 메뉴에서 하시기
                  바랍니다.{" "}
                </span>
              </p>
            </div>
            <div className="col">
              <div>
                {" "}
                <h1>제품 등록</h1>
              </div>
              <img src="" alt="" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                deserunt illo quam quibusdam impedit repudiandae, at voluptatum
                quo ratione similique reprehenderit eaque. Exercitationem rerum
                iste deserunt qui quis harum repellat!
              </p>
            </div>
            <div className="col">
              <div>
                <h1>다양한 게시판</h1>
              </div>
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
    </>
  );
};

export default Section4;
