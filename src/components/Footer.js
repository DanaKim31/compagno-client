import "../assets/style.css";
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
              <span>
                You spin me right round, baby. Like a record, hello yes
              </span>
            </div>
          </div>
          <div className="footer">
            <div>
              <h1>Compagno</h1>
              <h3></h3>
              <p></p>
            </div>
            <div>
              <div>
                <h2></h2>
              </div>
            </div>
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
            <div className="person">
              <p>
                name
                <br />T +010-xxxx-xxxx kh123@naver.com
              </p>
              <br></br>
              <p>
                name
                <br />T +010-xxxx-xxxx kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx kh123@naver.com
              </p>
              <p>
                name
                <br />T +010-xxxx-xxxx kh123@naver.com
              </p>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
