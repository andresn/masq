import React from 'react';

import CardHeader from './CardHeader/CardHeader';

import './Card.css';

export default function Card(props) {
  const { image, color, title, description, enabled } = props;

  return (
    <div className="Card">
      {image ?
        (<div className="image"
              style={{backgroundImage: 'url(' + image + ')'}}
         ></div>)
         : null}
      <div className="flex">
        <div id="content">
          <CardHeader className="CardHeader" color={color} enabled={enabled} />
          <h1 className="title">{title}</h1>
          <p className="description">{description}</p>
          {props.children}
          {/* TODO: footer */}
        </div>
      </div>
    </div>
  );
}
