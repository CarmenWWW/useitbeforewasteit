import { Select } from 'antd';

const { Option } = Select;

const categoryNames = [
  'Dairy and Eggs',
  'Vegetables and Fruits',
  'Meat and Seafood',
  'Deli and Prepared Foods',
  'Beverages',
  'Snacks and Candy',
  'Frozen',
  'Bakery',
  'Dry Goods',
  'Condiments and Sauces',
  'other',
];

export const Categories = categoryNames.map((name) => (
  <Option key={name} value={name}>
    {name}
  </Option>
));
