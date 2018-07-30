import { async, TestBed } from "../../../node_modules/@angular/core/testing";
import { DashboardPage } from "./dashboard";
import { IonicModule, NavController } from "ionic-angular";
import { NavMock } from "../../../test-config/mocks-ionic";

describe("DashboardPage Component", () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPage],
      imports: [IonicModule.forRoot(DashboardPage)],
      providers: [{ provide: NavController, useClass: NavMock }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
  });

  it("true should be true", () => {
    expect(true).toBe(true);
  });
});
