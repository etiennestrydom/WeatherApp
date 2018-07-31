import { BaseUrl, WeatherEndpoint } from "./../constants/api-endpoints";
import { CurrentWeatherRequest } from "./../../models/request/current-weather-request";
import { ApiMock } from "./../../mocks/providers/api-mock";
import { Api } from "./../api/api";
import { TestBed } from "@angular/core/testing";
import { WeatherServiceProvider } from "./weather-service";

describe("WeatherService Provider", () => {
    let service: WeatherServiceProvider;
    let api: ApiMock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WeatherServiceProvider,
                { provide: Api, useClass: ApiMock }
            ]
        });
        service = TestBed.get(WeatherServiceProvider);
        api = TestBed.get(Api);
    });

    it("should get the current weather for the user's current location", () => {
        // arrange
        var request = new CurrentWeatherRequest();
        request.lat = "-25.968280";
        request.lon = "28.125952";

        var response = {
            weather: [
                {
                    main: "clouds"
                }
            ],
            main: {
                temp: 289.5,
                temp_min: 287.04,
                temp_max: 292.04
            }
        };
        api.response = response;
        api.url = BaseUrl + "/" + WeatherEndpoint;
        api.params = request;

        var expectedResult = response;

        // act
        var actualResult = service.GetCurrentWeather(request);

        // assert
        expect(JSON.stringify(expectedResult)).toEqual(
            JSON.stringify(actualResult)
        );
    });

    // it("should retrieve a 5 day weather forecast for the user's current location", () => {});
});
