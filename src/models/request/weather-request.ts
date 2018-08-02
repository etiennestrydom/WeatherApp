import { UNITS_METRIC } from "../../constants/string-literals";

export class WeatherRequest {
    lat: string;
    lon: string;
    units: string;
    appid: string;

    constructor(lat: string, lon: string, appid: string = null) {
        this.lat = lat;
        this.lon = lon;
        this.units = UNITS_METRIC;
        this.appid = appid;
    }
}
