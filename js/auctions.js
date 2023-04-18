import { buildAuctionsHandler } from './index.js';
import { addBid, updateBid } from './apiCalls.js';

export const buildAuction = (auction, listOfAuctions) => {
  let auctionNode = document.createElement('div');
  auctionNode.id = auction.id;
  auctionNode.className = 'auction';
  auctionNode.auction = auction;
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
  offerAuctionPanel.style.display = 'none';

  publishAuction.onclick = async () => {
    if (!validateForm()) {
      return;
    }

    const currentUser = localStorage.getItem('user');

    let auction = {
      item: itemName.value,
      lastPrice: initialBid.value,
      lastBidder: currentUser,
      initialPrice: initialBid.value,
      amountBidders: 1,
    };

    await addBid(auction);

    Toastify({
      text: 'Felicitaciones! A añadido una nueva subasta!',
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
    }).showToast();

    buildAuctionsHandler();

    itemName.value = '';
    initialBid.value = '';
    addAuctionPanel.style.display = 'none';
  };

  canceladdAuctionPanel.onclick = () => {
    itemName.value = '';
    initialBid.value = '';
    addAuctionPanel.style.display = 'none';

    Toastify({
      text: 'La subasta fue cancelada.',
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      style: {
        background: 'red',
      },
    }).showToast();
  };

  const validateForm = () => {
    let isValid = true;

    if (!itemName.value) {
      isValid = false;
      itemNameLabel.style.color = 'red';

      Toastify({
        text: 'Debe ingresar un nombre para el item a subastar.',
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
          background: 'red',
        },
      }).showToast();
    }

    if (!initialBid.value) {
      isValid = false;
      initialBidLabel.style.color = 'red';

      Toastify({
        text: 'Debe ingresar una oferta.',
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
          background: 'red',
        },
      }).showToast();
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
  const auctionId = parseInt(evt.target.parentElement.auction.id);
  const lastPrice = parseInt(evt.target.parentElement.auction.lastPrice);
  const initialBid = parseInt(evt.target.parentElement.auction.initialPrice);
  const amountBidders = parseInt(evt.target.parentElement.auction.amountBidders);
  const item = evt.target.parentElement.auction.item;
  const lastBidder = evt.target.parentElement.auction.lastBidder;

  bidNode.setAttribute('placeholder', lastPrice);

  offerAuctionPanel.style.display = 'grid';
  addAuctionPanel.style.display = 'none';

  offerAuction.onclick = async () => {
    if (!validateForm()) {
      return;
    }

    const currentUser = localStorage.getItem('user');

    let auction = {
      item: item,
      lastPrice: parseInt(bidNode.value),
      lastBidder: currentUser,
      amountBidders: amountBidders + 1,
      initialPrice: initialBid,
    };

    await updateBid(auctionId, auction);

    Toastify({
      text: `Felicitaciones! A ofertado a la subasta de ${lastBidder}!`,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
    }).showToast();

    buildAuctionsHandler();

    bidNode.value = '';
    offerAuctionPanel.style.display = 'none';
  };

  canceOfferlAuction.onclick = () => {
    bidNode.value = '';
    offerAuctionPanel.style.display = 'none';

    Toastify({
      text: 'La oferta fue cancelada.',
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      style: {
        background: 'red',
      },
    }).showToast();
  };

  const validateForm = () => {
    let isValid = true;

    if (!bidNode.value) {
      isValid = false;
      bidLabel.style.color = 'red';

      Toastify({
        text: 'Debe ingresar una oferta.',
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
          background: 'red',
        },
      }).showToast();
    }

    if (bidNode.value < lastPrice) {
      isValid = false;
      bidLabel.style.color = 'red';

      Toastify({
        text: `Debe ingresar un valor por encima de ${lastPrice}$!`,
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
          background: 'red',
        },
      }).showToast();
    }

    isValid ? (errorMsgOffer.innerHTML = '') : null;

    return isValid;
  };
};
