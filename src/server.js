import express from "express";
import pg from "pg";
import multer from "multer";
import cors from "cors";
import * as Minio from "minio";
import "dotenv/config";

const { Client } = pg;

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (["http://localhost:5173"].indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS streetart
    (
        id         SERIAL PRIMARY KEY,
        foundBy    TEXT      NOT NULL,
        foundDate  TIMESTAMP NOT NULL,
        itemName   TEXT      NOT NULL,
        kind       TEXT      NOT NULL,
        lat        CHAR(20)  NOT NULL,
        long       CHAR(20)  NOT NULL,
        imageUrl   TEXT      NOT NULL,
        uploadDate TIMESTAMP NOT NULL
    );
`;

const db = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to DB:", err.stack);
    return;
  }
  console.log("Connected to DB");
});

db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Table `streetart` created or already exists");
  }
});

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: process.env.MINIO_PORT,
  useSSL: process.env.MINIO_USE_SSL == "true",
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.listen(3000, () => {
  console.log("Backend server running on http://localhost:3000");
});

app.post("/api/data", upload.single("image"), (req, res) => {
  const { foundBy, foundDate, itemName, kind, lat, long, uploadDate } = req.body;
  const imageFile = req.file;
  let imageUrl;

  if (!foundBy || !foundDate || !itemName || !kind || !lat || !long || !imageFile || !uploadDate) {
    return res.status(400).json({ error: "All infos are required" });
  }
  const filename = crypto.randomUUID() + ".jpg";
  minioClient.putObject("streetart", filename, imageFile.buffer, (err, etag) => {
    if (err) {
      return res.status(500).send("Error uploading image to MinIO: " + err.message);
    }
  });

  const insertQuery =
    "INSERT INTO streetart (foundBy, foundDate, itemName, kind, lat, long, imageUrl, uploadDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
  db.query(insertQuery, [foundBy, foundDate, itemName, kind, lat, long, filename, uploadDate], (err, result) => {
    if (err) {
      console.error("Error inserting data into database:", err);
      return res.status(500).json({ error: "Failed to save data" });
    }
    res.status(201).json({ message: "Data saved successfully!", imageUrl });
  });
});

app.get("/api/data", async (req, res) => {
  await db.query("SELECT * FROM streetart", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(result.rows);
  });
});
