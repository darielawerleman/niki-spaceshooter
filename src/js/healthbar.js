import { Actor, Color, Vector, GraphicsComponent, Rectangle } from 'excalibur';

class HealthBar extends Actor {
  constructor(player) {
    super({
      pos: new Vector(player.pos.x, player.pos.y - 40),
      width: 50, // Max width of the health bar
      height: 5
    });
    this.player = player;
    this.z = 1; // Ensure it's drawn above the player
    this.maxWidth = 50; // Maximum width of the health bar

    // Create a Rectangle for the health bar
    this.healthRect = new Rectangle({
      width: this.maxWidth,
      height: this.height,
      color: Color.Green
    });

    // Use GraphicsComponent to draw the health bar
    this.graphics = new GraphicsComponent();
    this.graphics.add(this.healthRect);
  }

  update(engine, delta) {
    super.update(engine, delta);
    this.pos.x = this.player.pos.x;
    this.pos.y = this.player.pos.y - 40;

    // Update health bar width based on player health
    const healthPercentage = this.player.health / 100;
    this.healthRect.width = this.maxWidth * healthPercentage;
  }
}

export { HealthBar };
