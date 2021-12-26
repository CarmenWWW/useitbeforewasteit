import './style.css';

import { useState } from 'react';
import { Button, Tooltip, Layout, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateForm } from '../../components/CreateForm';
import { ManageTable } from '../../components/ManageTable';

const { Header, Footer, Sider, Content } = Layout;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setDataVersion(dataVersion + 1);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClick = () => {};

  return (
    <Layout className="page-container">
      <Header>
        Use it before waste it!{' '}
        <Button onClick={showModal}>Advanced Search</Button>
      </Header>
      <Content>
        <ManageTable dataVersion={dataVersion} />
        <Tooltip title="Add a New Item" className="add-new-item">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={showModal}
          />
        </Tooltip>
        <Modal
          title="Create New Item"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <CreateForm onFinish={handleOk} />
        </Modal>
        <Modal
          title="Advanced Search"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <CreateForm onFinish={handleOk} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default Home;
