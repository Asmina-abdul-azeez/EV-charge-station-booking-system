import axios from 'axios';

export const callAPI = async ({url, method = 'post'}) => {
  try {
    const data = await axios.request({
      method,
      url,
    });
    if (data) {
      return {data, success: true};
    }
    return {success: false};
  } catch (e) {
    return {success: false};
  }
};
