import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreditDashComponent } from "./credit-dash.component";

describe("CreditDashComponent", () => {
  let component: CreditDashComponent;
  let fixture: ComponentFixture<CreditDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditDashComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
