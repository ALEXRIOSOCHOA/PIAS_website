import express from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📌 REGISTRO (SE HACE AL FINAL DE LOS 7 PASOS)
router.post("/register", async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      phone,
      type_id,
      state_id,
      municipality_id,
      belongs_other_org,
      organisation_name,
    } = req.body;

    // Verificar si ya existe
    const exists = await pool.query(
      "SELECT * FROM pias_users WHERE email = $1",
      [email]
    );

    if (exists.rows.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    // Hashear contraseña
    const hash = await bcrypt.hash(password, 10);

    // Crear usuario
    const userResult = await pool.query(
      `INSERT INTO pias_users
      (full_name, email, password_hash, phone, type_id, state_id, municipality_id, belongs_other_org, organisation_name)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id, email`,
      [
        full_name,
        email,
        hash,
        phone,
        type_id,
        state_id,
        municipality_id,
        belongs_other_org,
        organisation_name,
      ]
    );

    const user = userResult.rows[0];

    // Generar código de verificación
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Guardar en tabla de verificación
    await pool.query(
      `INSERT INTO pias_email_verifications
      (user_id, verification_code, expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '10 minutes')`,
      [user.id, code]
    );

    // Enviar email
    await transporter.sendMail({
      from: `"PIAS Registration" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      html: `<p>Your 6-digit verification code is:<br><br>
             <b style="font-size:22px">${code}</b></p>`,
    });

    res.json({ message: "User created, verification email sent" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📌 VERIFICAR CÓDIGO
router.post("/verify", async (req, res) => {
  const { email, code } = req.body;

  try {
    // Buscar usuario
    const userResult = await pool.query(
      "SELECT * FROM pias_users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = userResult.rows[0];

    // Buscar código
    const verifyResult = await pool.query(
      `SELECT * FROM pias_email_verifications
       WHERE user_id = $1 AND verification_code = $2 AND verified = FALSE`,
      [user.id, code]
    );

    if (verifyResult.rows.length === 0)
      return res.status(400).json({ error: "Invalid or expired code" });

    // Marcar como verificado
    await pool.query(
      "UPDATE pias_users SET email_verified = TRUE WHERE id = $1",
      [user.id]
    );

    await pool.query(
      "UPDATE pias_email_verifications SET verified = TRUE WHERE id = $1",
      [verifyResult.rows[0].id]
    );

    // Crear token
    const token = jwt.sign(
      { id: user.id, email: user.email, type_id: user.type_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Email verified", token });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📌 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM pias_users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = result.rows[0];

    if (!user.email_verified)
      return res.status(403).json({ error: "Email not verified" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, type_id: user.type_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
