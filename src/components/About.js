import React, { Component } from 'react';
import selfie from '../img/Selfie.jpeg';

class About extends Component {
  render() {
    return (
      <div id="about" className="section">
        <h2 className="section-title">
          ABOUT ME
        </h2>
        <div className="about-description">
          <div className="about-left">
            <img src={selfie} alt="Hipster" className="selfie" />
            <p className="selfie-description">
              That's me in Japan, when I was a hipster (I still am).
            </p>
          </div>
          <div className="about-right">
            <p>
              I am graduate from Telecom ParisTech and HEC Paris. I started design on my own about five years ago. As I was studying Computer Science at the time and not design, I had to learn everything by myself. After spending a lot of time mimicking Apple products' user interfaces on Sketch, I started creating concepts on my own, using what I had learned during that first phase.
            </p>
            <p>
              My first concept was called iOS Fuji (July 2016) and can be found <a href="https://eugenekevin.github.io/" target="_blank" rel="noopener noreferrer">here</a>. A few months later, I published <a href="https://eugenekevindesign.github.io/" target="_blank" rel="noopener noreferrer">iOS Fuji 2.0</a> (August 2016) which aimed at simplifying the initial concept.
            </p>
            <p>
              Ever since then, a dozen of projects have been created, some of which were aborted in the way, and others I am still thinking about today. A few months ago, I decided to try again publishing some of my ideas and confront them to people's feedback.
            </p>
            <p>
              This website is a portfolio of these concepts.
            </p>
            <p>
              You can find the previous version <a href="https://eugenekevinproto.herokuapp.com/" target="_blank" rel="noopener noreferrer">here</a> if you want to take a look at how the design evolved over the past few months.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
