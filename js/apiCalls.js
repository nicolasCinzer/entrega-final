const getBids = () => {
  return fetch('http://localhost:3000/bids')
    .then(res => res.json())
    .then(res => res);
};

const addBid = body => {
  return fetch('http://localhost:3000/bids', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(res => res.json);
};

const updateBid = (id, body) => {
  return fetch(`http://localhost:3000/bids/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};

export { getBids, addBid, updateBid };
