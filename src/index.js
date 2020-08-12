import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Breadcrumb, Calendar, Badge, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import EditableTable from "./table";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." }
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." }
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." }
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    clicked: false
  };

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };
  onSelect = value => {
    console.log(value.format("YYYY-MM-DD"));
    this.setState({
      clicked: true
    });
  };
  onBack = vv => {
    this.setState({
      clicked: false
    });
  };
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Calendar
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="My Account">
              <Menu.Item key="3">Profile</Menu.Item>
              <Menu.Item key="4">Change Password</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Mangement">
              <Menu.Item key="5">Groups</Menu.Item>
              <Menu.Item key="6">Users</Menu.Item>
              <Menu.Item key="8">Groups</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Reports
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{this.state.clicked ? 
                <Button onClick={this.onBack}>Back</Button> : "Alaki"}
              </Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 14, minHeight: 360 }}
            >
              {this.state.clicked ? (
                <EditableTable />
              ) : (
                <Calendar
                  dateCellRender={dateCellRender}
                  monthCellRender={monthCellRender}
                  onSelect={this.onSelect}
                />
              )}
              ,
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>NuriDent</Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<SiderDemo />, document.getElementById("container"));
