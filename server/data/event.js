const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.tasks) {
    throw new NotFoundError('Could not find any task.');
  }
  return storedData.tasks;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.tasks || storedData.tasks.length === 0) {
    throw new NotFoundError('Could not find any task.');
  }

  const task = storedData.tasks.find((ta) => ta.id === id);
  if (!task) {
    throw new NotFoundError('Could not find task for id ' + id);
  }

  return task;
}

async function add(data) {
  const storedData = await readData();
  storedData.tasks.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.tasks || storedData.tasks.length === 0) {
    throw new NotFoundError('Could not find any tasks.');
  }

  const index = storedData.tasks.findIndex((ta) => ta.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find tasks for id ' + id);
  }

  storedData.tasks[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.tasks.filter((ta) => ta.id !== id);
  await writeData({ ...storedData, tasks: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;