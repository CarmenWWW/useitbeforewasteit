import { useState, useEffect } from 'react';
import { Button, Table, Modal, Tag } from 'antd';
import { BulbTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { Item } from '../models/item';
import { getItems, sortItemsByField } from '../utils/http';
import { UpdateForm } from './UpdateForm';
import { DeleteForm } from './DeleteForm';
import { Recommendation } from './Recommendation';

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
      title: 'Expired',
      render: (_, item) => {
        // TODO: normal: green, expired in 3 days: yellow, expired: red
        const msPerDay = 24 * 3600 * 1000;
        let tagColor = 'green';
        const diff = moment(item.best_by, 'YYYY-MM-DD') - moment.now();
        if (diff < 0) {
          tagColor = 'red';
        } else if (diff / msPerDay < 3) {
          tagColor = 'orange';
        }
        return (
          <Tag color={tagColor}>
            {moment(item.best_by, 'YYYY-MM-DD').fromNow()}
          </Tag>
        );
      },
    },
    {
      title: 'Label',
      dataIndex: 'label',
      render: (_, item) => {
        return item.label ? <Tag color="blue">{item.label}</Tag> : null;
      },
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
            <BulbTwoTone
              twoToneColor="#ffa500"
              onClick={() => showRecommendationModal(row)}
            />{' '}
            <Button type="primary" onClick={() => showUpdatingModal(row)}>
              Update
            </Button>{' '}
            <Button
              type="primary"
              danger
              onClick={() => showDeletingModal(row)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [isUpdatingModalVisible, setIsUpdatingModalVisible] = useState(false);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [isDeletingModalVisible, setIsDeletingModalVisible] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isRecommendationModalVisible, setIsRecommendationModalVisible] =
    useState(false);
  const [recommendationItem, setRecommendationItem] = useState(null);

  const showUpdatingModal = (item) => {
    setUpdatingItem(new Item(item));
    setIsUpdatingModalVisible(true);
  };

  const handleUpdatingOk = () => {
    setIsUpdatingModalVisible(false);
    fetchTableData();
  };

  const handleUpdatingCancel = () => {
    setUpdatingItem(null);
    setIsUpdatingModalVisible(false);
  };

  const showDeletingModal = (item) => {
    setDeletingItem(new Item(item));
    setIsDeletingModalVisible(true);
  };

  const handleDeletingOk = () => {
    setIsDeletingModalVisible(false);
    fetchTableData();
  };

  const handleDeletingCancel = () => {
    setDeletingItem(null);
    setIsDeletingModalVisible(false);
  };

  const showRecommendationModal = (item) => {
    setRecommendationItem(item);
    setIsRecommendationModalVisible(true);
  };

  const handleRecommendationOk = () => {
    setRecommendationItem(null);
    setIsRecommendationModalVisible(false);
  };

  const handleRecommendationCancel = () => {
    setRecommendationItem(null);
    setIsRecommendationModalVisible(false);
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
        visible={isUpdatingModalVisible}
        onOk={handleUpdatingOk}
        onCancel={handleUpdatingCancel}
        footer={null}
      >
        {isUpdatingModalVisible ? (
          <UpdateForm item={updatingItem} onFinish={handleUpdatingOk} />
        ) : null}
      </Modal>
      <Modal
        title="Delete Item"
        visible={isDeletingModalVisible}
        onOk={handleDeletingOk}
        onCancel={handleDeletingCancel}
        footer={null}
      >
        {isDeletingModalVisible ? (
          <DeleteForm item={deletingItem} onFinish={handleDeletingOk} />
        ) : null}
      </Modal>
      <Modal
        title="Recommend Recipe"
        visible={isRecommendationModalVisible}
        onOk={handleRecommendationOk}
        onCancel={handleRecommendationCancel}
        footer={null}
      >
        {isRecommendationModalVisible ? (
          <Recommendation item={recommendationItem} />
        ) : null}
      </Modal>
    </>
  );
};
