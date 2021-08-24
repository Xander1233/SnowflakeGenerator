class SnowflakeGenerator {

	private lastTimestamp: bigint;
	private epoch: bigint;
	private worker: bigint;
	private process: bigint;
	private accumulator: bigint;

	/**
	 * SnowflakeGenerator constructor
	 * @param opts Options to configure the generator to the specific server id and process id
	 */
	constructor(opts = { epoch: 1609459201000n, worker: 1n, process: 1n, accumulator: 0n }) {
		this.lastTimestamp = 0n;
		Object.defineProperty(this, 'epoch', { value: opts.epoch, writable: false });
		Object.defineProperty(this, 'worker', { value: opts.worker, writable: false });
		Object.defineProperty(this, 'process', { value: opts.process, writable: false });
		Object.defineProperty(this, 'accumulator', { value: opts.accumulator, writable: true });
	}

	/**
	 * Get a new generated snowflake as a string
	 * @return {string}
	 */
	get id() {
		return this.next();
	}

	/**
	 * Generate a specific amount of ids at once
	 * @param amount {number?} the amount of ids you wanna generate
	 * @return {string[]|string} array containing ids as strings
	 */
	next(amount?: number) {
		// Return one id if no amount is specified or the amount is 1
		if (!amount || (typeof amount === 'number' && amount === 1))
			return this.generateId().toString();

		// Error check
		if (typeof amount !== 'number')
			throw new Error('You have to provide an amount of type "number"');
		if (amount < 1)
			throw new Error('amount has to be bigger than 0');

		const idArray = [ ];

		for (let i = 0; i < amount; i++) {
			idArray.push(this.generateId().toString());
		}

		return idArray;
	}



	/**
	 * Generates a new id and returns it as a bigint (check "id" for strings)
	 * @return {bigint}
	 */
	generateId() {
		/**
		 * generate a new timestamp
		 * @type {bigint}
		 */
		let currentTimestamp = this.generateTime();

		/**
		 * check if the clock moved backwards. if this is true, a unique id can't be guaranteed => throw an error
		 */
		if (currentTimestamp < this.lastTimestamp) {
			throw new Error('Clock moved backwards!');
		}

		/**
		 * if the timestamp is equal to the last timestamp, check whether the id can be incremented (max value is
		 * 0xFFF (4069)) or not. If not, wait until the next millisecond timestamp and have a new unique timestamp
		 *
		 * otherwise, set accumulator to 0
		 */
		if (currentTimestamp === this.lastTimestamp) {
			this.accumulator = (this.accumulator + 1n) & 0xfffn;
			if (this.accumulator === 0n) {
				currentTimestamp = this.waitUntilNextMillisecond();
			}
		} else
			this.accumulator = 0n;

		this.lastTimestamp = currentTimestamp;

		/**
		 * build the snowflake
		 *
		 * timestamp: bit 63 to bit 22 (42 bits)
		 * worker id: bit 21 to bit 17 (5 bits)
		 * process id: bit 16 to bit 12 (5 bits)
		 * accumulator/increment: bit 11 to 0 (12 bits)
		 */
		return (
			((currentTimestamp - this.epoch) << 22n) |
			(this.worker << 17n) |
			(this.process << 12n) |
			this.accumulator
		);
	}

	/**
	 * returns the current UTC millisecond timestamp as bigint
	 * @return {bigint}
	 */
	private generateTime() {
		return BigInt(new Date(new Date().toUTCString()).getTime());
	}

	/**
	 * parser method for bigints. The number that should be parsed has to be of type number or bigint
	 * @param value {bigint|number}
	 * @return {bigint}
	 */
	private parseBigInt(value) {
		if (typeof value === 'bigint')
			return value;
		if (typeof value === 'number')
			return BigInt(value);
		throw new Error('Value has to be of type number or bigint');
	}

	/**
	 * method to wait until the next millisecond timestamp. This method just waits for the next bigger timestamp
	 * @return {bigint}
	 */
	private waitUntilNextMillisecond() {
		let timestamp = this.generateTime();
		while (timestamp <= this.lastTimestamp) {
			timestamp = this.generateTime();
		}
		return timestamp;
	}
}

module.exports = { SnowflakeGenerator };
