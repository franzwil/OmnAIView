import { Component, inject } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { SaveDataModalComponent } from "../save-data-modal/save-data-modal.component";
import { DataSourceSelectionService } from "./data-source-selection.service";


@Component({
    selector: 'app-save-data-button',
    standalone: true,
    imports: [MatDialogModule, MatIconModule],
    template: `
        <button mat-icon-button (click)="openSaveModal()" aria-label="Save Data" id="save-button">
        <mat-icon>save</mat-icon>
        </button>
    `,
    styles: `button { display: flex; padding: .3em }`,
})
export class SaveDataButtonComponent {
    private readonly dialog = inject(MatDialog);
    private readonly datasource = inject(DataSourceSelectionService);

    openSaveModal(): void {
        const dialogRef = this.dialog.open(SaveDataModalComponent, { width: '60vw' });
        dialogRef.afterClosed().subscribe(() => {
            if (this.datasource.hasSelection()) {
                    this.datasource.currentSource()?.save();
                }
        });
    }
    
}