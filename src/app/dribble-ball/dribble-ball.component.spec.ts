import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DribbleBallComponent } from './dribble-ball.component';

describe('DribbleBallComponent', () => {
  let component: DribbleBallComponent;
  let fixture: ComponentFixture<DribbleBallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DribbleBallComponent]
    });
    fixture = TestBed.createComponent(DribbleBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
