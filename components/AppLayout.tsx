import React from 'react';
import { Layout, theme } from 'antd';
import styles from '@/styles/components/AppLayout.module.scss'

const { Header, Content, Footer } = Layout;

interface AppLayoutProps {
  children: JSX.Element
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <h1 className={styles.logo}>
          ACME APP DEMO
        </h1>
      </Header>
      <Content className={styles.content}>
        <div
          className={styles.contentContainer}
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ACME APP ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};


