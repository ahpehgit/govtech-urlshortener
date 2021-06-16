const cron = require('node-cron');

const CronJob1 = require('./CronJob1');

const start = (dependencies, schedule) => {

	cron.schedule(schedule, async() => {

		const cronJob1 = CronJob1(dependencies);

		Promise.all([cronJob1])
		.then(() => {
			const now = new Date();
			console.log('Cron job executed at', now.toLocaleString());
		});
        
	});
}

module.exports = {
    start,
}