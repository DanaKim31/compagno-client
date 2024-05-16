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
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <div>
                <h1 style={{ fontWeight: "lighter" }}>Compagno</h1>
                <p
                  style={{
                    fontSize: "1.2rem",
                    position: "relative",
                    top: "455px",
                    right: "220px",
                  }}
                >
                  © 6, Teheran-ro 14-gil, Gangnam-gu, Seoul, Republic of Korea{" "}
                </p>

                <div className="info">
                  <div
                    className="service"
                    style={{
                      display: "flex",
                      top: "80px",
                      position: "relative",
                      right: "60px",
                    }}
                  >
                    <p style={{ paddingRight: "30px", fontSize: "1.5rem" }}>
                      Navigator
                    </p>
                    <a href="">Home</a>
                    <a href="">User</a>
                    <a href="">Board</a>
                    <a href="">Notice</a>
                    <a href="">Service</a>
                  </div>
                </div>
              </div>

              {/* 여기는 조원들 이름과 이메일 정보 */}
              <div
                className="person"
                style={{ position: "relative", left: "300px" }}
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
              <div className="person">
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
            <div
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <p
                  style={{
                    position: "relative",
                    width: "100%",
                    bottom: "50px",
                    fontSize: "2rem",
                    borderTop: "1px solid",
                    paddingTop: "50px",
                  }}
                >
                  p ) + 603 7985 8288{" "}
                </p>
                <div
                  className="sns"
                  style={{
                    position: "relative",
                    bottom: "25px",
                    fontSize: "1.5rem",
                    paddingBottom: "50px",
                    textDecoration: "none",
                  }}
                >
                  <a href="">facebook</a>
                  <a href="">LinkedinIn</a>
                  <a href="">instagram</a>
                  <a href="">Youtube</a>
                  <p
                    style={{
                      position: "relative",
                      left: "984px",
                      width: "306px",
                      top: "50px",
                    }}
                  >
                    SINCE 2024 F&B Project
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
