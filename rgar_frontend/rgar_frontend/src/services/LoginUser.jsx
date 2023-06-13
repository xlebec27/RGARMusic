import { login, register } from "../lib/AxiosServices";

export async function action({ request }) {
    try {
        console.log('request')
      let formData = await request.formData()
      const type = formData.get("type")
      const email = formData.get("email")
      const password = formData.get("password")
      const response = await login({email, password})
      const { accessToken, refreshToken } = response.data
      console.log('', response.data)
      return { tokens: { accessToken, refreshToken }, error: null }
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
        tokens: null,
      };
    }
  }
