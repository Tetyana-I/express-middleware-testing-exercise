process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
const items = require('../fakeDb');

const popsicle = { name: "popsicle", price: 1.45};
const cheerios = { name: "cheerios", price: 3.40};
let newItem;


beforeEach(function() {
    items.push(popsicle, cheerios);
});
afterEach(function() {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get a list of all shopping items", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ items: [popsicle, cheerios] });
    })
});

describe("POST /items", () => {
    test("Creates an item ", async () => {
        newItem = {name: "Milk", price: "2.50"};
        const res = await request(app).post("/items").send(newItem);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added: newItem});
    });

    test("Responds with 400 if name is missing", async () => {
        const res = await request(app).post("/items").send({price: 4.50});
        expect(res.body).toEqual({error: { message: "Name is required", status: 400 }});
    });

    test("Responds with 400 if price is missing", async () => {
        const res = await request(app).post("/items").send({name: "Lindor"});
        expect(res.body).toEqual({error: { message: "Price is required", status: 400 }});
    });

    test("Responds with 400 if name is already in the list", async () => {
        const res = await request(app).post("/items").send({name: "popsicle", price: "5.00"});
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({error: { message: "This item is already in the list", status: 400 }});
    });
});

describe("GET /items/:name", () => {
    test("Get an item by name", async () => {
      const res = await request(app).get(`/items/${popsicle.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
    });

    test("Responds with 404 for invalid item", async () => {
      const res = await request(app).get(`/items/milk`);
      expect(res.statusCode).toBe(404);
    })
});
  
describe("/PATCH /items/:name", () => {
    test("Updating an item's name", async () => {
      const res = await request(app).patch(`/items/${popsicle.name}`).send({ name: "bobsicle" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({updated: {name: "bobsicle", price: 1.45}});
    })
    test("Responds with 404 for invalid name", async () => {
      const res = await request(app).patch(`/items/chocolate`).send({ name: "lindor" });
      expect(res.statusCode).toBe(404);
    })
});
  
describe("/DELETE /items/:name", () => {
    test("Deleting an item", async () => {
      const res = await request(app).delete(`/items/${popsicle.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Deleted' })
    })
    test("Responds with 404 for deleting invalid cat", async () => {
      const res = await request(app).delete(`/items/ham`);
      expect(res.statusCode).toBe(404);
    })
});  
  