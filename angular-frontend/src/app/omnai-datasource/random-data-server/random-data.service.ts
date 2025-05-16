import { Injectable, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataFormat, type DataSource } from '../../shared/data-source.model';

@Injectable({ providedIn: 'root' })
export class DummyDataService implements DataSource {
    private readonly _data = signal<Record<string, DataFormat[]>>({});
    readonly data = this._data.asReadonly(); 
    private subscription: Subscription | null = null;
    private readonly MAX_DATA_POINTS = 10;

    connect(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = interval(1000)
            .pipe(
                map(() => ({
                    timestamp: Date.now(),
                    value: Math.random() * 100,
                }))
            )
            .subscribe((point) => {
                this._data.update(current => ({
                    ...current,
                    dummy: [...(current['dummy'] ?? []), point].slice(-this.MAX_DATA_POINTS)
                }));
            });
    }

    disconnect(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    clearData(): void {
        this.disconnect();
        this._data.set({});
    }
}