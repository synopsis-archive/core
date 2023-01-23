import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SynoBaseComponent } from "./syno-base.component";

describe("SynoBaseComponent", () => {
  let component: SynoBaseComponent;
  let fixture: ComponentFixture<SynoBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynoBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SynoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
