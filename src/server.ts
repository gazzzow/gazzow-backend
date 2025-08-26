import app from "./presentation/express/app.js";
import connectDb from "./infra/config/db.js";

const PORT = process.env.PORT || 5001;

console.log(PORT);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});


