import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import styles from './Dashboard.module.scss'

const { Header, Content, Footer } = Layout;


const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header className={styles.header}>
        <h1 className="demo-logo" style={{
          color: '#fff'
        }}>
          ACME APP DEMO
        </h1>
      </Header>
      <Content style={{ display: 'flex', flexDirection: 'column', width: '1280px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
