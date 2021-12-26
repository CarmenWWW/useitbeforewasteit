/* USDA Food API: 
Food API Doc: https://fdc.nal.usda.gov/api-spec/fdc_api.html#/FDC/getFoodsSearch
Food API: https://api.nal.usda.gov/fdc/v1/foods/search?query={search-string}&pageSize=20&api_key=ggFFpeOCoi18xuT9bDRR4dQWDbOiqVi5LkwySwUJ
*/

import { useState, useEffect } from 'react';
import { Input, Button, Table, Modal } from 'antd';
import { Item } from '../models/item';
import { getItems, sortItemsByField } from '../utils/http';
import { CreateForm } from './CreateForm';

const { Search } = Input;

export const ManageTable = ({ dataVersion }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Operations',
      render: (text, row, index) => {
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
    setIsCreatingModalVisible(false);
    fetchTableData();
  };

  const handleCreatingCancel = () => {
    setCreatingItem(null);
    setIsCreatingModalVisible(false);
  };

  async function fetchTableData() {
    const items = await getItems();
    setTableData(items);
  }

  async function onChange(pagination, filters, sorter, extra) {
    console.log('sorter:', sorter);
    const items = await sortItemsByField(sorter.field, sorter.order);
    setTableData(items);
  }

  useEffect(() => {
    fetchTableData();
  }, [dataVersion]);

  const onSearch = () => {};

  return (
    <>
      {/* TODO: search using USDA Food API */}
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{ width: 600 }}
      />
      <Table columns={columns} dataSource={tableData} onChange={onChange} />;
      <Modal
        title="Create Item"
        visible={isCreatingModalVisible}
        onOk={handleCreatingOk}
        onCancel={handleCreatingCancel}
        footer={null}
      >
        {isCreatingModalVisible ? (
          // TODO: add new prop to fulfill initial values, just like UpdateForm
          <CreateForm item={creatingItem} onFinish={handleCreatingOk} />
        ) : null}
      </Modal>
    </>
  );
};
