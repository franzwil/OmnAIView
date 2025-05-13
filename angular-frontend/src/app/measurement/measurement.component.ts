import { Component, inject } from '@angular/core';
import { DataSourceSelectionService } from '../source-selection/data-source-selection.service';

@Component({
  selector: 'app-measurement',
  imports: [],
  templateUrl: './measurement.component.html',
  styleUrl: './measurement.component.css'
})
export class MeasurementComponent {
  private _activeMeasurement: boolean = false;

  readonly dataSourceSelection = inject(DataSourceSelectionService);
  readonly source = this.dataSourceSelection.availableSources().find(source => source.id === "dummydata");

  startPauseMeasurement() {
    this._activeMeasurement = !this._activeMeasurement;
    if(this._activeMeasurement) {
      // Dummy variables as test case.
      this.dataSourceSelection.selectSource(this.dataSourceSelection.availableSources()[1]);
      this.dataSourceSelection.currentSource()?.connect();
    } else {
      this.dataSourceSelection.currentSource()?.disconnect();
    }
  }

  deleteMeasurementData() {
    this._activeMeasurement = false;
    this.dataSourceSelection.currentSource()?.clearData();
    this.dataSourceSelection.clearSelection();
    // Clear all data (in future data selection also)
  }

  updateStartButton() {
    if (this._activeMeasurement) {
      return "Pause";
    } else {
      return "Start";
    }
  }
}
