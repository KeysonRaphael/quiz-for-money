import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarteiraPage } from './carteira.page';

describe('CarteiraPage', () => {
  let component: CarteiraPage;
  let fixture: ComponentFixture<CarteiraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteiraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarteiraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
