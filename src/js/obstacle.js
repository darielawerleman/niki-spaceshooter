import { Actor, Vector, Color, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { Bullet } from './bullet.js'; // Make sure to import Bullet

class Obstacle extends Actor {
  constructor(pos, vel, width, height, sprite) {
    super({
      pos: pos,
      vel: vel,
      width: width,
      height: height,
      collisionType: CollisionType.Active // Enable collision detection
    });
    if (sprite) {
      this.graphics.use(sprite);
    }
  }

  onInitialize(engine) {
    this.on('precollision', (evt) => this.handleCollision(evt));
  }

  handleCollision(evt) {
    if (evt.other instanceof Bullet) {
      evt.other.kill(); // Destroy the bullet
      this.kill(); // Destroy the obstacle
    }
  }

  update(engine, delta) {
    super.update(engine, delta);

    // Remove obstacle if it goes out of the screen
    if (this.pos.y > engine.drawHeight || this.pos.x < 0 || this.pos.x > engine.drawWidth) {
      this.kill();
    }
  }
}

class Meteor extends Actor {
  constructor(pos, vel) {
    super({
      pos: pos,
      vel: vel,
      width: 30,
      height: 30,
      color: Color.Gray,
      collisionType: CollisionType.Active // Enable collision detection
    });
    this.graphics.use(Resources.Meteor.toSprite());
  }

  onInitialize(engine) {
    this.on('precollision', (evt) => this.handleCollision(evt));
  }

  handleCollision(evt) {
    if (evt.other instanceof Bullet) {
      evt.other.kill(); // Destroy the bullet
      this.kill(); // Destroy the meteor
    }
  }

  update(engine, delta) {
    super.update(engine, delta);

    // Remove meteor if it goes out of the screen
    if (this.pos.y > engine.drawHeight || this.pos.x < 0 || this.pos.x > engine.drawWidth) {
      this.kill();
    }
  }
}

class Enemy extends Actor {
  constructor(pos, vel) {
    super({
      pos: pos,
      vel: vel,
      width: 50,
      height: 50,
      color: Color.Red,
      collisionType: CollisionType.Active // Enable collision detection
    });
    this.graphics.use(Resources.Enemy.toSprite());
  }

  onInitialize(engine) {
    this.on('precollision', (evt) => this.handleCollision(evt));
  }

  handleCollision(evt) {
    if (evt.other instanceof Bullet) {
      evt.other.kill(); // Destroy the bullet
      this.kill(); // Destroy the enemy
    }
  }

  update(engine, delta) {
    super.update(engine, delta);

    // Remove enemy if it goes out of the screen
    if (this.pos.y > engine.drawHeight || this.pos.x < 0 || this.pos.x > engine.drawWidth) {
      this.kill();
    }
  }
}

export { Obstacle, Enemy, Meteor };
