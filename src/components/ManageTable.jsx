import { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import { Item } from '../models/item';
import { getItems, sortItemsByField } from '../utils/http';
import { UpdateForm } from './UpdateForm';

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
            <Button type="primary" onClick={() => showModal(row)}>
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
  const [updatingItem, setUpdatingItem] = useState(null);

  const showModal = (item) => {
    setUpdatingItem(new Item(item));
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    fetchTableData();
  };

  const handleCancel = () => {
    setUpdatingItem(null);
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
        title="Update Item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {isModalVisible ? (
          <UpdateForm item={updatingItem} onFinish={handleOk} />
        ) : null}
      </Modal>
    </>
  );
};
