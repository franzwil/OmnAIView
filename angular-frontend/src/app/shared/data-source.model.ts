import { Signal } from "@angular/core";

/** Dummy interface to match your expected shape */
export interface DataPoint {
    x: number;
    y: number;
}

export interface DataFormat {
  timestamp: number;
  value: number;
}

/** Your expected DataSource interface */
export interface DataSource {
    connect(): unknown;
    disconnect(): void;
    clearData(): void;
    data: Signal<Record<string, DataFormat[]>>;
}

export interface DataSourceInfo extends DataSource{
    id: string;
    name: string;
    description?: string;
}