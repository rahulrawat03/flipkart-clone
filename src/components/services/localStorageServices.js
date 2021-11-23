import items from "./data";

const ITEMS_KEY = "cartItems";
const CURRENT_USER = "currentUser";
const USERS_KEY = "users";

const getStoredObject = (KEY) => {
  let products = localStorage.getItem(KEY);
  if (!products) return {};
  return JSON.parse(products);
};

const storeObject = (object, KEY) => {
  const objectString = JSON.stringify(object);
  localStorage.setItem(KEY, objectString);
};

export const getItems = (email) => {
  const object = getStoredObject(email + ITEMS_KEY);
  const products = Object.keys(object).map((id) => ({
    product: items[id - 1],
    count: object[id],
  }));
  return products;
};

export const getCountOfItems = (email, id) => {
  return getStoredObject(email + ITEMS_KEY)[id];
};

export const storeItems = (email, id) => {
  let products = getStoredObject(email + ITEMS_KEY);
  if (products[id]) products[id] = products[id] + 1;
  else products[id] = 1;

  storeObject(products, email + ITEMS_KEY);
};

export const removeOneUnit = (email, id) => {
  let products = getStoredObject(email + ITEMS_KEY);
  if (products[id] > 1) products[id] = products[id] - 1;
  else delete products[id];

  storeObject(products, email + ITEMS_KEY);
};

export const removeAllUnits = (email, id) => {
  let products = getStoredObject(email + ITEMS_KEY);
  delete products[id];

  storeObject(products, email + ITEMS_KEY);
};

export const registerUser = (email, name, password) => {
  let users = getStoredObject(USERS_KEY);
  if (users[email]) return true;

  users[email] = { name, password };
  storeObject(users, USERS_KEY);
};

export const validateUser = (email, password) => {
  const users = getStoredObject(USERS_KEY);
  return users[email]?.password === password;
};

export const setCurrentUser = (email, name, password) => {
  storeObject({ email, name, password }, CURRENT_USER);
};

export const getUser = () => {
  return getStoredObject(CURRENT_USER);
};

export const getUserWithEmail = (email) => {
  return getStoredObject(USERS_KEY)[email];
};

export const removeUser = () => {
  storeObject({}, CURRENT_USER);
};
