import app from "./app";
import connectMongoDB from "./db/connectMongo";

const PORT = 5207;

app.listen(PORT, async () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
  await connectMongoDB();
});
