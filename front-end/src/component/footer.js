import React from "react";
import "../css/footer.css";
import fblogo from "../img/fblogo.png"
import instalogo from "../img/instalogo.png"
import twitlogo from "../img/twitlogo.png"
import ytlogo from "../img/ytlogo.png"


const Footer = () => {
  return (
    <div>
      <footer>
        <div class="footer">
          <div class="row">
            <a href="facebook.com">
                <img class="fa fa-facebook" src={fblogo} alt="FACEBOOK" />
            </a>
            <a href="instagram.com">
            <img class="fa fa-instagram" src={instalogo} alt="INSTAGRAM" />
            </a>
            <a href="youtube,,com">
            <img class="fa fa-youtube" src={twitlogo} alt="YOUTUBE" />
            </a>
            <a href="twitter.com">
            <img class="fa fa-twitter" src={ytlogo} alt="TWITTER" />
            </a>
          </div>

          <div class="row">
            <ul>
              <li>
                <a href="/">Contact us</a>
              </li>
              <li>
                <a href="/">Our Services</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Terms & Conditions</a>
              </li>
              <li>
                <a href="/">Career</a>
              </li>
            </ul>
          </div>

          <div class="row">
            ROOM2ME Copyright © 2024 Room2Me - All rights reserved || Designed
            By: Om Kolhe
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
