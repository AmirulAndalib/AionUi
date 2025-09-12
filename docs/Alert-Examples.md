# Alert组件使用示例

## 基础用法
```tsx
import Alert from '@/renderer/components/Alert';

// 成功提示
<Alert variant="success">操作成功！</Alert>

// 错误提示  
<Alert variant="error">操作失败，请重试</Alert>
```

## 不同主题
```tsx
// 现代主题 (推荐)
<Alert 
  variant="success" 
  theme="modern"
  content="现代风格的成功提示"
/>

// 简约主题
<Alert 
  variant="info" 
  theme="minimal"
  content="简约风格的信息提示"
/>

// 默认主题
<Alert 
  variant="warning" 
  theme="default"
  content="保持Arco原生样式"
/>
```

## 自定义样式
```tsx
<Alert
  variant="success"
  theme="modern"
  radius="large"        // 大圆角
  shadow={true}         // 显示阴影
  animated={true}       // 入场动画
  showIcon={true}       // 显示图标
  closable={false}      // 不可关闭
  style={{
    position: 'fixed',
    top: '20px',
    right: '20px',
    maxWidth: '300px'
  }}
  content="自定义位置的Alert"
/>
```

## Toast风格用法 (当前项目中的用法)
```tsx
<Alert
  variant="success"
  theme="modern"
  radius="medium" 
  shadow={true}
  animated={true}
  showIcon={true}
  closable={false}
  style={{
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    maxWidth: '240px'
  }}
  content="已进入多智能体模式"
/>
```