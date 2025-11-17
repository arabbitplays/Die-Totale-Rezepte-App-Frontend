export class Item {
  private _name: string;

  private _unitString: string = "";
  private _amount: number = 0;
  private _fresh: boolean;

  constructor(name: string, amount: number, unitString: string, fresh: boolean) {
    this._name = name;
    this._amount = amount;
    this._unitString = unitString;
    this._fresh = fresh;
  }

  get name(): string {
    return this._name;
  }

  set unitString(value: string) {
    this._unitString = value;
  }

  set amount(value: number) {
    this._amount = value;
  }

  set fresh(value: boolean) {
    this._fresh = value;
  }

  set name(name: string) {
    this._name = name;
  }

  get unitString(): string {
    return this._unitString;
  }

  get amount(): number {
    return this._amount;
  }

  get fresh(): boolean {
    return this._fresh;
  }

  public getAsString(): string {
    if ((this._amount === 1 || this._amount === 0) && !this._unitString)
      return this.name;
    return this._amount + " " + this._unitString + " " + this.name;
  }
}
