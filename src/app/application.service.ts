import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import Parse from 'parse';
import { MatSnackBar } from '@angular/material';

interface IApplication {
  id: string,
  get: Function,
  attributes: any
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private readonly _apps = new BehaviorSubject<IApplication[]>([]);
  public readonly apps$ = this._apps.asObservable()
                                      .pipe(map(apps => apps.map(this.mapApp.bind(this))));
                                      bypassSecurityTrustUrl
  constructor(private _snackBar: MatSnackBar) {
    Parse.initialize('jldanfkjasndklasdna', 'jeqwnjefjnjlwnqwlsmwkqlmwqpe');
    // Parse.serverURL = `http://localhost:1337/parse`;
    Parse.serverURL = `${window.location.origin}/parse`;
  }

  public get apps(): IApplication[] {
    return this._apps.getValue();
  }

  public set apps(val: IApplication[]) {
    this._apps.next(val);
  }

  public async fetchApplications(): Promise<any> {
    const Application = Parse.Object.extend('Application');
    const query = new Parse.Query(Application);
    try {
      this.apps = await query.find();
    } catch (e) {
      this.apps = [];
    }
  }

  private mapApp(app): any {
    const src = app.attributes.src;
    return Object.assign({}, app.attributes, {
      src
    });
  }

  public async addApp(name: string, src: string): Promise<void> {
    const Application = Parse.Object.extend('Application');
    const application = new Application();
    application.set('name', name);
    application.set('src', src);
    await application.save();
    this._snackBar.open('Application is added', null, { duration: 3000 });
    this.fetchApplications();
  }
}
