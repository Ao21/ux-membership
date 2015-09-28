import { Inject, Attribute, Component, View, ViewEncapsulation, NgFor, ElementRef, NgClass, OnDestroy} from 'angular2/angular2';
import { Dispatcher } from '../../../../services/services';
import { Modal } from '../modal';

@Component({
	selector: 'fs-modal-popup',
	properties: ['channel'],
	bindings: [],
})

@View({
	templateUrl: 'app/components/shared/modals/fs_popup_modal/fs_popup_modal.html',
	directives: [NgClass],
	styleUrls: ['app/components/shared/modals/fs_popup_modal/fs_popup_modal.css'],
})

export class FsModalPopup extends Modal {
	data: any;
	channel: string;


	constructor(
		@Attribute('channel') channel: string,
		public dispatcher: Dispatcher
		) {
		super(dispatcher);
		this.channel = channel ? channel : 'defaultFsModal';

	}
}