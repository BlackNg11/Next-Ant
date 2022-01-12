import { Menu } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const setCurrentKey = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <>
      <Menu mode="horizontal" selectedKeys={[current]}>
        <Item key="/" onClick={setCurrentKey} icon={<AppstoreOutlined />}>
          <Link href="/">
            <a>App</a>
          </Link>
        </Item>
        <Item key="/login" onClick={setCurrentKey} icon={<LoginOutlined />}>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Item>
        <Item
          key="/register"
          onClick={setCurrentKey}
          icon={<UserAddOutlined />}
        >
          <Link href="/register">
            <a>Register</a>
          </Link>
        </Item>
      </Menu>
    </>
  );
};

export default TopNav;
