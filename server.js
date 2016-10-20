const express = require('express');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const Storage = {
  add(name) {
    const item = { name, id: this.setId };
    this.items.push(item);
    this.setId += 1;
    return item;
  },

  get(id) {
    for (const item of this.items) {
      if (item.id === id) {
        return item;
      }
    }
    return null;
  },

  update(id, item) {
    if (item && item.id && item.name) {
      if (id !== item.id) return false;
      const curItem = this.get(id);
      if (curItem) {
        curItem.name = item.name;
        return true;
      }
      this.add(item.name);
      return true;
    }
    return false;
  },

  remove(id) {
    const item = this.get(id);
    if (!item) return false;
    for (let i = 0; i < this.items.length; i += 1) {
      if (this.items[i].id === id) {
        this.items.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};

const createStorage = function createStorage() {
  const storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
};

const storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

const app = express();
app.use(express.static('public'));

app.get('/items', (request, response) => {
  response.json(storage.items);
});

app.post('/items', jsonParser, (request, response) => {
  if (!('name' in request.body)) {
    response.sendStatus(400);
    return;
  }

  const item = storage.add(request.body.name);
  response.status(201).json(item);
});

app.delete('/items/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  if (isNaN(id)) response.status(404);
  const item = storage.remove(id);
  if (item) {
    response.status(200).json(null);
    return;
  }
  response.status(404);
});

app.put('/items/:id', jsonParser, (request, response) => {
  const id = parseInt(request.params.id, 10);
  if (isNaN(id) || !storage.update(id, request.body)) {
    response.status(400);
    return;
  }
  response.status(200);
});

app.listen(process.env.PORT || 8080, process.env.IP);

exports.app = app;
exports.storage = storage;
