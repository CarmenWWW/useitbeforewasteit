import { Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { Item } from '../models/item';
import { deleteItem } from '../utils/http';
import { Categories } from './Categories';

export const DeleteForm = ({ item, onFinish }) => {
  const onSubmit = async (values) => {
    const newItem = new Item({
      ...values,
      id: item.id,
      best_by: values.best_by.format('YYYY-MM-DD'),
    });
    await deleteItem(newItem);
    onFinish(values);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...item,
      best_by: moment(item.best_by, 'YYYY-MM-DD'),
    });
  }, [form, item]);

  return (
    <Form
      form={form}
      name="Delete Item"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        ...item,
        best_by: moment(item.best_by, 'YYYY-MM-DD'),
      }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the item name.',
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: 'Please choose the category.',
          },
        ]}
      >
        <Select placeholder="Select a category" allowClear disabled>
          {Categories}
        </Select>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.Category !== currentValues.Category
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('Category') === 'other' ? (
            <Form.Item
              name="customizeCategory"
              label="Customize Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item
        label="Best by"
        name="best_by"
        rules={[
          {
            required: true,
            message: 'Please choose the best by date.',
          },
        ]}
      >
        <DatePicker format="YYYY-MM-DD" disabled />
      </Form.Item>

      <Form.Item label="Label" name="label">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Brand" name="brand">
        <Input disabled />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" danger>
          I'm confirmed to delete this item.
        </Button>
      </Form.Item>
    </Form>
  );
};
