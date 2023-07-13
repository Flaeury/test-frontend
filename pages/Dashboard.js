import { Layout, Menu, Dropdown, Avatar, Switch, Image, Button } from 'antd';
import { UserOutlined, DownOutlined, ControlOutlined, InfoCircleOutlined, DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { useContext, useState, useEffect } from 'react';
import { SessionContext } from './contexts/sessionContext';
import Router from 'next/router';
import Script from 'next/script';


const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { setIsUserLoggedIn } = useContext(SessionContext);
  const [darkMode, setDarkMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onMenuClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('authToken');
      setIsUserLoggedIn(false);
      Router.push('/login');
    }
  };

  const profileMenu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Saída</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="header"
        style={{
          backgroundColor: darkMode ? '#424242' : '#ADD8E6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Image width={50} src="./logo.png" alt="imagem logo" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            style={{ marginRight: '1rem' }}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
          <Dropdown overlay={profileMenu}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} /> <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        <Sider
          width={ screenWidth <= 580 ? 200 : (screenWidth <= 850 ? 220 : (screenWidth <= 1100 ? 240 : 270))}       
          className="site-layout-background"
          collapsed={collapsed}
        >
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
              <Menu.Item key="4">Unidades de Medida</Menu.Item>
            </SubMenu>
            <Button
              type="text"
              icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                paddingBottom: '2.1vw',
                paddingTop: '0.9vw',
                color: darkMode ? 'white' : 'initial',
              }}
            >
              {!collapsed && 'Fechar'}
            </Button>
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
            Conteúdo do Dashboard área de trabalho das funcionalidades da minha aplicação
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
