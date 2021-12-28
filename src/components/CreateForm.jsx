import { useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { Item } from '../models/item';
import { createItem } from '../utils/http';
import { Categories } from './Categories';

export const CreateForm = ({ initialValues, onFinish }) => {
  const onSubmit = async (values) => {
    const date = values.best_by.format('YYYY-MM-DD');
    const item = new Item({
      ...values,
      id: null,
      best_by: date,
    });
    await createItem(item);
    onFinish(values);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...initialValues,
      best_by: null,
    });
  }, [form, initialValues]);

  return (
    <Form
      form={form}
      name="Create Item"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        ...initialValues,
        id: null,
        best_by: null,
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
        <Input />
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
        <Select placeholder="Select a category" allowClear>
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
              <Input />
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
        <DatePicker />
      </Form.Item>

      <Form.Item label="Label" name="label">
        <Input />
      </Form.Item>

      <Form.Item label="Brand" name="brand">
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
