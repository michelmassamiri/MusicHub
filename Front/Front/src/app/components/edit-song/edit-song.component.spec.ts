import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditSongComponent } from './edit-song.component';

// Define gapi before any component is loaded
(window as any).gapi = (window as any).gapi || {
  load: (str: string, callback: Function) => { callback(); },
  auth2: {
    init: (options?: any) => ({ then: (callback: Function) => { callback(); return Promise.resolve(); } })
  },
  client: {
    init: (options?: any) => Promise.resolve()
  }
};

describe('EditSongComponent', () => {
  let component: EditSongComponent;
  let fixture: ComponentFixture<EditSongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSongComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
