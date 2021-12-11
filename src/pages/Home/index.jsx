import './style.css';

import { useState } from 'react';
import { Button, Tooltip, Layout, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateModal } from '../../components/CreateModal';
import { ManageTable } from '../../components/ManageTable';

const { Header, Footer, Sider, Content } = Layout;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className="page-container">
      <Header>Use it before waste it!</Header>
      <Content>
        <ManageTable />
        <Tooltip title="Add a New Item" className="add-new-item">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={showModal}
          />
        </Tooltip>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <CreateModal />
        </Modal>
      </Content>
    </Layout>
  );
};

export default Home;
