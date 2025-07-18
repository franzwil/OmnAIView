import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDataModalComponent } from './save-data-modal.component';

describe('SaveDataModalComponent', () => {
  let component: SaveDataModalComponent;
  let fixture: ComponentFixture<SaveDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveDataModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
