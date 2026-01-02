import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlaylistComponent } from './add-playlist.component';

describe('AddPlaylistComponent', () => {
  let component: AddPlaylistComponent;
  let fixture: ComponentFixture<AddPlaylistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
