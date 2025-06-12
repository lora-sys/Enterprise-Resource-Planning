# ERP 前端架构设计

''' bash
graph TD
    A[前端] --> B[业务模块]
    A --> C[状态管理]
    A --> D[工具层]
    B --> E[用户管理]
    B --> F[权限控制]
    B --> G[数据看板]
    C --> H[Zustand]
    D --> I[API封装]
    D --> J[工具函数]
'''
## 前端架构
- 1.权限上下文+登录模块 AuthProvider, LoginPage
- 2.路由守卫+403页面
AuthRoute, ErrorPage
- 3.权限指令+菜单组件
Permission, SidebarMenu
- 4.管理员用户管理模块
UserList, UserForm
- 5.员工仪表盘模块
	Dashboard, StatsCard
- 6.数据表格组件+ crud api
	DataTable, API服务封装
- 7.业务模块开发
报表、审批流等业务组件
- 8.权限测试和审计日志模块
单元测试 + 操作日志组件