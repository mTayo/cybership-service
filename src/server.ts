import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import * as swaggerDocument from "./swagger/swagger.json";

const app = express();

app.use(express.json());
RegisterRoutes(app);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use((err: any, req: any, res: any, next: any) => {

  if (err?.status) {
    res.status(err.status).json({
      message: err.message
    });
  } else {
    res.status(500).json({
      message: err.message
    });
  }

});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/docs`);
});