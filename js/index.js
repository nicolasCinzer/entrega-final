import loginEvents from './login.js';
import { auctions, buildAuction, addAuctionPanelEvents } from './auctions.js';
import { setUser, logout } from './logged.js';

const loginPage = document.getElementById('loginPage');
const homePage = document.getElementById('homePage');

const logoutBtn = document.getElementById('logout');

const addAuctionPanelBtn = document.getElementById('addAuctionPanelBtn');
const searchAuctionBtn = document.getElementById('searchAuctionBtn');
const searchValue = document.getElementById('inputAuction');

const listOfAuctions = document.getElementById('listOfAuctions');
const offerAuctionPanel = document.getElementById('offerAuctionPanel');
const addAuctionPanel = document.getElementById('addAuctionPanel');

const main = () => {
  loginEvents();

  offerAuctionPanel.style.display = 'none';
  addAuctionPanel.style.display = 'none';

  /* Events */
  logoutBtn.onclick = () => {
    logout();
  };

  addAuctionPanelBtn.onclick = () => {
    addAuctionPanelEvents();
  };

  searchAuctionBtn.onclick = () => {
    let auctionsNodes = document.querySelectorAll('.auction');

    let currentsAuctions = JSON.parse(localStorage.getItem('currentsAuctions'));
    let auctionsFinded = currentsAuctions.filter(auction => auction.item.includes(searchValue.value));

    for (let auctionNode of auctionsNodes) {
      if (!auctionsFinded.some(auction => auction.id == auctionNode.id)) {
        auctionNode.style.display = 'none';
      } else {
        auctionNode.style.display = '';
      }
    }
  };

  searchValue.onchange = () => {
    if (!searchValue.value) {
      searchAuctionBtn.click();
    }
  };
};

export const buildAuctionsHandler = () => {
  listOfAuctions.innerHTML = '';

  /* Get currents auctions */
  let currentsAuctions = JSON.parse(localStorage.getItem('currentsAuctions'));

  if (!currentsAuctions) {
    localStorage.setItem('currentsAuctions', JSON.stringify(auctions));
    currentsAuctions = auctions;
  }

  /* Build currents auctions */
  for (let auction of currentsAuctions) {
    buildAuction(auction, listOfAuctions);
  }
};

main();
