import '../css/style.css';
import { Engine, Vector, DisplayMode, Timer, Scene, Input } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import ScrollingBackground from './galaxy.js';
import { Obstacle, Enemy, Meteor } from './obstacle.js';
import { IntroScene } from './IntroScene.js'; // Ensure the path is correct

export class Game extends Engine {
  constructor() {
    super({
      width: 1600,
      height: 910,
      displayMode: DisplayMode.FitScreen,
    });

    this.player2 = null;

    this.start(ResourceLoader)
      .then(() => {
        console.log('Resources loaded successfully');
        this.startGame();
      })
      .catch((e) => console.error("Resource loading error:", e));
  }

  startGame() {
    // Create and add the intro scene
    const introScene = new IntroScene();
    this.add('intro', introScene);

    // Create and add the main game scene
    const mainGameScene = new Scene();
    this.add('main', mainGameScene);

    // Initialize the main game scene
    this.initializeMainGameScene(mainGameScene);

    // Switch to the intro scene
    this.goToScene('intro');

    // Example: Switch to the main game scene after 5 seconds
    // setTimeout(() => {
    //   this.goToScene('main');
    // }, 0);
  }

  initializeMainGameScene(scene) {
    scene.onInitialize = (engine) => {
      console.log('Starting the game!');

      const backgroundSpeed = 2;
      const scrollingBackground = new ScrollingBackground(engine, backgroundSpeed);
      scrollingBackground.initialize();

      const player1 = new Player(Resources.Player, new Vector(400, 300), {
        left: Input.Keys.Left,
        right: Input.Keys.Right,
        up: Input.Keys.Up,
        down: Input.Keys.Down,
        shoot: Input.Keys.Enter
      });
      engine.add(player1);

      engine.input.keyboard.on('press', (evt) => {
        if (!this.player2 && (evt.key === Input.Keys.W || evt.key === Input.Keys.A || evt.key === Input.Keys.S || evt.key === Input.Keys.D)) {
          this.deployPlayer2(engine);
        }
      });

      console.log('Player and background added to the game.');

      this.startSpawning(engine);
    };
  }

  deployPlayer2(engine) {
    this.player2 = new Player(Resources.Player2, new Vector(800, 300), {
      left: Input.Keys.A,
      right: Input.Keys.D,
      up: Input.Keys.W,
      down: Input.Keys.S,
      shoot: Input.Keys.Space
    });
    engine.add(this.player2);
    console.log('Player 2 deployed');
  }

  startSpawning(engine) {
    const obstacleTimer = new Timer({
      fcn: () => this.spawnObstacle(engine),
      interval: 1000,
      repeats: true,
    });
    engine.add(obstacleTimer);
    obstacleTimer.start();

    const meteorTimer = new Timer({
      fcn: () => this.spawnMeteor(engine),
      interval: 5000, // Increased interval to 5 seconds
      repeats: true,
    });
    engine.add(meteorTimer);
    meteorTimer.start();

    const enemyTimer = new Timer({
      fcn: () => this.spawnEnemy(engine),
      interval: 3000,
      repeats: true,
    });
    engine.add(enemyTimer);
    enemyTimer.start();

    console.log('Spawning timers started.');
  }

  spawnObstacle(engine) {
    console.log('Spawning obstacle');
    const pos = new Vector(Math.random() * engine.drawWidth, 0);
    const vel = new Vector(0, Math.random() * 100 + 50);
    const obstacleSprite = Resources.Meteor.toSprite();
    const obstacle = new Obstacle(pos, vel, 50, 50, obstacleSprite);
    engine.add(obstacle);
  }

  spawnMeteor(engine) {
    console.log('Spawning meteor');
    const pos = new Vector(Math.random() * engine.drawWidth, 0);
    const vel = new Vector(0, Math.random() * 100 + 50);
    const meteor = new Meteor(pos, vel);
    engine.add(meteor);
  }

  spawnEnemy(engine) {
    console.log('Spawning enemy');
    const pos = new Vector(Math.random() * engine.drawWidth, 0);
    const vel = new Vector(0, Math.random() * 100 + 50);
    const enemy = new Enemy(pos, vel);
    engine.add(enemy);
  }
}

new Game();
