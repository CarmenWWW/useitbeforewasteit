import axios from 'axios';

import { Item } from '../models/item';

const itemsUrl = 'http://localhost:3001/api/items';

// antd: 'ascend', 'descend' => json-server: 'asc', 'desc'
const orderMap = {
  ascend: 'asc',
  descend: 'desc',
};

export const getItems = async () => {
  try {
    const { data: rawData } = await axios.get(itemsUrl);
    const items = rawData.map((v) => new Item(v));
    return items;
  } catch (e) {
    console.error(e);
  }
};

export const sortItemsByField = async (field = 'name', order) => {
  if (!order) {
    return getItems();
  }

  try {
    const serverOrderKey = orderMap[order];
    const { data: rawData } = await axios.get(
      `${itemsUrl}?_sort=${field}&_order=${serverOrderKey}`
    );
    const items = rawData.map((v) => new Item(v));
    return items;
  } catch (e) {
    console.error(e);
  }
};

export const createItem = async (item) => {
  try {
    const formattedItem = new Item(item);
    const { data: rawData } = await axios.post(itemsUrl, formattedItem);
    console.log(rawData);
  } catch (e) {
    console.error(e);
  }
};

export const getItemById = (id) => {
  axios
    .get(`http://localhost:3001/api/items/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};
