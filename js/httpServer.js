const xhr = new XMLHttpRequest();
export const httpServer = {
  get(url) {
   return new Promise(function(resolve, reject) {
     xhr.open('GET', url, true);
     xhr.send();
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error('HTTP error ' + xhr.status));
        }
      };
      xhr.onerror = function() {
        reject(new Error('Network error'));
      };
    });
  },
  post(url, option) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(option),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
  },
  put(url, option) {
  return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(option),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
  },  
  delete(url) {
    return new Promise((resolve, reject) => {
      xhr.open('DELETE', url);
      xhr.send();
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
    });
  }
}