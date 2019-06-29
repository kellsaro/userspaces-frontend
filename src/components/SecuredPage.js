import React from 'react';
import PropTypes from 'utils/propTypes';
import { Redirect } from 'react-router-dom';

import bn from 'utils/bemnames';

import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

import Typography from './Typography';

const bem = bn.create('page');

const SecuredPage = ({
  title,
  breadcrumbs,
  tag: Tag,
  className,
  children,
  ...restProps
}) => {
  const classes = bem.b('px-3', className);

  let page = (
    <Tag className={classes} {...restProps}>
    
      <div className={bem.e('header')}>
        {/*
        {title && typeof title === 'string' ? (
          <Typography type="h1" className={bem.e('title')}>
            {title}
          </Typography>
        ) : (
            title
          )}
        {breadcrumbs && (
          <Breadcrumb className={bem.e('breadcrumb')}>
            <BreadcrumbItem>Home</BreadcrumbItem>
            {breadcrumbs.length &&
              breadcrumbs.map(({ name, active }, index) => (
                <BreadcrumbItem key={index} active={active}>
                  {name}
                </BreadcrumbItem>
              ))}
          </Breadcrumb>
        )}*/}

        
      </div>
      {children}
    </Tag>
  );

  if (sessionStorage.getItem('user')){
    return ( page );
  }
  else{
    return ( <Redirect to='/login' /> );
  } 
};

SecuredPage.propTypes = {
  tag: PropTypes.component,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
};

SecuredPage.defaultProps = {
  tag: 'div',
  title: '',
};

export default SecuredPage;
