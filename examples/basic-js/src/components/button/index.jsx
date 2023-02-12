import React from 'react';
import './style/index.less';

export default class Button extends React.Component {
  static defaultProps = {
    prefixCls: 'w-btn',
    disabled: false,
    active: false,
    loading: false,
    block: false,
    basic: false,
    htmlType: 'button',
    type: 'light',
    size: 'default',
  };
  render() {
    const {
      prefixCls,
      type,
      size,
      active,
      disabled,
      block,
      basic,
      intent,
      className,
      loading,
      children,
      htmlType,
      ...others
    } = this.props;
    const cls = [
      className,
      prefixCls,
      size ? `${prefixCls}-${size}` : false,
      type ? `${prefixCls}-${type}` : false,
      basic ? `${prefixCls}-basic` : false,
      loading ? `${prefixCls}-loading` : false,
      disabled || loading ? 'disabled' : false,
      active ? 'active' : false,
      block ? 'block' : false,
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <button {...others} type={htmlType} disabled={disabled || loading} className={cls}>
        {children &&
          React.Children.map(children, (child) => {
            if (React.isValidElement(child)) return child;
            return <span> {child} </span>;
          })}
      </button>
    );
  }
}
