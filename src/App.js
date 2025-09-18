import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Form, Input, Button, Spin } from "antd";
import UserCard from "./components/UserCard";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      ...user,
      company: user.company?.name || "", // only use company name for form field
    });
    setIsModalVisible(true);
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const updatedUsers = users.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              ...values,
              company: { ...u.company, name: values.company }, // keep object format
            }
          : u
      );
      setUsers(updatedUsers);
      setIsModalVisible(false);
      setEditingUser(null);
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Profiles (Advanced)</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {users.map((user) => (
            <Col xs={24} sm={12} md={8} key={user.id}>
              <UserCard user={user} onEdit={() => handleEdit(user)} />
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title="Edit User"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdate}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Company" name="company">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
