const GET_USER_ID_BY_EMAIL_URL = import.meta.env.VITE_GET_USER_ID_BY_EMAIL_URL;

export async function getUserIDByEmail(email: string) {
  console.log("email: ", email);

  const response = await fetch(GET_USER_ID_BY_EMAIL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  console.log("Data: ", data);
  return data._id;
}
