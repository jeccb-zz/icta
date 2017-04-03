import React, { Component, PropTypes } from 'react';

const IdeasListItem = ({idea}) => (
  <li> {idea.id}: {idea.title} </li>
);

export default IdeasListItem;
