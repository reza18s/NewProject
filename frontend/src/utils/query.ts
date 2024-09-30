import { cookies } from "next/headers";

export const getSession = async () => {
  try {
    const cookieStore = cookies().getAll();
    const response = await fetch(
      `${process.env.BACKEND_SERVER_URL}/users/get-me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieStore.find((val) => val.name === "jwt")?.value}`,
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
