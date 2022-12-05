import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DailyQuoteComponent } from "./daily-quote.component";

describe("DailyQuoteComponent", () => {
  let component: DailyQuoteComponent;
  let fixture: ComponentFixture<DailyQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyQuoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
