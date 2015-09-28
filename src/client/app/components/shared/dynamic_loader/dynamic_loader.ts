import {
  Component,
  View,
  bootstrap,
  CORE_DIRECTIVES,
  ElementRef,
  DynamicComponentLoader,
  LifecycleEvent,
  Attribute
  
} from 'angular2/angular2';

export class DynamicLoader {
  loadComponentByName(name){
    return this.loadComponent(
		{component:'Input',path: 'app/components/shared/form/input/input'}
	);
  }
  loadComponent(configObject){
    return System.import(configObject.path)
      .then(componentModule => 
        componentModule[configObject.component])
  }
}