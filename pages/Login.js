import React from "react";
import Router from "next/router";
import axios from "axios";

import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { SessionContext } from "./contexts/sessionContext";
import styles from "../styles/Login.module.css";

const Login = () => {
  const { setIsUserLoggedIn } = useContext(SessionContext);
  

  const onFinish = (values) => {

    axios
      .post("http://localhost:9025/login", {
        email: values.username,
        senha: values.password,
      })
      .then(function (response) {
        alert('usuário autenticado');
        console.log(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        setIsUserLoggedIn(true);
        Router.push("/Dashboard")
      })
      .catch(function (error) {
        if (error.status!=200) {
          alert('Deu Ruim....');
          console.log(error.message);
        }
        
      });

      console.log(values);


    //console.log("Received values of form: ", values);
    //localStorage.setItem("authToken", "yourAuthToken");
    //setIsUserLoggedIn(true);
    //Router.push("/Dashboard");
  };

  const handleNewUser = () => {
    // aqui você pode redirecionar para a página de registro ou outra ação que desejar
    console.log("New User button clicked");
  };

  return (
    <div className={styles.loginContainer}>
      <Card title="Login" bordered={true} style={{ width: 300 }}>
        <Form
          name="normal_login"
          className={styles.loginForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu nome de usuário!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nome de usuário"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Por favor, insira sua senha!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
            >
              Entrar
            </Button>
            <Button
              type="link"
              onClick={handleNewUser}
              className={styles.loginFormButton}
            >
              Usuário Novo
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
