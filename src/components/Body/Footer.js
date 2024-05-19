import "../../assets/style.css";

const Footer = () => {
  return (
    <>
      <footer>
        <section id="section7">
          <div className="text">
            <div>
              <span
                style={{
                  fontFamily: "TAEBAEKmilkyway",
                  color: "rgb(67,95,87)",
                }}
              >
                We always remember animals as my friends and only family
              </span>
            </div>
          </div>

          <div className="footer">
            <p
              className="com"
              style={{
                fontSize: "3.5rem",
                position: "absolute",
                transform: "rotate(270deg)",
                bottom: "165px",
                left: "-100px",
              }}
            >
              {" "}
              Compagno ){" "}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div style={{}}>
                <div>
                  <div>
                    <div className="URL" style={{ display: "flex" }}>
                      <p
                        style={{
                          fontSize: "2rem",
                          position: "absolute",
                          bottom: "310px",
                          left: "128px",
                        }}
                      >
                        Development-related Code Information
                      </p>
                      <p
                        style={{
                          position: "relative",
                          top: "135px",
                          left: "120px",
                        }}
                      >
                        p ) + 603 7985 8288{" "}
                      </p>
                      <p
                        style={{
                          position: "relative",
                          top: "135px",
                          left: "190px",
                        }}
                      >
                        {" "}
                        GitHub :{" "}
                      </p>
                      <a
                        href="https://github.com/DanaKim31/compagno-client"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Client{" "}
                      </a>

                      <a
                        href="https://github.com/DanaKim31/compagno-server"
                        style={{
                          textDecoration: "none",
                          color: "white",
                          position: "relative",
                          left: "220px",
                        }}
                      >
                        {" "}
                        Sever{" "}
                      </a>
                    </div>
                  </div>
                  <div
                    className="info"
                    style={{
                      position: "relative",
                      top: "180px",
                      left: "90px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      Navigator
                    </p>
                    <div style={{}} className="navi">
                      <a href="/compagno">Home</a>
                      <a href="/compagno/mypage/myinfo">User</a>
                      <a href="/compagno/userQna">Board</a>
                      <a href="/compagno/notice-board">Notice</a>
                      <a href="/compagno/sitterBoard">Service</a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  top: "80px",
                }}
              >
                <div
                  className="person"
                  style={{
                    display: "flex",
                    position: "relative",
                    left: "140px",
                  }}
                >
                  <div>
                    <a href="https://github.com/DanaKim31">김다은 : GitHub ></a>
                    <p>E-mail : danakim731@gmail.com</p>
                  </div>
                  <div>
                    <a href="https://github.com/sohnminjeong">
                      손민정 : GitHub >
                    </a>
                    <p>E-Mail : sonmj0424@naver.com</p>
                  </div>
                  <div>
                    <a href="https://github.com/gwon428">권예빈 : GitHub ></a>
                    <p>E-mail : danakim731@gmail.com</p>
                  </div>
                </div>
                <div
                  className="person"
                  style={{
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <div>
                    <a href="https://github.com/SHLee334">이상현 : GitHub ></a>
                    <p>E-Mail : yogu970126@gmail.com</p>
                  </div>
                  <div>
                    <a href="https://github.com/jungdj221">정동준 : GitHub ></a>
                    <p>E-Mail : jungdj2002@gmail.com</p>
                  </div>
                  <div>
                    <a href="https://github.com/JeongHoeYeong">
                      정회영 : GitHub >
                    </a>
                    <p>E-Mail : ghldud5@gmail.com</p>
                  </div>
                  <div>
                    <a href="https://github.com/hnsso">김현수 : GitHub ></a>
                    <p>E-Mail : kjwgustn123@naver.com</p>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "140px",
                    transform: "rotate(90deg)",
                    right: "-100px",
                    fontSize: "4rem",
                  }}
                  className="barCode"
                >
                  ||||||||||||||
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                top: "120px",
                position: "relative",
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  position: "relative",
                  left: "50px",
                }}
              >
                © 6, Teheran-ro 14-gil, Gangnam-gu, Seoul, Republic of Korea{" "}
              </p>
              <div
                className="fote1"
                style={{
                  position: "relative",
                }}
              >
                <div
                  className="sns"
                  style={{
                    fontSize: "1.2rem",
                    textDecoration: "none",
                    width: "100vh",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <a
                    href="https://www.facebook.com/?locale=ko_KR"
                    className="sn"
                  >
                    facebook
                  </a>
                  <a href="https://kr.linkedin.com/" className="sx">
                    LinkedinIn
                  </a>
                  <a href="https://www.instagram.com/" className="s">
                    instagram
                  </a>
                  <a
                    href="https://www.youtube.com/?app=desktop&hl=ko&gl=KR"
                    className="s"
                  >
                    Youtube
                  </a>
                </div>
              </div>
              <div>
                <p
                  style={{
                    position: "relative",
                    right: "50px",
                  }}
                >
                  SINCE : 2024 F&B Project
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
