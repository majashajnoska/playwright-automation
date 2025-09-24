export async function apiLogin(page, apiClient, email, password) {
  const apiLoginResponse = await apiClient.post(`/api/users/login`, {
    data: {
      email,
      password,
    },
  });

  const apiLoginResponseJson = await apiLoginResponse.json();

  await page.goto("/");
  await page.evaluate(
    (token) => localStorage.setItem("accessToken", token),
    apiLoginResponseJson.accessToken
  );
}
