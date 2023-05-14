import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAOComponent } from './mes-ao.component';

describe('MesAOComponent', () => {
  let component: MesAOComponent;
  let fixture: ComponentFixture<MesAOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesAOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesAOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
