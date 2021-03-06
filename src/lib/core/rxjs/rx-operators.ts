/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Observable, ObservableInput} from 'rxjs/Observable';
import {PartialObserver} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';
import {Scheduler, IScheduler} from 'rxjs/Scheduler';
import {_finally as _finallyOperator} from 'rxjs/operator/finally';
import {_catch as _catchOperator} from 'rxjs/operator/catch';
import {_do as _doOperator} from 'rxjs/operator/do';
import {map as mapOperator} from 'rxjs/operator/map';
import {filter as filterOperator} from 'rxjs/operator/filter';
import {share as shareOperator} from 'rxjs/operator/share';
import {first as firstOperator} from 'rxjs/operator/first';
import {switchMap as switchMapOperator} from 'rxjs/operator/switchMap';
import {startWith as startWithOperator} from 'rxjs/operator/startWith';
import {debounceTime as debounceTimeOperator} from 'rxjs/operator/debounceTime';
import {auditTime as auditTimeOperator} from 'rxjs/operator/auditTime';
import {takeUntil as takeUntilOperator} from 'rxjs/operator/takeUntil';

/**
 * Represents a strongly-typed chain of RxJS operators.
 *
 * We achieve strict type enforcement on the chained operators by creating types that
 * *unambiguously* match specific rxjs operators. These unambiguous types are created by
 * intersecting a "brand" to the `typeof` the existing operator. The brand (a class with a private
 * member) effectively forces nominal typing for the operators. This allows typescript to understand
 * that, for example, `filter` is *`filter`* and not, say, a map of T => boolean.
 *
 * The downside to this approach is that operators must be imported in their type-coerced form
 * rather than from the normal rxjs location.
 *
 * @docs-private
 */
export interface StrictRxChain<T> {
  call<R>(operator: mapOperatorType<T, R>,
      project: (value: T, index: number) => R, thisArg?: any): StrictRxChain<R>;

  call<R>(operator: switchMapOperatorType<T, R>,
      project: (value: T, index: number) => ObservableInput<R>): StrictRxChain<R>;

  call<R>(operator: catchOperatorType<T, R>,
      selector: (err: any, caught: Observable<T>) => ObservableInput<R>): StrictRxChain<T | R>;

  call(operator: filterOperatorType<T>,
      predicate: (value: T, index: number) => boolean, thisArg?: any): StrictRxChain<T>;

  call(operator: shareOperatorType<T>): StrictRxChain<T>;

  call(operator: finallyOperatorType<T>, action: () => void): StrictRxChain<T>;

  call(operator: doOperatorType<T>, next: (x: T) => void, error?:
      (e: any) => void, complete?: () => void): StrictRxChain<T>;

  call(operator: doOperatorType<T>, observer: PartialObserver<T>): StrictRxChain<T>;

  call(operator: firstOperatorType<T>, thisArg?: any, defaultValue?: any): StrictRxChain<T>;

  call(operator: firstOperatorType<T>, predicate: (value: T) => boolean): StrictRxChain<T>;

  call(operator: startWithOperatorType<T>, ...args: any[]): StrictRxChain<T>;

  call(operator: debounceTimeOperatorType<T>, dueTime: number,
      scheduler?: IScheduler): StrictRxChain<T>;

  call(operator: auditTimeOperatorType<T>, duration: number,
      scheduler?: IScheduler): StrictRxChain<T>;

  call(operator: takeUntilOperatorType<T>, notifier: Observable<any>): StrictRxChain<T>;

  subscribe(fn: (t: T) => void): Subscription;

  result(): Observable<T>;
}

// @docs-private
export class FinallyBrand { private _; }
// @docs-private
export class CatchBrand { private _; }
// @docs-private
export class DoBrand { private _; }
// @docs-private
export class MapBrand { private _; }
// @docs-private
export class FilterBrand { private _; }
// @docs-private
export class ShareBrand { private _; }
// @docs-private
export class FirstBrand { private _; }
// @docs-private
export class SwitchMapBrand { private _; }
// @docs-private
export class StartWithBrand { private _; }
// @docs-private
export class DebounceTimeBrand { private _; }
// @docs-private
export class AuditTimeBrand { private _; }
// @docs-private
export class TakeUntilBrand { private _; }

// @docs-private
export type finallyOperatorType<T> = typeof _finallyOperator & FinallyBrand;
// @docs-private
export type catchOperatorType<T, R> = typeof _catchOperator & CatchBrand;
// @docs-private
export type doOperatorType<T> = typeof _doOperator & DoBrand;
// @docs-private
export type mapOperatorType<T, R> = typeof mapOperator & MapBrand;
// @docs-private
export type filterOperatorType<T> = typeof filterOperator & FilterBrand;
// @docs-private
export type shareOperatorType<T> = typeof shareOperator & ShareBrand;
// @docs-private
export type firstOperatorType<T> = typeof firstOperator & FirstBrand;
// @docs-private
export type switchMapOperatorType<T, R> = typeof switchMapOperator & SwitchMapBrand;
// @docs-private
export type startWithOperatorType<T> = typeof startWithOperator & StartWithBrand;
// @docs-private
export type debounceTimeOperatorType<T> = typeof debounceTimeOperator & DebounceTimeBrand;
// @docs-private
export type auditTimeOperatorType<T> = typeof auditTimeOperator & AuditTimeBrand;
// @docs-private
export type takeUntilOperatorType<T> = typeof takeUntilOperator & TakeUntilBrand;

// @docs-private
export const finallyOperator = _finallyOperator as typeof _finallyOperator & FinallyBrand;
// @docs-private
export const catchOperator = _catchOperator as typeof _catchOperator & CatchBrand;
// @docs-private
export const doOperator = _doOperator as typeof _doOperator & DoBrand;
// @docs-private
export const map = mapOperator as typeof mapOperator & MapBrand;
// @docs-private
export const filter = filterOperator as typeof filterOperator & FilterBrand;
// @docs-private
export const share = shareOperator as typeof shareOperator & ShareBrand;
// @docs-private
export const first = firstOperator as typeof firstOperator & FirstBrand;
// @docs-private
export const switchMap = switchMapOperator as typeof switchMapOperator & SwitchMapBrand;
// @docs-private
export const startWith = startWithOperator as typeof startWithOperator & StartWithBrand;
// @docs-private
export const debounceTime = debounceTimeOperator as typeof debounceTimeOperator & DebounceTimeBrand;
// @docs-private
export const auditTime = auditTimeOperator as typeof auditTimeOperator & AuditTimeBrand;
// @docs-private
export const takeUntil = takeUntilOperator as typeof takeUntilOperator & TakeUntilBrand;
