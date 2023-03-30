import axios from "axios";
const BaseUrl = "http://localhost:9000/api/v1/";

export async function GetScrapedData(postalCode) {
    try {
      const info = await axios.get(BaseUrl + "gumtree/" + postalCode);
      return info.data.data;
    } catch (error) {
      throw error;
    }
  }

  