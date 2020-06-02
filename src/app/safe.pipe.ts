import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../environments/environment';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}
 
 public transform(value: any): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    // const url = `/app/${value}`;
    // const url = environment.production ? `/app/${value}` : `http://localhost:1337/app/${value}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}