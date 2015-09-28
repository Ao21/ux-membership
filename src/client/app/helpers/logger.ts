import {Injectable} from 'angular2/angular2';

@Injectable() class Logger {
	_names: Array<string>;

	error(message: string, data: any, title: string): void {
		toastr.error(message, title);
	}
	info(message: string, data: any, title: string): void {
		toastr.info(message, title);
	}
	success(message: string, data: any, title: string): void {
		toastr.success(message, title);
	}
	warning(message: string, data: any, title: string): void {
		toastr.warning(message, title);
	}

}

export { Logger }