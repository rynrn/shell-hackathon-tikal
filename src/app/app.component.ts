import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public applications: any = [];
  public src: string;
  public name: string;

  constructor(public applicationService: ApplicationService, public dialog: MatDialog) {}

  ngOnInit() {
    this.applicationService.fetchApplications();
  }

  public openDialog() {
    this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px'
    });
  }

  public onLoadIframe(event) {
    // console.log(event.target.contentDocument)
    // const base = event.target.contentDocument.createElement('base');
    // base.href = "/app/maor/";
    // event.target.contentDocument.head.appendChild(base);
    // document.head.innerHTML = document.head.innerHTML + "<base href='" + document.location.href + "' />";
  }
}
