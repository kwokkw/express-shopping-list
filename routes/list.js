import express from "express";
import { ExpressError } from "../expressError.js";
import { items } from "../fakeDb.js";

export const router = express.Router();

router.get("/", function (req, res) {
  return res.send(items);
});

router.post("/", function (req, res, next) {
  try {
    if (!req.body.name || !req.body.price)
      throw new ExpressError("Name is required", 400);
    const newItem = {
      name: req.body.name,
      price: req.body.price,
    };
    items.push(newItem);

    return res.status(201).json({
      added: newItem,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:name", function (req, res, next) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) throw new ExpressError("Item not found", 404);
  return res.json(foundItem);
});

router.patch("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (!foundItem) throw new ExpressError("Item not found", 404);
  foundItem.name = req.body.name;
  return res.json({ updated: foundItem });
});

router.delete("/:name", function (req, res) {
  const idx = items.findIndex((item) => item.name === req.params.name);
  if (idx === -1) throw new ExpressError("Item not found", 404);

  items.splice(idx, 1);
  return res.json({ message: "Deleted" });
});
