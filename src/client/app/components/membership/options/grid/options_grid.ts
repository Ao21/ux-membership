import {
Component,
View,
NgFor,
NgIf,
OnInit,
NgClass,
ChangeDetectionStrategy} from 'angular2/angular2';

import { OnActivate, OnDeactivate } from 'angular2/router';
import { MembershipState } from 'app/services/services';
import { FilterPipe } from 'app/pipes/filter_pipe';
import { OptionsGridItem } from './options_grid_item';
import { sharedComponents } from '../../../../components/shared/modules';

@Component({
	selector: 'options-grid',
	properties: ['title'],
	changeDetection: ChangeDetectionStrategy.OnPush
})


@View({
	templateUrl: 'app/components/membership/options/grid/options_grid.html',
	styleUrls: ['app/components/membership/options/grid/options_grid.css'],
	directives: [NgFor, NgIf, NgClass, OptionsGridItem, sharedComponents],
	pipes: [FilterPipe]
})
export class OptionsGrid implements OnDeactivate {

	state: MembershipState;
	allBenefits: any = [];
	sub: ISubscriptionDefinition;
	initialFilter: any;

	constructor(public store: MembershipState) {
		this.state = store.membershipOptions;
		this.initialFilter = {'default':{'pkg':'default'},'rescueMe':{'pkg':'rescuePlus'}};
		_.each(this.state, (e: any) => {
			if(e.benefits) {
				this.allBenefits = this.allBenefits.concat(e.benefits);
			}
		})
		
		this.sub = this.store.subscribe((state: any) => {
			this.state = state.select('membership', 'options').get();
		});
		this.onToggleRescuePlus(this.store.get(['membership', 'options', 'rescuePlus', 'active']));
	}

	onToggleRescuePlus(toggle) {
		if(toggle) {
			this.initialFilter = {'default':{'*':'*'},'rescueMe':{'pkg':'*'}}
		}
		else {
			this.initialFilter = {'default':{'pkg':'default'},'rescueMe':{'pkg':'rescuePlus'}}
		}
		this.store.update(['membership','options','rescuePlus','active'], toggle)
		
	};
	
	onDeactivate() {
		this.store.unsubsribeSub(this.sub);
	}



}
