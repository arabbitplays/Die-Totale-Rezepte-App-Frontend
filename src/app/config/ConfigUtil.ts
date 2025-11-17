import {Injectable} from "@angular/core";
import * as data from './backendConfig.json';

@Injectable()
export class ConfigUtil {
  private config: any = data;

  public getValueAtKey(key: string): any {
    return this.config[key];
  }
}
