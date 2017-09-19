import React from 'react';
import PropTypes from 'prop-types';

import IdeasListEmpty from './IdeasListEmpty';

const IdeasListNotEmpty = ({ ideas }) => (
  <div className="row">
    <div className="col-xs-12">
      <ul className="list-group">
        { ideas }
      </ul>
    </div>
  </div>
);

const IdeasList = ({ ideas }) => (
  ideas.length === 0 ? <IdeasListEmpty /> : <IdeasListNotEmpty ideas={ideas} />
);

IdeasList.propTypes = {
  ideas: PropTypes.array,
};

IdeasList.defaultProps = {
  ideas: [],
};

export default IdeasList;
