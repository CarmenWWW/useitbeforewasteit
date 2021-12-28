import './style.css';

import { useState } from 'react';
import { Button, Tooltip, Layout, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateForm } from '../../components/CreateForm';
import { AdvancedSearch } from '../../components/AdvancedSearch';
import { ManageTable } from '../../components/ManageTable';

const { Header, Content } = Layout;

const Home = () => {
  const [dataVersion, setDataVersion] = useState(0);

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateOk = () => {
    setIsCreateModalVisible(false);
    setDataVersion(dataVersion + 1);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  const showSearchModal = () => {
    setIsSearchModalVisible(true);
  };

  const handleSearchOk = () => {
    setIsSearchModalVisible(false);
    setDataVersion(dataVersion + 1);
  };

  const handleSearchCancel = () => {
    setIsSearchModalVisible(false);
  };

  return (
    <Layout className="page-container">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>Use it before waste it! </span>
        <Button type="primary" onClick={showSearchModal}>
          Advanced Search
        </Button>
      </Header>
      <Content>
        <ManageTable dataVersion={dataVersion} />
        <Tooltip title="Add a New Item" className="add-new-item">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={showCreateModal}
          />
        </Tooltip>
        <Modal
          title="Create New Item"
          visible={isCreateModalVisible}
          onOk={handleCreateOk}
          onCancel={handleCreateCancel}
          footer={null}
        >
          <CreateForm onFinish={handleCreateOk} />
        </Modal>
        <Modal
          title="Advanced Search"
          visible={isSearchModalVisible}
          onOk={handleSearchOk}
          onCancel={handleSearchCancel}
          footer={null}
        >
          <AdvancedSearch onFinish={handleCreateOk} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default Home;
