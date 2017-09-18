import { get } from 'axios';

const url = 'https://jsonplaceholder.typicode.com/';

function category() {
  const params = ['posts', 'comments', 'albums', 'todos'];
  return params[Math.floor(Math.random() * params.length)];
}
function getJson() {
  const param = category();
  return get(`${url}${param}`)
    .then(response => response.data);
}

export default getJson;

