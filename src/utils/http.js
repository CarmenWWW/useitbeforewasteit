import axios from 'axios';
import moment from 'moment';

import { Item } from '../models/item';

// TODO: replace API settings in json-server with real rest-api
const itemsUrl = 'http://localhost:3001/api/items';

// antd: 'ascend', 'descend' => json-server: 'asc', 'desc'
const orderMap = {
  ascend: 'asc',
  descend: 'desc',
};

const resultsPerQuery = 50;

export const getItemsByUsdaApi = async (queryString) => {
  try {
    // Try to replace queryString with `apple` and see what happened
    const foodAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${queryString}&pageSize=${resultsPerQuery}&api_key=ggFFpeOCoi18xuT9bDRR4dQWDbOiqVi5LkwySwUJ`;
    const rawData = await axios.get(foodAPI);
    const foods = rawData?.data?.foods;

    if (!foods || !foods.length) return [];

    const items = foods.map(
      (food, id) =>
        new Item({
          id,
          name: food['description'],
          brand: food['brandName'],
          category: food['foodCategory'],
          best_by: moment().format('YYYY-MM-DD'),
        })
    );

    return items;
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
