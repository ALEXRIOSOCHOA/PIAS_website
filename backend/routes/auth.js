import express from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const router = express.Router();

// Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
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
      state_id,
      municipality_id,
      organisation_name,
      belongsSabOrg,
      belongs_other_org,
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
    const id = uuidv4();
    // Crear usuario
    const userResult = await pool.query(
      `INSERT INTO pias_users
      (id, full_name, email, password_hash, phone, state_id, municipality_id, organisation_name, belongs_sab_org, belongs_other_org)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING id, email`,
      [
        id,
        full_name,
        email,
        hash,
        phone,
        state_id,
        municipality_id,
        organisation_name,
        belongsSabOrg,
        belongs_other_org,
      ]
    );

    const user = userResult.rows[0];

    // Generar código de verificación
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const idEmail = uuidv4();
    // Guardar en tabla de verificación
    await pool.query(
      `INSERT INTO pias_email_verifications
      (id,user_id, verification_code, expires_at)
      VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes')`,
      [idEmail, user.id, code]
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
       WHERE user_id = $1 AND verification_code = $2 AND verified = false`,
      [user.id, String(code)]
    );

    const verify = verifyResult.rows[0];

    console.log("verify:", verify);

    if (verifyResult.rows.length === 0)
      return res.status(400).json({ error: "Invalid or expired code" });

    // Marcar como verificado
    await pool.query(
      "UPDATE pias_users SET email_verified = true WHERE id = $1",
      [user.id]
    );

    await pool.query(
      "UPDATE pias_email_verifications SET verified = true WHERE id = $1",
      [verifyResult.rows[0].id]
    );

    // Crear token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Email verified", token, "verified": true });
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
