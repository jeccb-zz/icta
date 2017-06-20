import React from 'react';
import { Translate, I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';

const IdeasFilter = ({filter, onChange, onClickStatus}) => (
  <div className="row">
    <div className="col-xs-12 col-md-7">
      <div className="form-group">
        <label htmlFor="filter-text"><Translate value="filter" /></label>
        <input type="text" className="form-control" placeholder={I18n.t('filter')} value={filter.text} onChange={onChange} />
      </div>
    </div>
    <div className="col-md-5 col-xs-12">
      <div className="form-group">
        <div className="row">
          <div className="col-xs-12">
            <label htmlFor="filter-text"><Translate value="status" /></label>
          </div>
        </div>
        <div className="filters-status">
          { [ 'new', 'planned', 'in_progress', 'done' ].map( (status) => (
            <div className="filter" key={status}>
              <span className={`label ${filter.status.includes(status) ? `label-status-${status.replace('_','-')}` : 'label-default'}`} onClick={onClickStatus(status)}>
                <Translate value={`idea.statuses.${status}`} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default IdeasFilter;
