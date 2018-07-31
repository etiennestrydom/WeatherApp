import { LoadingController, Loading } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class LoaderProvider {
    _loadingController: LoadingController;
    _loader: Loading;

    constructor(loadingController: LoadingController) {
        this._loadingController = loadingController;
        this._loader = this._loadingController.create();
    }

    public presentLoader() {
        this._loader.present();
    }

    public dismissLoader() {
        this._loader.dismiss();
    }
}
