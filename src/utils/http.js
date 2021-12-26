import axios from 'axios';

import { Item } from '../models/item';

// TODO: replace API settings in json-server with real rest-api
const itemsUrl = 'http://localhost:3001/api/items';

// antd: 'ascend', 'descend' => json-server: 'asc', 'desc'
const orderMap = {
  ascend: 'asc',
  descend: 'desc',
};

export const getItemsByFoodAPI = async (searchString) => {
  try {
    // Try to replace searchString with `apple` and see what happened
    const foodAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchString}&pageSize=20&api_key=ggFFpeOCoi18xuT9bDRR4dQWDbOiqVi5LkwySwUJ`;
    const { data: rawData } = await axios.get(foodAPI);
    // TODO: clean data: extract description, brand name, or even food category
  } catch (e) {
    console.error(e);
  }
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
    await axios.post(itemsUrl, formattedItem);
  } catch (e) {
    console.error(e);
  }
};

export const updateItem = async (item) => {
  try {
    const formattedItem = new Item(item);
    await axios.put(`${itemsUrl}/${item.id}`, formattedItem);
  } catch (e) {
    console.error(e);
  }
};

export const deleteItem = async (item) => {
  try {
    await axios.delete(`${itemsUrl}/${item.id}`);
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
