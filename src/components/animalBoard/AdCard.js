import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
const Div = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  margin: 10px;
  width: 380px;
  height: 310px;
  padding: 10px 15px 10px 15px;
  box-shadow: 5px 5px 5px 1px lightgrey;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15px;
    background-color: green;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .ad-boardSpan {
    padding-left: 8px;
  }
  .ad-price {
    padding-left: 8px;
  }
  .ad-category {
    color: green;
    font-weight: bold;
    font-size: 2rem;
  }
  .ad-content-container {
    border: 1px solid lightgrey;
    border-radius: 15px;
    padding: 5px;
    height: 85px;
    margin: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ad-profile-container {
    font-size: 1.5rem;
    font-weight: bold;
    img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
  .getDetailBoard {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: underline;
    &:hover {
      color: green;
      cursor: pointer;
    }
  }
  .image-container {
    img {
      border-radius: 10px;
      width: 345px;
      height: 200px;
      object-fit: scale-down;
    }
  }
`;
const AdCard = ({ adDetail }) => {
  const nagivate = useNavigate();
  const [ad, setAd] = useState(null);
  const [boolean, setBoolean] = useState(true);
  const star = (no) => {
    const result = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= no) {
        result.push(<FaStar color="orangered" key={i} />);
      } else if (i > no) {
        if (i - no === 0.5) {
          result.push(<FaStarHalfAlt color="orangered" key={i} />);
        } else {
          result.push(<FaRegStar color="orangered" key={i} />);
        }
      }
    }
    return result;
  };
  const getProduct = (code) => {
    nagivate("/compagno/product-board/" + code);
  };
  useEffect(() => {
    // console.log(adDetail);
    setAd(adDetail);
  }, []);
  return (
    <Div
      onMouseEnter={() => setBoolean(false)}
      onMouseLeave={() => setBoolean(true)}
    >
      {boolean ? (
        <>
          <span className="ad-category">
            <FaQuoteLeft style={{ "font-size": "1.5rem" }} />
            &nbsp;&nbsp;
            {ad?.animalCategory.animalType}
          </span>
          <div>
            <span className="ad-boardSpan">{star(ad?.productBoardGrade)}</span>
            <br />
            <span className="ad-price">
              {ad?.productPrice.toLocaleString("ko-KR")}원
            </span>
            <div className="ad-content-container">
              <span className="ad-content">{ad?.productBoardContent}</span>
            </div>
          </div>
          <div className="ad-profile-container">
            <img
              className="userImage"
              src={"http://192.168.10.28:8081/" + ad?.user.userImg}
            />
            {ad?.user?.userNickname}
          </div>
        </>
      ) : (
        <>
          <div className="image-container">
            {ad?.productMainImage === null ? (
              <>미리보기 이미지가 없습니다!</>
            ) : (
              <>
                <img
                  src={"http://192.168.10.28:8081/" + ad?.productMainImage}
                />
              </>
            )}
          </div>

          <span className="ad-boardSpan">{star(ad?.productBoardGrade)}</span>
          <br />
          <span
            className="getDetailBoard"
            onClick={() => getProduct(ad?.productBoardCode)}
          >
            자세히 보기!
          </span>
        </>
      )}
    </Div>
  );
};
export default AdCard;
