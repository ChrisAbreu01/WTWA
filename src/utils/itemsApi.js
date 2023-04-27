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

  getItems = () => {
    return fetch(`${this._baseUrl}/items`).then(this.processServerResponse);
  };
  addItem(item) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      body: JSON.stringify({
        name: item.name,
        weather: item.weather,
        link: item.link,
      }),
    }).then(this.processServerResponse);
  }
  deleteItem(item) {
    return fetch(`${this._baseUrl}/items/${item.id}`, {
      method: "DELETE",
    }).then(this.processServerResponse);
  }
}
