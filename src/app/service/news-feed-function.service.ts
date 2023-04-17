import { InjectionToken } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export const NewsFeedFunctionInstance = new InjectionToken<NewsFeedFunction>('injection token for news feed app');

export class NewsFeedFunction {
    readonly NOTIFICATION!: BehaviorSubject<any>;

    constructor() {
        this.NOTIFICATION = new BehaviorSubject<any>(null);
    }

    _setNotification(data: any) {
        this.NOTIFICATION.next(data);
    }

    _getNotification() {
        return this.NOTIFICATION.value;
    }

    _getNotificationAsObserverble(): Observable<any> {
        return this.NOTIFICATION.asObservable();
    }
}