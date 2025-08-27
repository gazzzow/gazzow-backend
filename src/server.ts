import app from "./presentation/express/app.js";
import connectDb from "./infrastructure/config/db.js";

const PORT = process.env.PORT || 5001;


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});


