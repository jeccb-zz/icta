import React from 'react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-redux-i18n';

const UsersFilter = ({ filter, onChange }) => (
  <div className="panel panel-default">
    <div className="panel-body">
      <div className="row">
        <div className="col-xs-12">
          <div className="form-group">
            <label htmlFor="filter-text"><Translate value="filter" /></label>
            <input type="text" className="form-control" placeholder={I18n.t('filter')} value={filter.text} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

UsersFilter.propTypes = {
  filter: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UsersFilter;
