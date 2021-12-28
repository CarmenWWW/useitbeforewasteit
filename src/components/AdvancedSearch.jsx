/* USDA Food API: 
Food API Doc: https://fdc.nal.usda.gov/api-spec/fdc_api.html#/FDC/getFoodsSearch
Food API: https://api.nal.usda.gov/fdc/v1/foods/search?query={search-string}&pageSize=20&api_key=ggFFpeOCoi18xuT9bDRR4dQWDbOiqVi5LkwySwUJ
*/

import { useState } from 'react';
import { Input, Button, Table, Modal } from 'antd';
import { Item } from '../models/item';
import { getItemsByUsdaApi } from '../utils/http';
import { CreateForm } from './CreateForm';

const { Search } = Input;

export const AdvancedSearch = ({ onFinish }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: '',
      render: (_, row) => {
        return (
          <Button type="primary" onClick={() => showCreatingModal(row)}>
            Add
          </Button>
        );
      },
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [isCreatingModalVisible, setIsCreatingModalVisible] = useState(false);
  const [creatingItem, setCreatingItem] = useState(null);

  const showCreatingModal = (item) => {
    setCreatingItem(new Item(item));
    setIsCreatingModalVisible(true);
  };

  const handleCreatingOk = () => {
    setCreatingItem(null);
    setIsCreatingModalVisible(false);
    onFinish();
  };

  const handleCreatingCancel = () => {
    setCreatingItem(null);
    setIsCreatingModalVisible(false);
  };

  async function onSearch(queryString) {
    const items = await getItemsByUsdaApi(queryString);
    setTableData(items);
  }

  return (
    <>
      {/* TODO: search using USDA Food API */}
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{ width: 400, marginBottom: 20 }}
      />
      {tableData ? <Table columns={columns} dataSource={tableData} /> : null}
      <Modal
        title="Create Item"
        visible={isCreatingModalVisible}
        onOk={handleCreatingOk}
        onCancel={handleCreatingCancel}
        footer={null}
      >
        {isCreatingModalVisible ? (
          <CreateForm
            initialValues={creatingItem}
            onFinish={handleCreatingOk}
          />
        ) : null}
      </Modal>
    </>
  );
};
