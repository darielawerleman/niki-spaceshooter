import { Actor, Color, Label, vec, Font, FontUnit, TextAlign } from 'excalibur';

class StartButton extends Actor {
  constructor() {
    super({
      pos: vec(800, 455), // Center of the screen
      width: 200,
      height: 50,
      color: Color.White,
    });

    // Add a label to the button
    const label = new Label({
        text: 'Start Game',
        pos: vec(0, 0),
        font: new Font({
          family: 'Arial',
          size: 24,
          unit: FontUnit.Px,
          color: Color.Green,
          textAlign: TextAlign.Center,
      }),
    });

    this.addChild(label);

    this.on('pointerup', () => {
      this.emit('startgame');
    });
  }
}

export { StartButton };
