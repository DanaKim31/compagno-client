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
            <div
              className="fote1"
              style={{
                textAlign: "center",
                position: "relative",
                top: "30px",
              }}
            >
              <p style={{ fontSize: "3rem", fontWeight: "lighter" }}>
                Stay up to date at all times
              </p>
              <div
                className="sns"
                style={{
                  fontSize: "1.2rem",
                  textDecoration: "none",
                }}
              >
                <a href="">facebook</a>
                <a href="">LinkedinIn</a>
                <a href="">instagram</a>
                <a href="">Youtube</a>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                  width: "39%",
                }}
              >
                <div>
                  <div
                    className="info"
                    style={{
                      display: "inline-block",
                      left: "100px",
                      position: "relative",
                      bottom: "100px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "2rem",
                        textAlign: "center",
                        position: "relative",
                      }}
                    >
                      Navigator
                    </p>
                    <div style={{ display: "inline-grid" }}>
                      <a href="">Home</a>
                      <a href="">User</a>
                      <a href="">Board</a>
                      <a href="">Notice</a>
                      <a href="">Service</a>
                    </div>
                  </div>
                </div>
                <div
                  style={{ position: "relative", top: "100px", height: "40px" }}
                >
                  <p style={{ fontSize: "2rem" }}> Compagno ) </p>
                  <div className="URL">
                    <p>p ) + 603 7985 8288 </p>
                    GitHub :
                    <a
                      href="https://github.com/DanaKim31/compagno-client"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {" "}
                      Client{" "}
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

                {/* 여기는 조원들 이름과 이메일 정보 */}
              </div>
              <div
                style={{
                  position: "relative",
                  top: "43px",
                  left: "40px",
                }}
              >
                <p style={{ fontSize: "2rem" }}></p>
                <div
                  className="person"
                  style={{
                    display: "flex",
                    position: "relative",
                    left: "80px",
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
                <div className="person" style={{ display: "flex" }}>
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
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                // paddingTop: "50px",
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  position: "relative",
                  right: "350px",
                }}
              >
                © 6, Teheran-ro 14-gil, Gangnam-gu, Seoul, Republic of Korea{" "}
              </p>
              <p
                style={{
                  position: "relative",
                  left: "350px",
                }}
              >
                SINCE : 2024 F&B Project
              </p>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
