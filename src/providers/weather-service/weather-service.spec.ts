import { BASE_URL, WEATHER_ENDPOINT } from "./../constants/api-endpoints";
import { ApiMock } from "./../../mocks/providers/api-mock";
import { Api } from "./../api/api";
import { TestBed } from "@angular/core/testing";
import { WeatherServiceProvider } from "./weather-service";
import { WeatherRequest } from "../../models/request/weather-request";

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
        var request = new WeatherRequest("-25.968280", "28.125952");

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
        api.url = BASE_URL + "/" + WEATHER_ENDPOINT;
        api.params = request;

        var expectedResult = response;

        // act
        var actualResult = service.getCurrentWeather(request);

        // assert
        expect(JSON.stringify(expectedResult)).toEqual(
            JSON.stringify(actualResult)
        );
    });

    // it("should retrieve a 5 day weather forecast for the user's current location", () => {});
});
