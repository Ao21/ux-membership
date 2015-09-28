import { Dispatcher } from './dispatcher';
import { DefaultStore } from './defaults';



export class Store {
	channel: string;
	dispatcher: Dispatcher;
	private _store: any;


	constructor(dispatcher: Dispatcher, channel: string, store?: any) {
		this.dispatcher = dispatcher;
		this.channel = channel + '.store';
		if (store) {
			this._store = new Baobab(store, {asynchronous: false});
		} else {
			this._store = new Baobab(DefaultStore);
		}
		
		this.dispatcher.subscribe(this.channel, 'update', this.onUpdate);
		this.dispatcher.subscribe(this.channel, 'remove', this.onRemove);

	}
	
	select(...args): Store {
		return this._store.select(args);
	}

	get(path?: any): Store {
		return path ? this._store.get(path) : this._store.get();
	}
	
	onUpdate = (obj: any) => {
		this._store.set(obj.prop, obj.value);
		this.emitUpdate();
	};
	
	onRemove = (obj: any) => {
		this._store.unset(obj.prop);
		this.emitUpdate();
	}
	
	
	subscribe(cb: any): ISubscriptionDefinition {
		let sub = this.dispatcher.subscribe(this.channel, 'is-updated', (state: any) => {
			cb(state);
		});
		return sub;
	}
	
	unsubscribe(): void {
		this.dispatcher.unsubscribe(this.channel, 'is-updated');
	}
	
	unsubsribeSub(sub:ISubscriptionDefinition):void {
		this.dispatcher.unsubsribeSub(sub);
	}
	
	unsubscribeAll(): void {
		this.dispatcher.unsubscribeAll();
	}
	
	remove(path: any): void {
		this.dispatcher.publish(this.channel, 'remove', {
			prop: path
		});
	}
	
	update(path: any, value: any): void {
		this.dispatcher.publish(this.channel, 'update', {
			prop: path,
			value: value
		});
	}
	
	splice(path: string, index: number, value: any) : void {
		this.dispatcher.publish(this.channel, 'splice', {
			prop: path,
			value: value,
			index: index
		});
	}
	
	

	emitUpdate(): void {
		this.dispatcher.publish(this.channel, 'is-updated', this._store);
	}
	
	debug__getSubs(){
		console.log(this.dispatcher.subscriptions());
	}
	

}