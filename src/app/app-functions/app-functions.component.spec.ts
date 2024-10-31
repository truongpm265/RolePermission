import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFunctionsComponent } from './app-functions.component';

describe('AppFunctionsComponent', () => {
  let component: AppFunctionsComponent;
  let fixture: ComponentFixture<AppFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppFunctionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
