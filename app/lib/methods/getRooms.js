import { getUpdatedSince } from '../database/helpers/subscriptions';
import { appDatabase } from '../database';

export default async function() {
	const updatedSince = await getUpdatedSince(appDatabase);
	// subscriptions.get: Since RC 0.60.0
	// rooms.get: Since RC 0.62.0
	if (updatedSince) {
		return Promise.all([this.sdk.get('subscriptions.get', { updatedSince }), this.sdk.get('rooms.get', { updatedSince })]);
	}
	return Promise.all([this.sdk.get('subscriptions.get'), this.sdk.get('rooms.get')]);
}
