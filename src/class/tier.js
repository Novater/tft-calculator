export default class Tier {
  constructor(name, id) {
    this.id = id;
    this.name = name;
  }

  getName = () => this.name;

  getId = () => this.id;
}
