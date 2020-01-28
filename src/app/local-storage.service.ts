import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY_HEIGHT = 'height';
const STORAGE_KEY_WIDTH = 'width';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private defaultHeight = 800;
  private defaultWidth = 400;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public setHeight(height: number): void {
    this.storage.set(STORAGE_KEY_HEIGHT, height);
  }

  public getHeight(): number {
    return this.storage.get(STORAGE_KEY_HEIGHT) || this.defaultHeight;
  }

  public setWidth(width: number): void {
    this.storage.set(STORAGE_KEY_WIDTH, width);
  }

  public getWidth(): number {
    return this.storage.get(STORAGE_KEY_WIDTH) || this.defaultWidth;
  }
}
