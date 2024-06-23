import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

class Bullet extends Actor {
  constructor(pos, vel) {
    super({
      pos: pos,
      vel: vel,
      width: 5, // Adjust as necessary
      height: 10, // Adjust as necessary
      collisionType: CollisionType.Passive // Enable collision detection
    });
    this.graphics.use(Resources.Bullet.toSprite());
  }

  update(engine, delta) {
    super.update(engine, delta);

    // Remove bullet if it goes out of the screen
    if (this.pos.y < 0 || this.pos.x < 0 || this.pos.x > engine.drawWidth) {
      this.kill();
    }
  }
}

export { Bullet };
