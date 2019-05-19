import React, { Component } from "react";
import $ from "jquery";
import "../styles/Header.css";
import resume from "../img/Resume.pdf";
import MediaQuery from "react-responsive";
import Burger from "./Burger";
import me from "../img/Me.jpeg";
import MobileMenu from "./MobileMenu";

export default class Header extends Component {
  render() {
    const { hasScrolled, antiHeader } = this.props;
    return (
      <>
        <div
          className={
            "header-container " +
            (hasScrolled ? "header-container--border " : "") +
            (antiHeader ? "header-container--anti" : "")
          }
        >
          <div className="max-width header-flex">
            <h1
              onClick={() => {
                $([document.documentElement, document.body]).animate(
                  {
                    scrollTop: $("#hero").offset().top
                  },
                  800
                );
              }}
              className="logo-name"
            >
              Kevin Eugene
            </h1>
            <MediaQuery minWidth={710}>
              <ul className="header-links">
                <a
                  className="header-link"
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
                <a
                  className="header-link highlight-text"
                  href="mailto:kevin.eugene@hec.edu"
                >
                  Say Hi!
                </a>
                <div
                  onClick={() => {
                    $([document.documentElement, document.body]).animate(
                      {
                        scrollTop: $("#connect").offset().top
                      },
                      800
                    );
                  }}
                  className="small-avatar"
                  style={{ backgroundImage: "url(" + me + ")" }}
                />
              </ul>
            </MediaQuery>
            <MediaQuery maxWidth={709}>
              <Burger />
            </MediaQuery>
          </div>
        </div>
        <MediaQuery maxWidth={709}>
          <MobileMenu antiHeader={antiHeader} />
        </MediaQuery>
      </>
    );
  }
}
