import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetCredentialsComponent } from './reset-credentials.component';

describe('ResetCredentialsComponent', () => {
  let component: ResetCredentialsComponent;
  let fixture: ComponentFixture<ResetCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
