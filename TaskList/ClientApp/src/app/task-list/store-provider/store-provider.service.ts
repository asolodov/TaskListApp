import { Injectable, } from '@angular/core';
import ODataStore from "devextreme/data/odata/store";=

@Injectable()
export class StoreProviderService {

  configureStore(settings: any): any  {
    return new ODataStore(settings);
  }
}
