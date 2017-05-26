import React from 'react';
import { Translate, I18n } from 'react-redux-i18n';

const IdeasFilter = ({filter, onChange}) => (
  <div className="col-xs-12">
    <div className="form-group">
      <label htmlFor="filter-text"><Translate value="filter" /></label>
      <input type="text" className="form-control" placeholder={I18n.t('filter')} value={filter} onChange={onChange} />
    </div>
  </div>
)

export default IdeasFilter;
