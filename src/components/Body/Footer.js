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
                // paddingTop: "50px",
              }}
            >
              <div
                style={
                  {
                    // display: "flex",
                    // justifyContent: "space-between",
                    // textAlign: "center",
                    // width: "39%",
                  }
                }
              >
                <div>
                  <div
                  // style={{ position: "relative", top: "100px", height: "40px" }}
                  >
                    <div className="URL">
                      <p
                        style={{
                          fontSize: "2rem",
                          position: "absolute",
                          bottom: "310px",
                        }}
                      >
                        Development-related Code Information
                      </p>
                      <p style={{ position: "relative", top: "120px" }}>
                        p ) + 603 7985 8288{" "}
                      </p>

                      <a
                        href="https://github.com/DanaKim31/compagno-client"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        GitHub : Client{" "}
                      </a>
                      <a
                        href="https://github.com/DanaKim31/compagno-server"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        {" "}
                        / Sever{" "}
                      </a>
                    </div>
                  </div>
                  <div
                    className="info"
                    style={{
                      position: "relative",
                      top: "150px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      Navigator
                    </p>
                    <div
                      style={
                        {
                          // display: "inline-grid",
                        }
                      }
                      className="navi"
                    >
                      <a href="">Home</a>
                      <a href="">User</a>
                      <a href="">Board</a>
                      <a href="">Notice</a>
                      <a href="">Service</a>
                    </div>
                  </div>
                </div>

                {/* 여기는 조원들 이름과 이메일 정보 */}
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
                    right: "140px",
                  }}
                >
                  <p>
                    김다은 / DanaKim
                    <br />T +010-xxxx-xxxx <br />
                    kh123@naver.com
                  </p>
                  <p>
                    손민정
                    <br />T +010-xxxx-xxxx <br />
                    kh123@naver.com
                  </p>
                  <p>
                    권예빈
                    <br />T +010-xxxx-xxxx <br />
                    kh123@naver.com
                  </p>
                </div>
                <div
                  className="person"
                  style={{
                    display: "flex",
                    position: "relative",
                    bottom: "20px",
                  }}
                >
                  <p>
                    이상현
                    <br />T +010-xxxx-xxxx <br />
                    kh123@naver.com
                  </p>
                  <p>
                    정동준
                    <br />T +010-xxxx-xxxx <br />
                    kh123@naver.com
                  </p>
                  <p>
                    정회영
                    <br />T +010-xxxx-xxxx <br />
                    kh123@naver.com
                  </p>
                  <p>
                    김현수
                    <br />T +010-xxxx-xxxx <br />
                    kh123@naver.com
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "180px",
                    transform: "rotate(90deg)",
                    right: "-190px",
                    fontSize: "4rem",
                  }}
                >
                  ||||||||||||||||
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                top: "85px",
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
                  // textAlign: "center",
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
                  <a href="">facebook</a>
                  <a href="">LinkedinIn</a>
                  <a href="">instagram</a>
                  <a href="">Youtube</a>
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
