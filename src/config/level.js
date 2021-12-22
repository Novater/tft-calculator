export default class Level {
  constructor(name, levelId) {
    this.name = name;
    this.levelId = levelId;
  }

  getName = () => this.name;

  getId = () => this.levelId;
}
