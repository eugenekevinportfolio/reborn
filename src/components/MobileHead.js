import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Mobile.css';
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

class MobileHead extends Component {
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

  render() {
    const { desync_burger_open, dropdown_opaque } = this.state;
    const { border, panel, burger } = this.props;

    return (
      <div
        style={(border || panel.isOpen) ? {borderBottom: "solid 1px rgba(0,0,0,0.1)"} : {}}
        className="mobile-head">
        <div id="top-of-the-world" className="header">
          <img src={logo} alt="Logo" className="logo" />
          <p>
            KEVIN EUGENE
          </p>
        </div>
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
        className="hamburger">
          <div style={this.topStyle()} className="top-burger" />
          <div style={burger ? {overflow: "visible", height: 100} : {height: 0}} className="mobile-chapters-container">
            {this.renderTab()}
          </div>
          <div style={this.bottomStyle()} className="bottom-burger" />
        </div>
        {desync_burger_open &&
        <div
          className="dropdown"
          onTouchStart={(e) => e.stopPropagation()}
          style={dropdown_opaque ? {opacity: 1} : {}}
          onClick={() => {
            this.props.openBurger(false);
            document.getElementsByTagName("body")[0].style.overflow = null;
          }}>
          <div className="side-footer">
            <a href="https://www.linkedin.com/in/eugenekevin/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="Linked In" className="linkedin" />
            </a>
            <a href="https://twitter.com/Kekakou20" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter" className="twitter" />
            </a>
            <li>
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer">
                RESUME
              </a>
            </li>
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
  state => state['panel'],
  state => state['burger'],
  state => state['tabs'],
  (
    panel,
    burger,
    tabs
) => {
    return  {
      panel,
      burger,
      tabs
    };
  }
);

export default connect(selector, matchDispatchToProps)(MobileHead);
