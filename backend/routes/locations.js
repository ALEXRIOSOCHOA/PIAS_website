import express from "express";
import { pool } from "../db.js"; // tu conexión

const router = express.Router();

router.get("/states", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM pias_states ORDER BY name ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("STATES ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/municipalities/:state_id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM pias_municipalities WHERE state_id = $1 ORDER BY name ASC",
      [req.params.state_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("MUNICIPALITIES ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/organisations", async (req, res) => {
  try {
    const query = `
      SELECT "Id" AS id, "Name" AS name
      FROM "Sab_Organizations"
      ORDER BY "Name" ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows); // Devuelve [{id, name}, ...]
  } catch (err) {
    console.error("Error fetching organisations:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
