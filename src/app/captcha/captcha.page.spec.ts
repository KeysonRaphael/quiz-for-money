import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaptchaPage } from './captcha.page';

describe('CaptchaPage', () => {
  let component: CaptchaPage;
  let fixture: ComponentFixture<CaptchaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaptchaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
