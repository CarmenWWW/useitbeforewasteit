import { Form, Input, Button, Select, DatePicker } from 'antd';
import { Item } from '../models/item';
import { createItem } from '../utils/http';

import { Categories } from './Categories';

export const CreateModal = ({ onFinish }) => {
  const onSubmit = async (values) => {
    const date = values.best_by.format('YYYY-MM-DD');
    const item = new Item({
      ...values,
      best_by: date,
    });
    await createItem(item);
    onFinish(values);
  };

  // const TimeRelatedForm = () => {
  //   const onFinish = (fieldsValue) => {
  //     // Should format date value before submit.
  //     const rangeValue = fieldsValue['range-picker'];
  //     const rangeTimeValue = fieldsValue['range-time-picker'];
  //     const values = {
  //       ...fieldsValue,
  //       'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
  //     };
  //     console.log('Received values of form: ', values);
  //   };
  // };

  return (
    <Form
      name="New Item"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
