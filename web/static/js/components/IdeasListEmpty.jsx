import React from 'react';
import { Translate } from 'react-redux-i18n';

const IdeasListEmpty = () => (
  <div>
    <Translate value={'ideas.empty'} />
  </div>
);

export default IdeasListEmpty;
