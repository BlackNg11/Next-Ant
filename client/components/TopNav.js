import { Menu } from "antd";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  const setCurrentKey = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });

    window.localStorage.removeItem("user");
    toast(data.message);

    router.push("/login");
  };

  return (
    <>
      <Menu mode="horizontal" selectedKeys={[current]}>
        <Item key="/" onClick={setCurrentKey} icon={<AppstoreOutlined />}>
          <Link href="/">
            <a>App</a>
          </Link>
        </Item>

        {user === null && (
          <>
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
          </>
        )}
        {user !== null && (
          <>
            <SubMenu
              icon={<CoffeeOutlined />}
              title={user && user.name}
              className="float-right"
            >
              <Item onClick={logout} className="float-right">
                <Link href="/register">Logout</Link>
              </Item>
            </SubMenu>
          </>
        )}
      </Menu>
    </>
  );
};

export default TopNav;
