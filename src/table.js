import React, { useContext, useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import "./table.css";
import { Table, Input, Button, Popconfirm, Form, Space } from "antd";
import CustomSteps from "./progress";
import FormSizeDemo from "./detail-form";

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "hour",
        dataIndex: "hour",
        editable: true
      },
      {
        title: "patinet",
        dataIndex: "patinet",
        editable: true
      },
      {
        title: "department",
        dataIndex: "department",
        editable: true
      },
      {
        title: "doctor",
        dataIndex: "doctor",
        editable: true
      },
      {
        title: "reasone",
        dataIndex: "reasone",
        editable: true
      },
      {
        title: "status",
        dataIndex: "status",
        width: "30%"
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a href="/">Delete</a>
            </Popconfirm>
          ) : null
      }
    ];
    this.state = {
      dataSource: [
        {
          key: "0",
          hour: "10",
          patinet: "Hamid 0",
          department: "Implantlogy 0",
          doctor: "Dr. Noori",
          reasone: "Second Visit Basal",
          status: <CustomSteps />
        },
        {
          key: "1",
          hour: "12",
          patinet: "Hamid 1",
          department: "Orthodontic 1",
          doctor: "Dr. Noori",
          reasone: "First Visit Classic",
          status: <CustomSteps />
        }
      ],
      count: 2,
      table: true
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key)
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      patinet: `Edward King ${count}`,
      hour: 32,
      department: `Implantlogy ${count}`,
      doctor: "Dr. Noori",
      reasone: "Checkup",
      status: <CustomSteps />
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData
    });
  };
  detailTable = () => {
    this.setState({
      table: false
    });
  };
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div>
        <Space>
          <Button
            onClick={this.detailTable}
            type="primary"
            style={{
              marginBottom: 16
            }}
          >
            Comprehensive add
          </Button>
          <Button
            onClick={this.handleAdd}
            type="primary"
            style={{
              marginBottom: 16
            }}
          >
            Fast add
          </Button>
        </Space>
        {this.state.table ? (
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        ) : (
          <FormSizeDemo />
        )}
      </div>
    );
  }
}
