import axios from 'axios';

// Gọi API đăng nhập
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/auth/login', {
      username,
      password,
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    throw error; // Ném lỗi để xử lý ở component gọi API
  }
};
