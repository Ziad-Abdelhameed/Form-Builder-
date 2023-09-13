export class Element {
  public name: string;
  public size: number;
  public step: number;
  public mandatory: boolean;
  constructor() {
    this.name = '';
    this.size = 12;
    this.step = 1;
    this.mandatory = false;
  }
  public changeMandatroy(): void {
    this.mandatory = !this.mandatory;
  }
}
