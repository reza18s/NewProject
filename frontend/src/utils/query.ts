import { cookies } from "next/headers";

export const getSession = async () => {
  try {
    const cookieStore = cookies();
    const response = await fetch(
      `${process.env.BACKEND_SERVER_URL}/users/get-me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieStore.get("jwt")?.value}`,
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
