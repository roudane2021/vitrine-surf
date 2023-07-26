import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  premissionAll : string[] = ['user', 'admin'];
  hasView : boolean = false;

  constructor(private templateRef: TemplateRef<any>,private viewContainer: ViewContainerRef) { }


  @Input() set appHasPermission(permissions: string[]) {
    if (permissions.length === 0 && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (permissions.length !=0 && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

 



}
