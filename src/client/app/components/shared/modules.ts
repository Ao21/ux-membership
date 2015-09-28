import {Checkbox} from './checkbox/checkbox';
import {Incrementor} from './incrementor/incrementor';
import {FsModalPopup} from './modals/fs_popup_modal/fs_popup_modal';
import {Nav} from './nav/nav';
import {DynamicInput} from './dynamic_input/dynamic_input';

export {DynamicLoader} from './dynamic_loader/dynamic_loader';


// global App only directives
export var sharedComponents: Array<any> = [
	Checkbox,
	Incrementor,
	FsModalPopup,
	Nav,
	DynamicInput
];
