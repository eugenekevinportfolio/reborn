import React, { Component } from 'react';

class Publisher extends Component {
  render() {
    const { title, publisher, link, id } = this.props;
    return (
      <a
        id={id}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="publisher">
        <h2 className="head">
          {publisher}
        </h2>
        <p className="description">
          {title}
        </p>
      </a>
    );
  }
}

export default Publisher;
