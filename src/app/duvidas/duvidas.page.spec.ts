import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DuvidasPage } from './duvidas.page';

describe('DuvidasPage', () => {
  let component: DuvidasPage;
  let fixture: ComponentFixture<DuvidasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuvidasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DuvidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
