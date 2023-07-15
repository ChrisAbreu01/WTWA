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
        imageUrl: item.imageUrl,
        owner: item.owner,
      }),
    }).then(this.processServerResponse);
  }
  deleteItem(item, token) {
    return fetch(`${this._baseUrl}/items/${item}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  }
  addItemLike(_id, token) {
    return fetch(`${this._baseUrl}/items/${_id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  }
  removeItemLike(_id, token) {
    return fetch(`${this._baseUrl}/items/${_id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  }
}
