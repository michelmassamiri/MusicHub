import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public status: BehaviorSubject<boolean>;

  constructor() {
    this.status = new BehaviorSubject<boolean>(false);
  }

  display(value: boolean) {
    this.status.next(value);
  }
}
