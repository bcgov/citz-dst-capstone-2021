export const API = {
  BASE_URL: () =>
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/v1/"
      : `${window.location.origin}/api/v1/`,
}
