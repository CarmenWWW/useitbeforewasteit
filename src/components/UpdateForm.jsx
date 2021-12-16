import { Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import { useEffect } from 'react/cjs/react.development';
import { Item } from '../models/item';
import { updateItem } from '../utils/http';
import { Categories } from './Categories';

export const UpdateForm = ({ item, onFinish }) => {
  const onSubmit = async (values) => {
    const newItem = new Item({
      ...values,
      id: item.id,
      best_by: values.best_by.format('YYYY-MM-DD'),
    });
    await updateItem(newItem);
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
      name="Update Item"
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
        <DatePicker format="YYYY-MM-DD" />
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
