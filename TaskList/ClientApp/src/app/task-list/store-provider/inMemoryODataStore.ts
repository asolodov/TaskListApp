import ODataStore from "devextreme/data/odata/store";
import ArrayStore from 'devextreme/data/array_store';
import LoadOptions from 'devextreme/data/abstract_store';
import { AdaptiveDataStore } from '../../core';

export class InMemoryODataStore extends ODataStore implements AdaptiveDataStore {

  private _internalStore: ArrayStore;
  private _preventRemoteRequests: boolean = false;
  private _key;

  constructor(options) {
    super(options);
    this._key = options.key;
  }

  public useLocalSource() {
    this._preventRemoteRequests = true;
  }

  public useRemoteSource() {
    this._preventRemoteRequests = false;
  }

  load(): Promise<any> & JQueryPromise<any>;
  load(options: LoadOptions): Promise<any> & JQueryPromise<any>;
  load(options?: LoadOptions): Promise<any> & JQueryPromise<any> {
    if (this._preventRemoteRequests) {
      return this._internalStore.load(options);
    }
    return super.load(options).then((data) => {
      this._internalStore = new ArrayStore({
        key: this._key,
        data: data
      })
    });
  }

  insert(values): Promise<any> & Object {
    return this._preventRemoteRequests
      ? this._internalStore.insert(values)
      : super.insert(values);
  }

  remove(key): Promise<void> & Object {
    return this._preventRemoteRequests
      ? this._internalStore.remove(key)
      : super.remove(key);
  }

  update(key, values): Promise<any> & Object {
    return this._preventRemoteRequests
      ? this._internalStore.update(key, values)
      : super.update(key, values);
  }

  totalCount(obj: { filter?; group?}): Promise<number> & Object {
    return this._preventRemoteRequests
      ? this._internalStore.totalCount(obj)
      : super.totalCount(obj);
  }
}
