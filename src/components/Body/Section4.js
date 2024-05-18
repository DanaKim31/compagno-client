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
              <img
                src="/img/동물등록.jpg"
                alt=""
                style={{ objectFit: "contain" }}
              />
              <p>
                [동물등록 대행기관] <br /> 반려동물 등록을 위한 신뢰할 수 있는
                대행기관을 손쉽게 찾아보세요. <br /> 기관명, 주소, 대표자명 등
                다양한 검색 옵션을 통해 필요한 정보를 빠르게 <br />
                확인할 수 있습니다! <br />
                <br />
                [동물등록 faq] <br /> 동물등록에 대해 궁금한 점이 많으세요? FAQ
                게시판에서 해결하세요! <br /> 자주 묻는 질문을 모아 쉽고 빠르게
                찾아볼 수 있습니다.
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
                  [입양 공고]
                  <br /> 개나 고양이를 키우고 싶다면 유기동물 보호시설에서
                  보호하고 있는 유기동물을 입양하는게 어떨까요? 동물을 입양한
                  당신이 자랑스럽습니다!
                </span>
                <br />
                <br />
                <span>
                  [실종 공고]
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
                <h1>제품 리뷰</h1>
              </div>
              <img
                src="/img/반려동물 용품.jpeg"
                alt="product image"
                style={{ objectFit: "contain" }}
              />
              <p>
                [제품정보 공유] <br />
                반려동물의 제품 후기를 작성할 수 있는 공간입니다.
                <br />
                사랑스러운 반려동물의 제품 후기를 작성하고 모두와 함께 정보를
                공유해보세요!
              </p>
            </div>
            <div className="col">
              <div>
                <h1>다양한 게시판</h1>
              </div>
              <img src="" alt="" />
              <p>
                반려동물과 함께하는 특별한 순간을 공유하고 지역별 반려동물
                친화적 장소, 유용한 정보, 그리고 지역 주민들과 소통 할 수
                있습니다. <br /> 반려동물을 돌보는 전문 펫 시터를 찾거나 다른
                반려동물을 키우는 사람들과 경험을 나누며, 더 나은 반려동물
                생활을 위한 정보를 얻어보세요!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section4;
