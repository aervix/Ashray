import db from "../db/db.js";

const createHouse = async (req, res) => {
  try {
    const {
      rent,
      deposite,
      address,
      pincode,
      area,
      city,
      state,
      photo,
      availeble_date,
      owner,
      status,
      size,
      rules,
      is_verify,
    } = req.body;

    const addHouseQuery = `INSERT INTO houses
      (
        rent,
        deposite,
        address,
        pincode,
        area,
        city,
        state,
        photo,
        availeble_date,
        owner,
        status,
        size,
        rules,
        is_verify
      )
      VALUES (?)`;

    const addHouseParams = [
      rent,
      deposite,
      address,
      pincode,
      area,
      city,
      state,
      photo,
      availeble_date,
      owner,
      status,
      size,
      rules,
      is_verify,
    ];

    const [result] = await db.query(addHouseQuery, [addHouseParams]);

    const [newHouse] = await db.query("SELECT * FROM houses WHERE id = ?", [
      result.insertId,
    ]);

    return res.status(201).json({
      message: "House created successfully",
      data: newHouse[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateHouse = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      rent,
      deposite,
      address,
      pincode,
      area,
      city,
      state,
      photo,
      availeble_date,
      status,
      size,
      rules,
    } = req.body;

    const updateHouseQuery = `UPDATE houses
       SET
         rent = ?,
         deposite = ?,
         address = ?,
         pincode = ?,
         area = ?,
         city = ?,
         state = ?,
         photo = ?,
         availeble_date = ?,
         status = ?,
         size = ?,
         rules = ?
       WHERE id = ?`;

    const updateHouseParams = [
      rent,
      deposite,
      address,
      pincode,
      area,
      city,
      state,
      photo,
      availeble_date,
      status,
      size,
      rules,
      id,
    ];

    const [result] = await db.query(updateHouseQuery, [updateHouseParams]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "House not found",
      });
    }

    const [house] = await db.query("SELECT * FROM houses WHERE id = ?", [id]);

    return res.status(200).json({
      message: "House updated successfully",
      data: house[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const removeHouse = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM houses WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "House not found",
      });
    }

    return res.status(200).json({
      message: "House deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export { createHouse, updateHouse, removeHouse };
