module.exports = class SnowflakeGenerator {

	constructor(opts = { epoch: 1609459201000n, worker: 1n, process: 1n, accumulator: 0n }) {
		this.lastTimestamp = 0n;
		Object.defineProperty(this, 'epoch', { value: opts.epoch, writable: false });
		Object.defineProperty(this, 'worker', { value: opts.worker, writable: false });
		Object.defineProperty(this, 'process', { value: opts.process, writable: false });
		Object.defineProperty(this, 'accumulator', { value: opts.accumulator, writable: true });
	}

	get id() {
		return this.generate().toString();
	}

	generate() {
		let timestamp = this.generateTime();

		if (timestamp < this.lastTimestamp) {
			throw new Error('Clock moved backwards!');
		}

		if (timestamp === this.lastTimestamp) {
			this.accumulator = (this.accumulator + 1n) & 0xfffn;
			if (this.accumulator === 0n) {
				timestamp = this.waitUntilNextMillisecond();
			}
		} else
			this.accumulator = 0n;

		this.lastTimestamp = timestamp;

		return (((timestamp - this.epoch) << 22n) |
			(this.worker << 17n) |
			(this.process << 12n) |
			this.accumulator);
	}

	generateTime() {
		return BigInt(new Date(new Date().toUTCString()).getTime());
	}

	parseBigInt(value) {
		if (typeof value === 'bigint')
			return value;
		if (typeof value === 'number')
			return BigInt(value);
		throw new Error('Value has to be of type number or bigint');
	}

	waitUntilNextMillisecond() {
		let timestamp = this.generateTime();
		while (timestamp <= this.lastTimestamp) {
			timestamp = this.generateTime();
		}
		return timestamp;
	}
}
