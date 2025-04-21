import { app } from "./app";
import { AppDataSource } from "./data-source";

const PORT = 3000;
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error during data source initilization", error);
  });
