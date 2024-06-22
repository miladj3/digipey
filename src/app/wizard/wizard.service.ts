import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class WizardService {
  private _showNextStepSource: Subject<void> = new Subject<void>();
  public readonly showNextStep$: Observable<void> = this._showNextStepSource.asObservable();

  private _showPreviousStepSource: Subject<void> = new Subject<void>();
  public readonly showPreviousStep$: Observable<void> = this._showPreviousStepSource.asObservable();

  private _indexSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public readonly index$: Observable<number> = this._indexSource.asObservable();

  public get selectedIndex(): number{
    return this._indexSource.value;
  }
  public next() {
    this._showNextStepSource.next();
  }

  public previous() {
    this._showPreviousStepSource.next();
  }

  public setIndex(index: number) {
    this._indexSource.next(index);
  }
}
