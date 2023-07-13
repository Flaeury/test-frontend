/* eslint-disable jsx-a11y/alt-text */
import { Layout, Menu, Dropdown, Avatar, Switch, Image } from 'antd';
import { UserOutlined, DownOutlined, ControlOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { SessionContext } from './contexts/sessionContext';
import Router from 'next/router';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const { setIsUserLoggedIn } = useContext(SessionContext);
  const [darkMode, setDarkMode] = useState(false);

  const onMenuClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('authToken');
      setIsUserLoggedIn(false);
      Router.push('/login');
    }
  }

  const profileMenu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Saída</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header" style={{ backgroundColor: darkMode ? '#424242' : '#ADD8E6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Image width={50} src="./logo.png" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} style={{ marginRight: '1rem' }} />
          <Dropdown overlay={profileMenu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} /> <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={300} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            theme={darkMode ? 'dark' : 'light'}
          >
            <SubMenu key="sub1" icon={<ControlOutlined />} title="Painel de Controle">
              <Menu.Item key="1">Dados Gerais</Menu.Item>
              <Menu.Item key="2">Índices Verificados</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<InfoCircleOutlined />} title="Informações Gerais">
              <Menu.Item key="3">Parâmetros do Sistema</Menu.Item>
              <Menu.Item key="4">Unidades</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Conteúdo do Dashboard
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
