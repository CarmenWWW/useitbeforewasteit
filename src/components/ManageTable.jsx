import { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import { Item } from '../models/item';
import { getItems, sortItemsByField } from '../utils/http';
import { ItemDetails } from './ItemDetails';

export const ManageTable = ({ dataVersion }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category - b.category,
    },
    {
      title: 'Best By',
      dataIndex: 'best_by',
      sorter: (a, b) => a.best_by - b.best_by,
    },
    {
      title: 'Label',
      dataIndex: 'label',
    },
    {
      title: 'Image',
      dataIndex: 'image',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Operations',
      render: (text, row, index) => {
        return (
          <>
            <Button type="primary" onClick={() => showModal()}>
              Update
            </Button>
            &nbsp;
            <Button type="primary" danger onClick={() => showModal()}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const [tableData, setTableData] = useState([]);

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

  return (
    <>
      <Table columns={columns} dataSource={tableData} onChange={onChange} />;
      <Modal
        title="New Item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ItemDetails />
      </Modal>
    </>
  );
};
