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
              <h3></h3>
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
                <p>Service</p>
                <a href="">name</a> <br />
                <a href="">name</a> <br />
                <a href="">name</a> <br />
                <a href="">name</a> <br />
                <a href="">name</a>
              </div>
              <div className="service">
                <p>Service</p>
                <a href="">name</a> <br />
                <a href="">name</a> <br />
                <a href="">name</a> <br />
                <a href="">name</a> <br />
                <a href="">name</a>
              </div>
              <div className="service">
                <p>Service</p>
                <a href="">name</a> <br />
                <a href="">name</a> <br />
                <a href="">name</a> <br />
                <a href="">name</a> <br />
                <a href="">name</a>
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
