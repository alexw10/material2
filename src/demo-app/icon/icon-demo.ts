import {Component, ViewEncapsulation} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'md-icon-demo',
  templateUrl: 'icon-demo.html',
  styleUrls: ['icon-demo.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IconDemo {
  constructor(mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    mdIconRegistry
        .addSvgIcon('thumb-up',
            sanitizer.bypassSecurityTrustResourceUrl('/icon/assets/thumbup-icon.svg'))
        .addSvgIcon('test1',
            sanitizer.bypassSecurityTrustResourceUrl('/icon/assets/test1.svg'))
        .addSvgIcon('test2',
            sanitizer.bypassSecurityTrustResourceUrl('/icon/assets/test2.svg'))
        .addSvgIconSetInNamespace('core',
            sanitizer.bypassSecurityTrustResourceUrl('/icon/assets/core-icon-set.svg'))
        .registerFontClassAlias('fontawesome', 'fa');
  }
}
//