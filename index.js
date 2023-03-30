const auctions = [
  {
    item: 'Rodney Mullen Skate',
    lastPrice: 4000,
    lastAuctioneer: 'Pepe Morales',
    initialPrice: 100,
    amountAuctioneer: 4,
    id: 1,
  },
  {
    item: 'Cristiano Ronaldo Gucci Jacket',
    lastPrice: 45000,
    lastAuctioneer: 'Juan Cruz Palo',
    initialPrice: 1800,
    amountAuctioneer: 10,
    id: 2,
  },
  {
    item: 'Di Caprio Lamborghini',
    lastPrice: 499999,
    lastAuctioneer: 'Aitor Tilla',
    initialPrice: 200000,
    amountAuctioneer: 98,
    id: 3,
  },
  {
    item: 'Old Statue from Paris',
    lastPrice: 500,
    lastAuctioneer: 'Juan Pedro Rivera',
    initialPrice: 140,
    amountAuctioneer: 190,
    id: 4,
  },
];

const main = () => {
  //Init actuals Auctions
  const listOfAuctions = document.getElementById('listOfAuctions');
  const addAuctionBtn = document.getElementById('addAuctionBtn');
  const searchAuctionBtn = document.getElementById('searchAuctionBtn');
  const auctionDetails = document.getElementById('auctionDetails');
  const addAuction = document.getElementById('addAuction');

  auctionDetails.style.display = 'none';
  addAuction.style.display = 'none';

  for (let auction of auctions) {
    buildAuction(auction, listOfAuctions);
  }

  addAuctionBtn.onclick = () => {
    addAuction.style.display = 'flex';
    addAuctionEvents();
  };

  searchAuctionBtn.onclick = () => {
    let searchValue = document.querySelector('#inputAuction');
    let auctionsNodes = document.querySelectorAll('.auction');

    let auctionsFinded = auctions.filter(auction => auction.item.includes(searchValue.value));

    for (let auctionNode of auctionsNodes) {
      if (!auctionsFinded.some(auction => auction.id == auctionNode.id)) {
        auctionNode.style.display = 'none';
      } else {
        auctionNode.style.display = '';
      }
    }
  };
};

const buildAuction = auction => {
  let auctionNode = document.createElement('div');
  auctionNode.id = auction.id;
  auctionNode.className = 'auction';
  let itemNameNode = document.createElement('div');
  itemNameNode.className = 'itemName';
  let lastPriceNode = document.createElement('div');
  lastPriceNode.className = 'lastPrice';
  let lastAuctioneerNode = document.createElement('div');
  lastAuctioneerNode.className = 'lastAuctioneer';
  let initialPriceNode = document.createElement('div');
  initialPriceNode.className = 'initialPrice';
  let amountAuctioneerNode = document.createElement('div');
  amountAuctioneerNode.className = 'amountAuctioneer';
  let bidButton = document.createElement('button');
  bidButton.className = 'bidButton';

  itemNameNode.innerHTML = auction.item;
  lastPriceNode.innerHTML = auction.lastPrice + '$';
  lastAuctioneerNode.innerHTML = 'Ultimo Postor: ' + auction.lastAuctioneer;
  initialPriceNode.innerHTML = 'Oferta Inicial: ' + auction.initialPrice + '$';
  amountAuctioneerNode.innerHTML = 'En linea: ' + auction.amountAuctioneer + ' Postores';
  bidButton.innerHTML = 'Ofertar';

  bidButton.onclick = () => {};

  auctionNode.append(itemNameNode, lastPriceNode, lastAuctioneerNode, initialPriceNode, amountAuctioneerNode, bidButton);
  listOfAuctions.append(auctionNode);
};

const auctionDetails = () => {};

const addAuctionEvents = () => {
  const itemName = document.getElementById('itemName');
  const initialBid = document.getElementById('initialBid');
  const bidderName = document.getElementById('bidderName');
  const publishAuction = document.getElementById('publishAuction');
  const cancelAuction = document.getElementById('cancelAuction');

  publishAuction.onmouseover = () => {
    if (!validateForm()) {
      publishAuction.style.background = 'red';
      return;
    }

    publishAuction.style.background = '';
  };

  publishAuction.onmouseout = () => {
    publishAuction.style.background = '';
    publishAuction.disabled = false;
  };

  cancelAuction.onclick = () => {
    if (!validateForm()) {
      return;
    }
    
  };

  const validateForm = () => {
    let isValid = true;

    if (!itemName.value) {
      isValid = false;
      itemName.style.border = '1px solid red';
    }

    if (!initialBid.value) {
      isValid = false;
      initialBid.style.border = '1px solid red';
    }

    if (!bidderName.value) {
      isValid = false;
      bidderName.style.border = '1px solid red';
    }

    return isValid;
  };
};

main();

/* auctions.sort((x, y) => {
          if (x.id > y.id) {
            return -1;
          }
          if (x.id < y.id) {
            return 1;
          }
          return 0;
        })[0].id + 1, */
