import { buildAuctionsHandler } from './index.js';

export const auctions = [
  {
    item: 'Rodney Mullen Skate',
    lastPrice: 4000,
    lastBidder: 'Pepe Morales',
    initialPrice: 100,
    amountBidders: 4,
    id: 1,
  },
  {
    item: 'Cristiano Ronaldo Gucci Jacket',
    lastPrice: 45000,
    lastBidder: 'Juan Cruz Palo',
    initialPrice: 1800,
    amountBidders: 10,
    id: 2,
  },
  {
    item: 'Di Caprio Lamborghini',
    lastPrice: 499999,
    lastBidder: 'Aitor Tilla',
    initialPrice: 200000,
    amountBidders: 98,
    id: 3,
  },
  {
    item: 'Old Statue from Paris',
    lastPrice: 500,
    lastBidder: 'Juan Pedro Rivera',
    initialPrice: 140,
    amountBidders: 190,
    id: 4,
  },
];

export const buildAuction = (auction, listOfAuctions) => {
  let auctionNode = document.createElement('div');
  auctionNode.id = auction.id;
  auctionNode.className = 'auction';
  let itemNameNode = document.createElement('div');
  itemNameNode.className = 'itemName';
  let lastPriceNode = document.createElement('div');
  lastPriceNode.className = 'lastPrice';
  let lastBidderNode = document.createElement('div');
  lastBidderNode.className = 'lastBidder';
  let initialPriceNode = document.createElement('div');
  initialPriceNode.className = 'initialPrice';
  let amountBiddersNode = document.createElement('div');
  amountBiddersNode.className = 'amountBidders';
  let bidButton = document.createElement('button');
  bidButton.className = 'btn bidButton';

  itemNameNode.innerHTML = auction.item;
  lastPriceNode.innerHTML = auction.lastPrice + '$';
  lastBidderNode.innerHTML = 'Ultimo Postor: ' + auction.lastBidder;
  initialPriceNode.innerHTML = 'Oferta Inicial: ' + auction.initialPrice + '$';
  amountBiddersNode.innerHTML = 'En linea: ' + auction.amountBidders + ' Postores';
  bidButton.innerHTML = 'Ofertar';

  bidButton.onclick = evt => {
    bid(evt);
  };

  auctionNode.append(itemNameNode, lastPriceNode, lastBidderNode, initialPriceNode, amountBiddersNode, bidButton);
  listOfAuctions.append(auctionNode);
};

/* Add */
const itemName = document.getElementById('itemName');
const itemNameLabel = document.getElementById('itemNameLabel');
const initialBid = document.getElementById('initialBid');
const initialBidLabel = document.getElementById('initialBidLabel');

const publishAuction = document.getElementById('publishAuction');
const canceladdAuctionPanel = document.getElementById('canceladdAuctionPanel');
const errorMsgAdd = document.getElementById('errorMsgAdd');

export const addAuctionPanelEvents = () => {
  addAuctionPanel.style.display = 'grid';

  itemName.onchange = evt => {
    let value = evt.target.value;

    if (!value) {
      itemNameLabel.style.color = 'red';
      return;
    }

    itemNameLabel.style.color = '';
  };

  initialBid.onchange = evt => {
    let value = evt.target.value;

    if (!value) {
      initialBidLabel.style.color = 'red';
      return;
    }

    initialBidLabel.style.color = '';
  };

  publishAuction.onmouseover = () => {
    if (!validateForm()) {
      publishAuction.style.background = 'var(--core-bord)';
    }
  };

  publishAuction.onmouseout = () => {
    publishAuction.style.background = '';
  };

  publishAuction.onclick = () => {
    if (!validateForm()) {
      return;
    }

    const currentUser = localStorage.getItem('user');
    const currentsAuctions = JSON.parse(localStorage.getItem('currentsAuctions'));

    let auction = {
      item: itemName.value,
      lastPrice: initialBid.value,
      lastBidder: currentUser,
      initialPrice: initialBid.value,
      amountBidders: 1,
      id:
        currentsAuctions.sort((x, y) => {
          if (x.id > y.id) {
            return -1;
          }
          if (x.id < y.id) {
            return 1;
          }
          return 0;
        })[0].id + 1,
    };

    currentsAuctions.push(auction);

    localStorage.setItem('currentsAuctions', JSON.stringify(currentsAuctions));

    buildAuctionsHandler();

    itemName.value = '';
    initialBid.value = '';
    addAuctionPanel.style.display = 'none';
  };

  canceladdAuctionPanel.onclick = () => {
    itemName.value = '';
    initialBid.value = '';
    addAuctionPanel.style.display = 'none';
  };

  const validateForm = () => {
    let isValid = true;
    const currentsAuctions = JSON.parse(localStorage.getItem('currentsAuctions'));

    if (!itemName.value || currentsAuctions.some(auction => auction.item === itemName.value)) {
      isValid = false;
      itemNameLabel.style.color = 'red';
      errorMsgAdd.innerHTML = 'Debe ingresar un item que no exista!'
    }

    if (!initialBid.value) {
      isValid = false;
      initialBidLabel.style.color = 'red';
    }

    isValid ? (errorMsgAdd.innerHTML = '') : null;

    return isValid;
  };
};

/* Bid */
const bidNode = document.getElementById('bid');
const offerAuction = document.getElementById('offerAuction');

const canceOfferlAuction = document.getElementById('cancelOfferAuction');
const errorMsgOffer = document.getElementById('errorMsgOffer');

const bid = evt => {
  const auctionId = parseInt(evt.target.parentElement.id);
  const lastPrice = parseInt(evt.target.parentElement.childNodes[1].innerHTML.replace('$', ''));

  bidNode.setAttribute('placeholder', lastPrice);

  offerAuctionPanel.style.display = 'grid';

  bidNode.onchange = evt => {
    let value = evt.target.value;

    if (!value) {
      bidLabel.style.color = 'red';
      return;
    }

    bidLabel.style.color = '';
  };

  offerAuction.onmouseover = () => {
    if (!validateForm()) {
      offerAuction.style.background = 'var(--core-bord)';
    }
  };

  offerAuction.onmouseout = () => {
    offerAuction.style.background = '';
  };

  offerAuction.onclick = () => {
    if (!validateForm()) {
      return;
    }

    const currentUser = localStorage.getItem('user');
    const currentsAuctions = JSON.parse(localStorage.getItem('currentsAuctions'));

    let auctions = currentsAuctions.map(auction => {
      if (auction.id !== auctionId) {
        return auction;
      }

      return {
        item: auction.item,
        lastPrice: parseInt(bidNode.value),
        lastBidder: currentUser,
        initialPrice: auction.initialPrice,
        amountBidders: auction.amountBidders + 1,
        id: auction.id,
      };
    });

    localStorage.setItem('currentsAuctions', JSON.stringify(auctions));

    buildAuctionsHandler();

    bidNode.value = '';
    offerAuctionPanel.style.display = 'none';
  };

  canceOfferlAuction.onclick = () => {
    bidNode.value = '';
    offerAuctionPanel.style.display = 'none';
  };

  const validateForm = () => {
    let isValid = true;

    if (!bidNode.value) {
      isValid = false;
      bidLabel.style.color = 'red';
    }

    if (bidNode.value < lastPrice) {
      isValid = false;
      bidLabel.style.color = 'red';
      errorMsgOffer.innerHTML = `Debe ingresar un valor por encima de ${lastPrice}$!`;
    }

    isValid ? (errorMsgOffer.innerHTML = '') : null;

    return isValid;
  };
};
