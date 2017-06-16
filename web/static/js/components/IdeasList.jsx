import IdeasListItem from './IdeasListItem';
import React from 'react';

const IdeasList = ({ideas}) => (
  <div className="row">
    <div className="col-xs-12">
      <ul className="list-group">
        { ideas.map((idea) => (<IdeasListItem key={idea.id} idea={idea} />)) }
      </ul>
    </div>
  </div>
);

export default IdeasList;
