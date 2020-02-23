import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssuntosComponent } from './assuntos.component';

describe('AssuntosComponent', () => {
  let component: AssuntosComponent;
  let fixture: ComponentFixture<AssuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssuntosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
