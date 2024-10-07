import { cookies } from "next/headers";

export const getSession = async (jwt: string | undefined) => {
  try {
    const response = await fetch(
      `http://${process.env.BACKEND_SERVER_URL || "localhost:4000/api/v1"}/users/get-me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        credentials: "include",
      },
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
