import { cookies } from "next/headers";

export const getSession = async (jwt: string | undefined) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_SERVER_URL}/users/get-me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
