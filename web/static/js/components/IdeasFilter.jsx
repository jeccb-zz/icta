import React from 'react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-redux-i18n';

const IdeasFilter = ({ filter, onChange, onClickStatus, statuses }) => (
  <div className="panel panel-default">
    <div className="panel-body">
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <div className="form-group">
            <label htmlFor="filter-text"><Translate value="filter" /></label>
            <input type="text" className="form-control" placeholder={I18n.t('filter')} value={filter.text} onChange={onChange} />
          </div>
        </div>
        <div className="col-xs-12 col-md-4">
          <div className="form-group">
            <div className="row">
              <div className="col-xs-12">
                <label htmlFor="filter-text"><Translate value="status" /></label>
              </div>
            </div>
            <div className="filters-status">
              {statuses.map(status => (
                <div className="filter" key={status}>
                  <span className={`label ${filter.status.includes(status) ? `status-${status.replace('_', '-')}` : 'label-default'}`} onClick={onClickStatus(status)}>
                    <Translate value={`idea.statuses.${status}`} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

IdeasFilter.propTypes = {
  filter: PropTypes.shape({
    text: PropTypes.string.isRequired,
    status: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClickStatus: PropTypes.func.isRequired,
  statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IdeasFilter;
