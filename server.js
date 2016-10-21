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

function getID(req) {
  const id = parseInt(req.params.id, 10);
  if (!id) return null;
  return id;
}

app.get('/items', (request, response) => {
  response.json(storage.items);
});

app.post('/items', jsonParser, (request, response) => {
  if ('id' in request.body) {
    response.sendStatus(400);
    return;
  }
  if (!('name' in request.body)) {
    response.sendStatus(400);
    return;
  }

  const item = storage.add(request.body.name);
  response.status(201).json(item);
});

app.delete('/items/:id', (request, response) => {
  const id = getID(request);
  if (!id) {
    response.sendStatus(400);
    return;
  }
  const item = storage.remove(id);
  if (item) {
    response.sendStatus(204);
    return;
  }
  response.sendStatus(404);
});

app.put('/items/:id', jsonParser, (request, response) => {
  const id = getID(request);
  if (!id) {
    response.sendStatus(400);
    return;
  }
  const newItem = request.body;
  if (id !== parseInt(newItem.id, 10)) {
    response.sendStatus(400);
    return;
  }
  if (storage.update(id, newItem)) {
    response.sendStatus(200);
    return;
  }
  response.sendStatus(400);
});

app.listen(process.env.PORT || 8080, process.env.IP);

exports.app = app;
exports.storage = storage;
