title = "Space invaders";

description = `
Collect stars and avoid obstacles
[Tap] Arrow keys Change direction
`;

characters = [
  `
 r rr
rrrrrr
 grr
 grr
rrrrrr
r rr
`
];

options = {
  theme: "dark",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 4,
};

/** @type {Vector} */
let ball;
/** @type {Vector[]} */
let stars;
/** @type {Vector[]} */
let obstacles;
let nextStarDist;
let nextObstacleDist;

function update() {
  if (!ticks) {
    ball = vec(50, 50);
    stars = [];
    obstacles = [];
    nextStarDist = 0;
    nextObstacleDist = 0;
  }

  color("cyan");
  char("a", ball);


  if (input.isJustPressed) {
    play("select");
    ball.x -= 5;
  }

 
  if (ball.x < 0) {
    ball.x = 100; // Set ball's position to the right edge
  } else if (ball.x > 100) {
    ball.x = 0;   // Set ball's position to the left edge
  }

  // Spawn stars
  nextStarDist -= difficulty;
  while (nextStarDist < 0) {
    stars.push(vec(rnd(5, 95), -2));
    nextStarDist += rnd(10, 20) / difficulty;
  }

  // Move and draw stars
  color("yellow");
  remove(stars, (star) => {
    star.y += difficulty;
    char("*", star); // Use "*" for stars
    return star.y > 105;
  });

  // Spawn obstacles
  nextObstacleDist -= difficulty;
  while (nextObstacleDist < 0) {
    obstacles.push(vec(rnd(5, 95), -2));
    nextObstacleDist += rnd(15, 25) / difficulty;
  }

  
  color("red");
  remove(obstacles, (obstacle) => {
    obstacle.y += difficulty;
    char("+", obstacle); // Use "+" for obstacles
    return obstacle.y > 105;
  });

 
  color("transparent");
  if (char("a", ball).isColliding.char["*"]) {
    play("coin");
    addScore(1, ball);
  }


  if (char("a", ball).isColliding.char["+"]) {
    play("explosion");
    end();
  }


  color("black");
  text(`Score: ${floor(difficulty)}`, 3, 10);
}
