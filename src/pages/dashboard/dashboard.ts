import { WeatherForecastResponse } from "./../../models/response/weather-forecast-response";
import { LoaderProvider } from "../../providers/loader/loader";
import { WeatherSingle } from "../../models/weather-single";
import { WeatherServiceProvider } from "../../providers/weather-service/weather-service";
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import "rxjs/add/operator/do";
import "rxjs/add/operator/finally";
import { WeatherRequest } from "../../models/request/weather-request";

@IonicPage()
@Component({
    selector: "page-dashboard",
    templateUrl: "dashboard.html"
})
export class DashboardPage {
    _weatherServiceProvider: WeatherServiceProvider;
    _loaderProvider: LoaderProvider;
    _weatherSingle: WeatherSingle;
    _weatherForecastResponse: WeatherForecastResponse;

    constructor(
        weatherServiceProvider: WeatherServiceProvider,
        loaderProvider: LoaderProvider
    ) {
        this._weatherServiceProvider = weatherServiceProvider;
        this._loaderProvider = loaderProvider;
    }

    ionViewDidLoad() {
        let weatherRequest = new WeatherRequest("1", "2");

        this._weatherServiceProvider
            .getCurrentWeather(weatherRequest)
            .do(() => {})
            .finally(() => {})
            .subscribe(
                weatherSingle => {
                    this._weatherSingle = weatherSingle;
                    console.log(this._weatherSingle.weather[0].main);
                },
                error => {
                    console.log("This is an error: " + error.message);
                }
            );

        this._weatherServiceProvider
            .getWeatherForecast(weatherRequest)
            .do(() => {})
            .finally(() => {})
            .subscribe(
                weatherForecastResponse => {
                    this._weatherForecastResponse = weatherForecastResponse;
                    console.log(this._weatherForecastResponse.list[0].main);
                },
                error => {
                    console.log("This is an error: " + error.message);
                }
            );
    }
}
