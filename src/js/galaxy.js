import { Actor, Sprite } from 'excalibur';
import { Resources } from './resources.js';

class ScrollingBackground {
  constructor(game, speed) {
    this.game = game;
    this.speed = speed;
    this.actors = [];
  }

  initialize() {
    // Create two background actors for seamless scrolling
    for (let i = 0; i < 2; i++) {
      const actor = new Actor({
        x: this.game.drawWidth / 2,
        y: this.game.drawHeight / 2 + i * this.game.drawHeight,
        width: this.game.drawWidth,
        height: this.game.drawHeight,
      });

      const sprite = new Sprite({
        image: Resources.Background,
        destSize: {
          width: this.game.drawWidth,
          height: this.game.drawHeight,
        },
      });

      actor.graphics.use(sprite);
      this.actors.push(actor);
      this.game.add(actor);
    }

    // Listen for postupdate event to move background
    this.game.on('postupdate', () => {
      for (const actor of this.actors) {
        actor.pos.y += this.speed;

        if (actor.pos.y > this.game.drawHeight * 1.5) {
          actor.pos.y = -this.game.drawHeight / 2;
        }
      }
    });
  }
}

export default ScrollingBackground;