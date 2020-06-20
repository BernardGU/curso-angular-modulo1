import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoFormComponent } from './destino-form.component';

describe('DestinoFormComponent', () => {
  let component: DestinoFormComponent;
  let fixture: ComponentFixture<DestinoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
