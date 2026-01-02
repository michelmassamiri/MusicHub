import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaylistComponent } from './edit-playlist.component';

describe('EditPlaylistComponent', () => {
  let component: EditPlaylistComponent;
  let fixture: ComponentFixture<EditPlaylistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
