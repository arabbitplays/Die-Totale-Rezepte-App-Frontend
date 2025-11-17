export class RecipeSection {
  private _title: string;
  private _bulletPoints: string[];

  get title(): string {
    return this._title;
  }

  get bulletPoints(): string[] {
    return this._bulletPoints;
  }

  constructor(title: string, bulletPoints: string[]) {
    this._title = title;
    this._bulletPoints = bulletPoints;
  }
}
