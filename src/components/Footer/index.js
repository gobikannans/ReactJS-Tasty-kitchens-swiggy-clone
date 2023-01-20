import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-bg-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dpjowvn70/image/upload/v1674121630/Frame_275_1x_tugl0q.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="footer-social-logos">
        <a href="https://in.pinterest.com/" target="_blank" rel="noreferrer">
          <FaPinterestSquare className="footer-icons" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <FaInstagram className="footer-icons" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <FaTwitter className="footer-icons" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <FaFacebookSquare className="footer-icons" />
        </a>
      </div>
    </div>
  )
}
