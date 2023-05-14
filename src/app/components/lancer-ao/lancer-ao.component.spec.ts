import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancerAoComponent } from './lancer-ao.component';

describe('LancerAoComponent', () => {
  let component: LancerAoComponent;
  let fixture: ComponentFixture<LancerAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancerAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancerAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
