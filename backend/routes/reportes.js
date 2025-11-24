import express from "express";
import { pool } from "../db.js"; // tu conexión

const router = express.Router();

// GET /api/reports
router.get("/reports", async (req, res) => {
  try {
    // Consulta SQL para seleccionar todos los reportes
    // Asegúrate de que los nombres de las columnas coincidan con los nombres que espera tu frontend:
    // user, modelId, activityId, organization, state, creationDate
    const result = await pool.query(`SELECT 
    u."UserId" as "userId",
    m."Id" AS "modelId",
    a."Id" AS "activityId",
    u."LocalOrganization",
    o."Name" AS organization,
    u."OtherLocalOrganization",
    u."State" as "state",
    u."OtherState",
    u."Municipality",
    u."OtherMunicipality",
    m."LocationPoint",
    m."LocationPolygon",
    m."ModelType",
    mt."Name" AS "ModelTypeName",
    m."OtherModel",
    m."NoOfYearsUnder",
    m."SoilType",
    m."Name" AS "ModelName",
    m."CommonIssues",
    m."AdditionalComments",
    m."CreationTime" AS "ModelCreationTime",
    m."Area",
    a."ActivityType",
    at."Name" AS "ActivityTypeName",
    a."OtherActivity",
    a."Date" AS "ActivityDate",
    a."Value",
    a."SplitOverTime",
    a."Duration",
    a."Description" AS "ActivityDescription",
    a."ActivitySubType",
    a."AreaPercent",
    a."CreationTime" AS "ActivityCreationTime"
FROM public."Sab_UserProfiles" u
LEFT JOIN public."Sab_Models" m
    ON m."UserId" = u."UserId"
LEFT JOIN public."Sab_ModelTypes" mt
    ON m."ModelType" = mt."Id"
LEFT JOIN public."Sab_Activities" a
    ON a."ModelId" = m."Id"
LEFT JOIN public."Sab_ActivityTypes" at
    ON a."ActivityType" = at."Id"
LEFT JOIN public."Sab_Organizations" o
    ON u."LocalOrganization" = o."Id"
WHERE u."ProjectParticipant" = 0;`);

    // Devuelve los resultados en formato JSON al frontend
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error interno del servidor al obtener reportes." });
  }
});

export default router;
