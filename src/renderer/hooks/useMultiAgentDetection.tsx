/**
 * Hook for detecting multi-agent mode on application startup
 */

import { ipcBridge } from '@/common';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from '../components/Alert';

export const useMultiAgentDetection = () => {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkMultiAgentMode = async () => {
      try {
        const response = await ipcBridge.acpConversation.getAvailableAgents.invoke();
        if (response && response.success && response.data) {
          // 检测是否有多个ACP智能体（不包括内置的Gemini）
          const acpAgents = response.data.filter((agent: { backend: string; name: string; cliPath?: string }) => agent.backend !== 'gemini');
          if (acpAgents.length > 1) {
            setShowAlert(true);
            // 3秒后自动隐藏
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
          }
        }
      } catch (error) {
        // 静默处理错误，避免影响应用启动
        console.log('Multi-agent detection failed:', error);
      }
    };

    checkMultiAgentMode();
  }, []); // 空依赖数组确保只在组件初始化时执行一次

  const alertComponent = showAlert ? (
    <Alert
      variant='success'
      theme='default'
      radius='medium'
      shadow={true}
      animated={true}
      content={
        <div style={{ lineHeight: '1.5' }}>
          <div>{t('conversation.welcome.multiAgentModeEnabled')}</div>
        </div>
      }
      showIcon={true}
      closable={false}
      className='multi-agent-message'
      style={{
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        maxWidth: '340px',
        width: 'fit-content',
      }}
    />
  ) : null;

  return { alertComponent };
};
