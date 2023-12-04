import { Router } from "express";

const viewsRouter = Router();
viewsRouter.get("/", (req, res) => {
  try {
    res.render("home.hbs");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  try {
    res.render("realTimeProducts.hbs");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default viewsRouter;