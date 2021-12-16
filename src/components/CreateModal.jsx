import { Form, Input, Button, Select, DatePicker } from 'antd';



export const CreateModal = () => {
  const { Option } = Select;

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };


  const TimeRelatedForm = () => {
    const onFinish = (fieldsValue) => {
      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const rangeTimeValue = fieldsValue['range-time-picker'];
      const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      };
      console.log('Received values of form: ', values);
    };
  };

  return (
    <Form
      name="New Item"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}

      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="Name"
        rules={[
          {
            required: true,
            message: 'Please input the item name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Category"
        label="Category"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a category"
          allowClear
        >
          <Option value="Dairy and Eggs">Dairy and Eggs</Option>
          <Option value="Vegetables and Fruits">Vegetables and Fruits</Option>
          <Option value="Meat and Seafood">Meat and Seafood</Option>
          <Option value="Deli and Prepared Foods">Deli and Prepared Foods</Option>
          <Option value="Beverages">Beverages</Option>
          <Option value="Snacks and Candy">Snacks and Candy</Option>
          <Option value="Frozen">Frozen</Option>
          <Option value="Bakery">Bakery</Option>
          <Option value="Dry Goods">Dry Goods</Option>
          <Option value="Condiments and Sauces">Condiments and Sauces</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>


      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.Category !== currentValues.Category}
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
        name="Best By"
        label="Best by"
        rules={[
          {
            
            required: true,
          },
        ]}>
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Label"
        name="Label"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Brand"
        name="Brand"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Operations"
        name="Operations"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input/>
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
