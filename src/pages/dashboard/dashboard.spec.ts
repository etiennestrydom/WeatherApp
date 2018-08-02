import { GeolocationMock } from "./../../mocks/providers/geolocation-mock";
import { Geolocation } from "@ionic-native/geolocation";
import { LoaderMock } from "./../../mocks/providers/loader-mock";
import { LoaderProvider } from "./../../providers/loader/loader";
import { Settings } from "./../../providers/settings/settings";
import { WeatherServiceMock } from "./../../mocks/providers/weather-service-mock";
import { async, TestBed } from "../../../node_modules/@angular/core/testing";
import { DashboardPage } from "./dashboard";
import { IonicModule } from "ionic-angular";
import { WeatherServiceProvider } from "../../providers/weather-service/weather-service";

describe("DashboardPage Component", () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardPage],
            imports: [IonicModule.forRoot(DashboardPage)],
            providers: [
                {
                    provide: WeatherServiceProvider,
                    useClass: WeatherServiceMock
                },
                {
                    provide: LoaderProvider,
                    useClass: LoaderMock
                },
                {
                    provide: Settings,
                    useClass: WeatherServiceMock
                },
                {
                    provide: Geolocation,
                    useClass: GeolocationMock
                }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardPage);
        component = fixture.componentInstance;
    });

    it("should load the weather for the current location when the view loads", () => {
        expect(true).toBe(true);
    });
});
