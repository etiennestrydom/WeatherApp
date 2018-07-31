import { WeatherSingle } from "./../../models/weather-single";
import { CurrentWeatherRequest } from "./../../models/request/current-weather-request";
import { WeatherServiceProvider } from "./../../providers/weather-service/weather-service";
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";

@IonicPage()
@Component({
    selector: "page-dashboard",
    templateUrl: "dashboard.html"
})
export class DashboardPage {
    _weatherSingle: WeatherSingle;
    _weatherServiceProvider: WeatherServiceProvider;

    constructor(weatherServiceProvider: WeatherServiceProvider) {
        this._weatherServiceProvider = weatherServiceProvider;
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad DashboardPage");
        let currentWeatherRequest = new CurrentWeatherRequest("1", "2");

        this._weatherServiceProvider
            .getCurrentWeather(currentWeatherRequest)
            .subscribe(weatherSingle => {
                this._weatherSingle = weatherSingle;
                console.log(this._weatherSingle.main.temp);
            });
    }
}
