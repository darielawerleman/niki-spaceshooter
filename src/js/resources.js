import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
  Player: new ImageSource('images/starship.png'),
  Background: new ImageSource('images/galaxy.png'),
  Bullet: new ImageSource('images/Bullet.png'),
  Enemy: new ImageSource('images/enemy.png'),
  Meteor: new ImageSource('images/meteor.png'),
  IntroBackground: new ImageSource('images/pinkgalaxy.png'),
  Player2: new ImageSource('images/player2.png'),
  // Nicki: new ImageSource('image/nicki.png')
}
const ResourceLoader = new Loader([
    Resources.Player,
    Resources.Background,
    Resources.Bullet,
    Resources.Enemy,
    Resources.Meteor,
    Resources.IntroBackground,
    Resources.Player2
    // Resources.Nicki,
])

export { Resources, ResourceLoader }

