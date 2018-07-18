import { Injectable, } from '@angular/core';
import ODataStore from "devextreme/data/odata/store";
import ArrayStore from 'devextreme/data/array_store';
import { Store } from 'devextreme/data/abstract_store';
import { InMemoryODataStore } from './inMemoryODataStore';
import { AdaptiveDataStore } from '../../core';

@Injectable()
export class StoreProviderService {

  configureStore(settings: any): Store | AdaptiveDataStore {
    return new InMemoryODataStore(settings);
  }
}
