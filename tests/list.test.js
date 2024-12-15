import request from "supertest";
import app from "../app.js";
import { items } from "../fakeDb";

// Add mock data
beforeEach(() => {
  items.length = 0;
  items.push({ name: "apple", price: 2.99 });
});

// Reset items
afterEach(() => {
  items.length = 0;
});

describe("GET /list", () => {
  test("Should return all items in the list", async () => {
    const res = await request(app).get("/list");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: "apple", price: 2.99 }]);
  });

  test("Should return an empty array if no items exist", async () => {
    items.length = 0; // Clear items
    const res = await request(app).get("/list");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe("POST /list", () => {
  test("Should add a new item", async () => {
    const newItem = { name: "orange", price: 3.4 };
    const res = await request(app).post("/list").send(newItem);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: newItem });
    expect(items).toContainEqual(newItem);
  });

  test("Should return 400 for missing name", async () => {
    const response = await request(app).post("/list").send({ price: 2.99 });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Name is required");
  });
});

describe("GET /list/:name", () => {
  test("Should return the correct item", async () => {
    const response = await request(app).get("/list/apple");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: "apple", price: 2.99 });
  });

  test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/list/icecream`);
    expect(res.statusCode).toBe(404);
  });
});

describe("PATCH /list", () => {
  test("should update an item", async () => {
    const updatedItem = { name: "new apple", price: 2.99 };
    const res = await request(app).patch("/list/apple").send(updatedItem);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: updatedItem });
    expect(items).toContainEqual(updatedItem);
  });

  test("Responds with 404 for invalid name", async () => {
    const res = await request(app)
      .patch(`/list/pickle`)
      .send({ name: "Monster" });
    expect(res.statusCode).toBe(404);
  });
});

describe("/DELETE /list/:name", () => {
  test("Should remove an item", async () => {
    const res = await request(app).delete("/list/apple");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
    expect(items).not.toContainEqual({ name: "apple", price: 2.99 });
  });

  test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/list/watermelon`);
    expect(res.statusCode).toBe(404);
  });
});
