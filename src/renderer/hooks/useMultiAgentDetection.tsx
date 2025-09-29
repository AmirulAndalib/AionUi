/**
 * Hook for detecting multi-agent mode on application startup
 */

import { ipcBridge } from '@/common';
import { Message } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useMultiAgentDetection = () => {
  const { t } = useTranslation();
  const [message, contextHolder] = Message.useMessage();
  const [chatCenterPosition, setChatCenterPosition] = useState('50%');

  useEffect(() => {
    // 计算对话区域中心位置（智能检测页面类型）
    const calculateChatCenterPosition = () => {
      // 获取侧边栏元素
      const siderElement = document.querySelector('.layout-sider');

      // 检测是否在欢迎页面（通过多种方式）
      const isWelcomePage = window.location.hash === '' || window.location.hash === '#/' || window.location.pathname === '/' || !!document.querySelector('[class*="welcome"], .welcome-container, .home-page') || !!document.querySelector('input[placeholder*="发消息"], input[placeholder*="上传文件"]'); // 欢迎页面的输入框

      if (siderElement) {
        const siderWidth = siderElement.getBoundingClientRect().width;
        let chatCenterX;

        if (isWelcomePage) {
          // 欢迎页面：对话区域只占右侧的2/3（左侧对话，右侧工作空间）
          const totalRightWidth = window.innerWidth - siderWidth;
          const chatAreaWidth = totalRightWidth * 0.67; // 对话区域占67%
          chatCenterX = siderWidth + chatAreaWidth / 2;
          console.log('欢迎页面布局:', { siderWidth, totalRightWidth, chatAreaWidth, chatCenterX });
        } else {
          // 对话页面：对话区域占整个右侧
          const chatAreaWidth = window.innerWidth - siderWidth;
          chatCenterX = siderWidth + chatAreaWidth / 2;
          console.log('对话页面布局:', { siderWidth, chatAreaWidth, chatCenterX });
        }

        setChatCenterPosition(`${chatCenterX}px`);
      } else {
        // 备用方案
        const defaultSiderWidth = 250;
        const totalRightWidth = window.innerWidth - defaultSiderWidth;
        const chatAreaWidth = isWelcomePage ? totalRightWidth * 0.67 : totalRightWidth;
        const chatCenterX = defaultSiderWidth + chatAreaWidth / 2;

        setChatCenterPosition(`${chatCenterX}px`);
      }
    };
    const checkMultiAgentMode = async () => {
      try {
        const response = await ipcBridge.acpConversation.getAvailableAgents.invoke();
        if (response && response.success && response.data) {
          // 检测是否有多个ACP智能体（不包括内置的Gemini）
          const acpAgents = response.data.filter((agent: { backend: string; name: string; cliPath?: string }) => agent.backend !== 'gemini');
          if (acpAgents.length > 1) {
            // 计算当前对话区域中心位置
            calculateChatCenterPosition();

            message.success({
              content: (
                <div style={{ lineHeight: '1.5' }}>
                  <div style={{ fontWeight: 'bold', marginTop: '4px' }}>{t('conversation.welcome.multiAgentModeEnabled')}</div>
                </div>
              ),
              duration: 0,
              showIcon: true,
              className: 'aion-multi-agent-message',
              style: {
                position: 'fixed',
                top: '40px',
                left: chatCenterPosition,
                transform: 'translateX(-50%)',
                zIndex: 1050,
                maxWidth: '340px',
                width: 'fit-content',
                background: 'linear-gradient(to right, #e8ffea 0%, #f5ffe8 100%)',
                border: '1px solid var(--color-border-2, rgba(229, 230, 235, 1))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontWeight: 500,
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            });
          }
        }
      } catch (error) {
        // 静默处理错误，避免影响应用启动
        console.log('Multi-agent detection failed:', error);
      }
    };

    checkMultiAgentMode();

    // 监听布局变化，动态调整toast位置
    const handleLayoutChange = () => {
      calculateChatCenterPosition();
    };

    // 监听窗口大小变化
    window.addEventListener('resize', handleLayoutChange);

    // 监听侧边栏展开收起变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
          // 延迟执行，确保CSS动画完成
          setTimeout(handleLayoutChange, 100);
        }
      });
    });

    // 监听侧边栏元素
    const siderElement = document.querySelector('.layout-sider');
    if (siderElement) {
      observer.observe(siderElement, {
        attributes: true,
        attributeFilter: ['class', 'style'],
      });
    }

    // 监听整个布局容器
    const layoutElement = document.querySelector('.layout');
    if (layoutElement) {
      observer.observe(layoutElement, {
        attributes: true,
        attributeFilter: ['style'],
        subtree: true,
      });
    }

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleLayoutChange);
      observer.disconnect();
    };
  }, []); // 空依赖数组确保只在组件初始化时执行一次

  return { contextHolder };
};
