import { Scene, Actor, Vector, Label, Color, FontUnit, Font } from 'excalibur';
import { Resources } from './resources.js';

class GameOverScene extends Scene {
  onInitialize(engine) {
    // Create the background actor
    const gameOverBackground = new Actor({
      pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
      width: engine.drawWidth,
      height: engine.drawHeight,
    });

    const sprite = Resources.Background.toSprite();
    sprite.destSize = {
      width: engine.drawWidth,
      height: engine.drawHeight,
    };

    gameOverBackground.graphics.use(sprite);
    gameOverBackground.graphics.anchor = new Vector(0.5, 0.5);
    this.add(gameOverBackground);

    // Create the "Game Over" label
    const gameOverLabel = new Label({
      text: 'Game Over',
      pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
      color: Color.White,
      font: new Font({
        family: 'Arial',
        size: 60,
        unit: FontUnit.Px,
        textAlign: 'center',
      }),
    });

    this.add(gameOverLabel);
  }

  onActivate(context) {
    // This method is called when the scene becomes active
    console.log('Game over scene activated');
  }

  onDeactivate(context) {
    // This method is called when the scene is deactivated
    console.log('Game over scene deactivated');
  }
}

export { GameOverScene };
