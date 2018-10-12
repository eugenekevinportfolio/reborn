import React, { Component } from 'react';
import white_logo from '../img/WhiteLogo.png';
import twitter from '../img/twitter.png';
import linkedin from '../img/linkedin.png';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import map from 'lodash/map';
import Tab from './Tab.js';
import resume from '../img/Resume.pdf';

class Side extends Component {
  renderTabs() {
    const { tabs } = this.props;

    return(
      map(
        tabs,
        (tab, id) => <Tab id={id} key={id} {...tab} />
      )
    );
  }

  render() {
    return (
      <div className="side">
        <img
          onClick={() => {
            const top_DOM = document.getElementById("top-of-the-world");
            top_DOM.scrollIntoView({
              behavior: 'smooth'
            });
          }}
          src={white_logo}
          alt="Logo"
          className="side-logo"
        />
        <nav>
          <ul>
            {this.renderTabs()}
          </ul>
        </nav>
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
      </div>
    );
  }
}

const selector = createSelector(
  state => state['tabs'],
  (
    tabs
) => {
    return  {
      tabs
    };
  }
);


export default connect(selector)(Side);
