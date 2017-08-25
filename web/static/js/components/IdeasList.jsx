import React from 'react';

const IdeasList = ({ideas}) => (
  <div className="row">
    <div className="col-xs-12">
      <ul className="list-group">
        { ideas }
      </ul>
    </div>
  </div>
);

export default IdeasList;
