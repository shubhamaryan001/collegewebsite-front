export const create = (userId, token, product) => {
  return fetch(`http://localhost:8080/api/product/new/${userId}`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
      },
      body: product
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const list = page => {
    return fetch(`http://localhost:8080/api/products/?page=${page}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleProduct = productId => {
    return fetch(`http://localhost:8080/api/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const update = (productId, token, product) => {
    console.log(productId, token, product);
    return fetch(`http://localhost:8080/api/product/${productId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (productId, token) => {
    return fetch(`http://localhost:8080/api/product/${productId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
