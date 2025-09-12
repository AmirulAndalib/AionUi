/**
 * 自定义Alert组件
 * 基于Arco Design Alert的封装，提供统一的UI风格和自定义样式支持
 */

import type { AlertProps as ArcoAlertProps } from '@arco-design/web-react';
import { Alert as ArcoAlert } from '@arco-design/web-react';
import React from 'react';
import './Alert.css';

// 扩展的Props接口
export interface AlertProps extends Omit<ArcoAlertProps, 'type'> {
  /** Alert类型 */
  variant?: 'success' | 'info' | 'warning' | 'error';
  /** 自定义主题 */
  theme?: 'default' | 'modern' | 'minimal';
  /** 是否显示动画 */
  animated?: boolean;
  /** 圆角大小 */
  radius?: 'none' | 'small' | 'medium' | 'large';
  /** 阴影类型 */
  shadow?: 'none' | 'subtle' | 'medium' | 'focus' | boolean;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'success',
  theme = 'default',
  animated = true,
  radius = 'medium', // 引用CSS token: --radius-medium
  shadow = 'subtle', // 引用CSS token: --shadow-subtle
  className = '',
  style = {},
  children,
  content,
  ...rest
}) => {
  // 构建CSS类名
  const alertClassName = ['aion-alert', `aion-alert--${variant}`, `aion-alert--${theme}`, `aion-alert--radius-${radius}`, animated && 'aion-alert--animated', className].filter(Boolean).join(' ');

  // 构建投影样式 (基于Arco Design原生投影)
  const getShadowStyle = () => {
    if (shadow === false || shadow === 'none') return {};

    const shadows = {
      subtle: 'var(--shadow-subtle)', // 全局轻投影token (7%透明度)
      medium: 'var(--shadow-medium)', // 全局中等投影token
      focus: 'var(--shadow-focus)', // 全局聚焦投影token
    };

    // 向后兼容：true 默认使用 subtle
    if (shadow === true) return { boxShadow: shadows.subtle };

    return { boxShadow: shadows[shadow as keyof typeof shadows] };
  };

  // 构建自定义样式
  const alertStyle = {
    ...style,
    ...getShadowStyle(),
  };

  return <ArcoAlert type={variant} className={alertClassName} style={alertStyle} content={content || children} {...rest} />;
};

export default Alert;
