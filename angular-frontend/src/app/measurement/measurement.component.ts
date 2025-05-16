import { Component, effect, inject } from '@angular/core';
import { DataSourceSelectionService } from '../source-selection/data-source-selection.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-measurement',
  imports: [MatIconModule],
  templateUrl: './measurement.component.html',
  styleUrl: './measurement.component.css'
})
export class MeasurementComponent {
  // TODO: Get activation from dataSourceSelection
  private _activeMeasurement: boolean = false;

  private readonly dataSourceSelection = inject(DataSourceSelectionService);
  private source = this.dataSourceSelection.availableSources().find(source => source.id === "dummydata");

  startPauseMeasurement() {
    this._activeMeasurement = !this._activeMeasurement;
    if (this.dataSourceSelection.currentSource()==null) {
      this.dataSourceSelection.selectSource(this.source!);
      this._activeMeasurement = true;
      this.updateStartButton();
    }
    if(this._activeMeasurement) {
      // Dummy variables as test case.
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

  getNameDataSource() {
    return this.dataSourceSelection.currentSource()?.name ?? "No source connected.";
  }

  updateStartButton() {
    if (this._activeMeasurement) {
      return "Pause";
    } else {
      return "Start";
    }
  }
}
