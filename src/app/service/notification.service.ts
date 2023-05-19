import { InjectionToken } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export const NotificationInstance = new InjectionToken<NotificationService>('injection token for news feed app');

export class NotificationService {
    readonly NOTIFICATION!: BehaviorSubject<any>;

    constructor() {
        this.NOTIFICATION = new BehaviorSubject<number>(0);
        
    };
    _setNotification(data: any) {
        this.NOTIFICATION.next(data);
    };

    _getNotification() {
        return this.NOTIFICATION.value;
    };

    _getNotificationAsObserverble(): Observable<any> {
        return this.NOTIFICATION.asObservable();
    };
}