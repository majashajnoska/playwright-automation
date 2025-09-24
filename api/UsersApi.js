export async function apiLogin(apiRequestContext, email, password) {
  const apiLoginResponse = await apiRequestContext.post(`/api/users/login`, {
    data: {
      email,
      password,
    },
  });

  const apiLoginResponseJson = await apiLoginResponse.json();
  return apiLoginResponseJson.accessToken;
}

export async function setTokenInLocalStorage(page, token) {
  await page.goto("/");
  await page.evaluate(
    (token) => localStorage.setItem("accessToken", token),
    token
  );
}
