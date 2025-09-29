/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * AionMessage - Aion品牌风格的消息组件
 * 基于ArcoDesign Message，提供统一的品牌渐变样式
 */

import { Message } from '@arco-design/web-react';

// Aion品牌渐变色系
const aionGradients = {
  success: '#e8ffea 0%, #f5ffe8 100%', // 绿色渐变
  warning: '#fff7e6 0%, #ffecc7 100%', // 橙色渐变
  info: '#e6f7ff 0%, #c7f0ff 100%', // 蓝色渐变
  error: '#fff2f0 0%, #ffccc7 100%', // 红色渐变
};

// 统一的Aion样式生成器
const createAionStyle = (type: keyof typeof aionGradients) => ({
  style: {
    background: `linear-gradient(to right, ${aionGradients[type]})`,
    border: '1px solid var(--color-border-2, rgba(229, 230, 235, 1))',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontWeight: 500,
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '340px',
    width: 'fit-content',
  },
  showIcon: true,
  duration: 0,
  className: 'aion-message',
});

// Hook方式的AionMessage实现
export const useAionMessage = () => {
  const [message, contextHolder] = Message.useMessage();

  const aionMessage = {
    success: (content: string) => {
      message.success({ content, ...createAionStyle('success') });
    },
    warning: (content: string) => {
      message.warning({ content, ...createAionStyle('warning') });
    },
    info: (content: string) => {
      message.info({ content, ...createAionStyle('info') });
    },
    error: (content: string) => {
      message.error({ content, ...createAionStyle('error') });
    },
  };

  return { aionMessage, contextHolder };
};

// 静态方法实现（备用方案）
export const AionMessage = {
  success: (content: string) => {
    Message.success({ content, ...createAionStyle('success') });
  },
  warning: (content: string) => {
    Message.warning({ content, ...createAionStyle('warning') });
  },
  info: (content: string) => {
    Message.info({ content, ...createAionStyle('info') });
  },
  error: (content: string) => {
    Message.error({ content, ...createAionStyle('error') });
  },
};

export default AionMessage;
