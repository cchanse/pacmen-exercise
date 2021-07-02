let pos = 0;

// Array holds PacMan images with mouth open and closed and facing right and left
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

// Defines what direction should PacMan go in
// 0 = left to right // 1 = right to left (reverse)
let direction = 0;
// Determines which PacMan image should be displayed and flips between values 0 and 1
let focus = 0;

// Holds PacMan added by user
const pacMen = [];

/**
 * Returns an object with random values
 * @param {number} scale - the number to scale by
 */

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

/**
 * Sets up factory that makes PacMan at a random position with random velocity
 */
function makePac() {
  // returns an object with values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);

  // Add image to div
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = 'images/PacMan1.png';
  newimg.width = 100;

  let positionX = position.x + 'px';
  let positionY = position.y + 'px';
  newimg.style.left = positionX;
  newimg.style.top = positionY;

  game.appendChild(newimg);
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // make pacman face left if it hits right wall
    if (
      item.position.x + item.newimg.width + item.velocity.x >
      window.innerWidth
    ) {
      item.newimg.src = pacArray[1][0];
    } else if (item.position.x + item.velocity.x < 0) {
      // make pacman face right if it hits left wall
      item.newimg.src = pacArray[0][0];
    }

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

/**
 * Detects when PacMan collides with wall
 * @param {Object} item - the PacMan created by factory
 */
// detect when pacman collides with wall
function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  )
    item.velocity.x = -item.velocity.x;

  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

/**
 * Adds a new PacMan to screen when button pushed
 *
 */
function makeOne() {
  pacMen.push(makePac());
}
