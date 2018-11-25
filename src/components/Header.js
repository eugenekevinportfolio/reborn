import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Header.css';
import logo from '../img/Logo.png';
import {
  openBurger,
  openPanel
} from '../actions/index.js';
import Tab from './Tab.js';
import map from 'lodash/map';
import twitter from '../img/twitter.png';
import linkedin from '../img/linkedin.png';
import resume from '../img/Resume.pdf';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desync_burger_open: false,
      dropdown_opaque: false
    }
  }

  renderTab() {
    const { tabs } = this.props;

    return(
      map(
        tabs,
        (tab, id) => <Tab key={id} {...tab} id={id} />
      )
    )
  }

  topStyle() {
    const { burger, panel } = this.props;

    if (burger) {
      return {
        backgroundColor: "white",
        marginBottom: 15
      }
    }
    else if (panel.isOpen) {
      return {
        transform: "translateY(5px) rotate(135deg)"
      }
    }
  }

  bottomStyle() {
    const { burger, panel } = this.props;

    if (burger) {
      return {
        backgroundColor: "white"
      }
    }
    else if (panel.isOpen) {
      return {
        transform: "translateY(-5px) rotate(-135deg)"
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { burger } = this.props;

    if (!prevProps.burger && burger) {
      this.setState({
        desync_burger_open: true,
      });
      setTimeout(() => {
        this.setState({dropdown_opaque: true});
      }, 10);
    }
    else if (prevProps.burger && !burger) {
      this.setState({dropdown_opaque: false});
      setTimeout(() => {
        this.setState({desync_burger_open: false});
      }, 300);
    }
  }

  headerStyle() {
    const { border, panel, window_dimensions, navbar_hidden } = this.props;
    let is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (window_dimensions.isMobile) {
      if (border || panel.isOpen) {
        return {
          borderBottom: "solid 1px rgba(255,255,255,0.15)",
          backgroundColor: is_safari && "rgba(14,14,14,0.7)"
        }
      }
    }
    else {
      if (panel.isOpen && navbar_hidden) {
        return {
          transform: "translateY(-26px)"
        }
      }
    }
  }

  menuStyle() {
    const { navbar_hidden, panel, window_dimensions } = this.props;

    if (window_dimensions.isDesktop) {
      if (navbar_hidden && panel.isOpen) {
        return {
          transform: "scale(0.7)",
        }
      }
    }
  }

  render() {
    const { desync_burger_open, dropdown_opaque } = this.state;
    const { border, panel, burger, window_dimensions } = this.props;

    return (
      <div
        style={this.headerStyle()}
        className="mobile-head">
        <div id="top-of-the-world" className="header">
          <img
            style={this.menuStyle()}
            src={logo}
            alt="Logo"
            className="logo" />
          {window_dimensions.isMobile &&
            <p>
              Kevin Eugene
            </p>
          }
        </div>

        {/* Burger */}
        <div onClick={() => {
          if (panel.isOpen) {
            this.props.openPanel(false, "");
          }
          else {
            if (!burger) {
              this.props.openBurger(true);
              document.getElementsByTagName("body")[0].style.overflow = "hidden";
            }
            else {
              this.props.openBurger(false);
              document.getElementsByTagName("body")[0].style.overflow = null;
            }
          }
        }}
        style={this.menuStyle()}
        className="hamburger">
          <div style={this.topStyle()} className="top-burger" />
          <div style={burger ? {overflow: "visible", height: 100} : {height: 0}} className="mobile-chapters-container">
            {this.renderTab()}
          </div>
          <div style={this.bottomStyle()} className="bottom-burger" />
        </div>

        {/* Dropdown */}
        {desync_burger_open &&
        <div
          className="dropdown"
          onTouchMove={(e) => e.stopPropagation()}
          style={dropdown_opaque ? {opacity: 1} : {}}
          onClick={() => {
            this.props.openBurger(false);
            document.getElementsByTagName("body")[0].style.overflow = null;
          }}>
          <div className="side-footer">
            <a href="https://www.linkedin.com/in/eugenekevin/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="Linked In" className="linkedin" />
            </a>
            <li>
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer">
                Resume
              </a>
            </li>
            <a href="https://twitter.com/Kekakou20" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter" className="twitter" />
            </a>
          </div>
        </div>}
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openBurger,
    openPanel
  }, dispatch)
}

const selector = createSelector(
  state => state['window_dimensions'],
  state => state['panel'],
  state => state['burger'],
  state => state['tabs'],
  state => state['navbar_hidden'],
  (
    window_dimensions,
    panel,
    burger,
    tabs,
    navbar_hidden
) => {
    return  {
      window_dimensions,
      panel,
      burger,
      tabs,
      navbar_hidden
    };
  }
);

export default connect(selector, matchDispatchToProps)(Header);
