import React from 'react';
import ScrollView from 'devextreme-react/scroll-view';

import './single-card.scss';

interface IProps {
  title: string;
  description?: string; 
  children: any;
}

export default ({ title, description, children }: IProps) => (
  <ScrollView height={'100%'} width={'100%'} className={'with-footer single-card'}>
    <div className={'dx-card content'}>
      <div className={'header'}>
        <div className={'title'}>{title}</div>
        <div className={'description'}>{description}</div>
      </div>
      {children}
    </div>
  </ScrollView>
);
