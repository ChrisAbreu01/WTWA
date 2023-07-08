// import { baseUrl } from "./constants";

export class ItemsApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getItems = (token) => {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  };
  addItem(item) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: item.name,
        weather: item.weather,
        link: item.link,
      }),
    }).then(this.processServerResponse);
  }
  deleteItem(item, token) {
    return fetch(`${this._baseUrl}/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  }
}
