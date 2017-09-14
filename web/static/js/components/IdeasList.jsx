import React from 'react';
import PropTypes from 'prop-types';

const IdeasList = ({ ideas }) => (
  <div className="row">
    <div className="col-xs-12">
      <ul className="list-group">
        { ideas }
      </ul>
    </div>
  </div>
);

IdeasList.propTypes = {
  ideas: PropTypes.array,
};

IdeasList.defaultProps = {
  ideas: [],
};

export default IdeasList;
