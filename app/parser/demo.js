/* eslint-disable no-useless-escape */
import { get } from 'axios';

const url = 'https://jsonplaceholder.typicode.com/';

function category() {
  const params = ['posts', 'comments', 'albums', 'todos'];
  return params[Math.floor(Math.random() * params.length)];
}
export function getJson() {
  const param = category();
  return get(`${url}${param}`)
    .then(response => response.data)
    .catch(err => err);
}

export function fetchRequestedUrl(url) {
  return get(url)
    .then(response => response.data);
}

export function validUrl(url) {
  const regex = /[-a-zA-Z0-9@:%_.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&//=]*)?/gi;
  return regex.test(url);
}

