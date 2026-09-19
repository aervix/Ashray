import db from "../db/db.js";

const getAllHouses = async (req, res) => {
  try {
    const getAllHousesQuery = `
      SELECT *
      FROM houses
      ORDER BY created_at DESC
    `;
    const [houses] = await db.query(getAllHousesQuery);

    return res.status(200).json({
      message: "Houses fetched successfully",
      count: houses.length,
      data: houses,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getHouseById = async (req, res) => {
  try {
    const { id } = req.params;

    const getHousesByIdQuery = "SELECT * FROM houses WHERE id = ?";
    const [houses] = await db.query(getHousesByIdQuery, [id]);

    if (houses.length === 0) {
      return res.status(404).json({
        message: "House not found",
      });
    }

    return res.status(200).json({
      message: "House fetched successfully",
      data: houses[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export { getAllHouses, getHouseById };
