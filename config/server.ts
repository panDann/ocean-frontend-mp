const { NODE_ENV } = process.env;

export const serverHost =
  NODE_ENV !== "development"
    ? "http://localhost:8082/ahlog"
    : "http://134.175.55.10:7106/ahlog";
