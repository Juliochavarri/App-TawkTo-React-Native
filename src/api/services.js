import { removeTokenApi } from './token'
import {API_URL} from '../utils/constants'

export const getUserApi = async (id) => {
    try {
        const url = `${API_URL}/clients?user_id=${id}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const loginApi = async (formData) => {
    try {
      const url = `${API_URL}/auth/`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      return null
    }
  }

  export const logoutApi = async () => {
    await fetch(`${API_URL}/auth/logout`)
    removeTokenApi()
  }