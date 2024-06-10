import express from "express";
import axios, { AxiosResponse } from "axios";
import Error from "../interfaces/Error";

const router = express.Router();

const fetchData = async () => {
  const url =
    "https://lereacteur-bootcamp-api.herokuapp.com/api/deliveroo/menu/paris/3eme-temple/sub-arc-subway-rambuteau?day=today&geohash=u09wj8rk5bqr&time=ASAP";
  const config = {
    headers: { Authorization: `Bearer ${process.env.DELIVEROO_TOKEN}` },
  };

  try {
    const response = await axios.get(url, config);
    return response.data.items;
  } catch (error: unknown) {
    throw {
      status: (error as Error).status || 404,
      message:
        (error as Error).message || "Problem to fetch datas from Deliveroo API",
    };
  }
};

let fetchedData: AxiosResponse<any, any>;

router.get("/deliveroo", async (req, res) => {
  try {
    if (!fetchedData) {
      fetchedData = await fetchData();
    }
    res.status(200).json(fetchedData);
  } catch (error: unknown) {
    res
      .status((error as Error).status || 500)
      .json({ message: (error as Error).message || "Internal server error" });
  }
});

export default router;
