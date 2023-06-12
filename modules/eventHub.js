const { EventHubConsumerClient, earliestEventPosition } = require('@azure/event-hubs');


const client = new EventHubConsumerClient(
	process.env.EVENT_HUB_CONSUMER_GROUP,
	process.env.EVENT_HUB_CONNECTION_STRING,
	process.env.EVENT_HUB,
);


const subscriptionOptions = {
	startPosition: earliestEventPosition,
};

const subscription = client.subscribe(
	{
		processEvents: async (events, context) => {
			// event processing code goes here
		},
		processError: async (err, context) => {
			// error reporting/handling code here
		},
	},
	subscriptionOptions,
);

// Wait for a few seconds to receive events before closing
setTimeout(async () => {
	await subscription.close();
	await client.close();
	console.log('Exiting sample');
}, 3 * 1000);