import { WeatherRequest } from "./../../models/request/weather-request";
import { APPID } from "./../../constants/storage-keys";
import { WeatherForecastResponse } from "./../../models/response/weather-forecast-response";
import { LoaderProvider } from "../../providers/loader/loader";
import { WeatherSingle } from "../../models/weather-single";
import { WeatherServiceProvider } from "../../providers/weather-service/weather-service";
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Settings } from "../../providers";
import "rxjs/add/operator/do";
import "rxjs/add/operator/finally";

@IonicPage()
@Component({
    selector: "page-dashboard",
    templateUrl: "dashboard.html"
})
export class DashboardPage {
    private _weatherServiceProvider: WeatherServiceProvider;
    private _loaderProvider: LoaderProvider;
    private _settings: Settings;

    public weatherSingle: WeatherSingle;
    public weatherForecastResponse: WeatherForecastResponse;

    constructor(weatherServiceProvider: WeatherServiceProvider, loaderProvider: LoaderProvider, settings: Settings) {
        this._weatherServiceProvider = weatherServiceProvider;
        this._loaderProvider = loaderProvider;
        this._settings = settings;
    }

    ionViewDidLoad() {
        this._settings.getValue(APPID).then(appid => {
            let weatherRequest = new WeatherRequest("1", "2", appid);

            this.getWeatherForCurrentLocation(weatherRequest);
            this.get5DayWeatherForecastForCurrentLocation(weatherRequest);
        });
    }

    getWeatherForCurrentLocation(weatherRequest: WeatherRequest) {
        this._weatherServiceProvider
            .getCurrentWeather(weatherRequest)
            .do(() => {})
            .finally(() => {})
            .subscribe(
                (weatherSingle: WeatherSingle) => {
                    this.weatherSingle = weatherSingle;
                    console.log(this.weatherSingle);
                },
                error => {
                    console.log("This is an error: " + error.message);
                }
            );
    }

    get5DayWeatherForecastForCurrentLocation(weatherRequest: WeatherRequest) {
        this._weatherServiceProvider
            .getWeatherForecast(weatherRequest)
            .do(() => {})
            .finally(() => {})
            .subscribe(
                (weatherForecastResponse: WeatherForecastResponse) => {
                    this.weatherForecastResponse = weatherForecastResponse;
                    console.log(this.weatherForecastResponse.list);
                    console.log(this.weatherForecastResponse.forecast);
                },
                error => {
                    console.log("This is an error: " + error.message);
                }
            );
    }
}
