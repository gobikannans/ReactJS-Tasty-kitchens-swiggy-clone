import {Component} from 'react'
import {FaPinterestSquare} from 'react-icons/fa'
import {AiFillInstagram, AiOutlineTwitter, AiFillFacebook} from 'react-icons/ai'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-bg-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dpjowvn70/image/upload/v1673980926/Vector_1x_1_c8tnmv.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food.
        <br />
        Contact us on
      </p>
      <div className="footer-social-logos">
        <a href="https://in.pinterest.com/" target="_blank" rel="noreferrer">
          <FaPinterestSquare className="footer-icons" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <AiFillInstagram className="footer-icons" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <AiOutlineTwitter className="footer-icons" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <AiFillFacebook className="footer-icons" />
        </a>
      </div>
    </div>
  )
}
