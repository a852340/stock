# Stock App UI Framework

## 概述
基于 React + TypeScript + Tailwind CSS 构建的股票应用基础UI框架。

## 技术栈
- **前端框架**: React 18 + TypeScript
- **样式**: Tailwind CSS (暗色主题)
- **状态管理**: Zustand
- **构建工具**: Vite
- **桌面应用**: Electron

## 项目结构
```
src/
├── components/
│   ├── StockList.tsx      # 左侧股票列表组件
│   └── MainContent.tsx    # 中间主显示区域组件
├── store/
│   └── stockStore.ts      # Zustand状态管理
├── App.tsx                # 主应用组件
├── index.css              # Tailwind样式和自定义组件类
└── App.css                # 应用特定样式
```

## 功能特性

### 左侧股票列表
- 显示当前监控的所有股票标的
- 包含股票代码和名称
- 支持点击选择，带有视觉反馈
- 默认包含8个示例股票：AAPL, GOOGL, MSFT, TSLA, AMZN, META, NVDA, JPM

### 中间主显示区域
- 动态显示选中股票的详细信息
- 未选择时显示欢迎界面
- 预留了价格、涨跌幅、图表等数据展示区域
- 响应式布局设计

### 暗色主题设计
- 专为实时行情查看优化的暗色界面
- 自定义颜色变量：深色背景、边框、文本等
- 良好的对比度和可读性

## 开发命令
```bash
# 启动开发服务器
npm run dev

# 代码检查
npm run lint

# 构建项目
npm run build
```

## 组件说明

### StockList 组件
- 位置：左侧边栏
- 功能：显示股票列表，处理选择事件
- 状态：从 Zustand store 获取股票数据和选中状态

### MainContent 组件  
- 位置：中间主区域
- 功能：根据选中股票显示相应内容
- 布局：包含标题、价格信息、图表区域、详细数据等

### stockStore (Zustand)
- 管理股票列表数据
- 管理当前选中的股票
- 提供增删改查方法

## 扩展性
- 预留了实时数据接口
- 图表区域可集成 ECharts、Chart.js 等图表库
- 状态管理支持添加更多数据字段
- 组件化设计便于功能扩展

## 验收标准完成情况
✅ 左侧标的列表可见  
✅ 中间区域布局清晰  
✅ UI 布局合理美观  
✅ 响应式设计支持  
✅ 暗色主题实现