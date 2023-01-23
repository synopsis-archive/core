import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SynoButtonComponent } from "./syno-button.component";

describe("SynoButtonComponent", () => {
  let component: SynoButtonComponent;
  let fixture: ComponentFixture<SynoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynoButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SynoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
