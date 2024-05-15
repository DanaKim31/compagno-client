import "../../assets/style.css";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
const Footer = () => {
  return (
    <>
      <footer>
        <section id="section7">
          <div className="text">
            <div>
              <span>You spin me right round, baby. Like a record, hello y</span>
            </div>
          </div>
          <div className="footer">
            <div>
              <h1>Compagno</h1>
              <h3>© 2024 Seoul Developmemt</h3>
              <p></p>
              <div className="sns">
                <a href="">
                  <FaFacebookF className="i" />
                </a>
                <a href="">
                  <FaLinkedinIn className="i" />
                </a>
                <a href="">
                  <FaInstagram className="i" />
                </a>
                <a href="">
                  <CiYoutube className="i" />
                </a>
                <a href="">
                  <MdOutlineEmail className="i" />
                </a>
              </div>
            </div>
            <div className="info">
              <div className="service">
                <p>Navigator</p>
                <a href="">Home</a> <br />
                <a href="">User</a> <br />
                <a href="">Board</a> <br />
                <a href="">Notice</a> <br />
                <a href="">Service</a>
              </div>
            </div>
            {/* 여기는 조원들 이름과 이메일 정보 */}
            <div className="person">
              <p>
                name
                <br />T +010-xxxx-xxxx <br />
                kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx <br />
                kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx <br />
                kh123@naver.com
              </p>
            </div>
            <div className="person">
              <p>
                name
                <br />T +010-xxxx-xxxx <br />
                kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx <br />
                kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx <br />
                kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx <br />
                kh123@naver.com
              </p>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
