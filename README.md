# SnowflakeGenerator
Twitter snowflake generator in pure javascript.

## Tutorial

1. Create a new `SnowflakeGenerator` object
2. Call `id` to generate a new id

```js
const snowflakeGenerator = new SnowflakeGenerator();

snowflakeGenerator.id; // New generated snowflake
snowflakeGenerator.id; // New generated snowflake. Different to the snowflake that got generated before
```

# Docs


| Key         | Type   | Required | Default        | Description                                                                                                      |
|-------------|--------|----------|----------------|------------------------------------------------------------------------------------------------------------------|
| epoch       | bigint | no       | 1609459201000n | The epoch that indicates the start of the snowflakes timestamp                                                   |
| worker      | bigint | no       | 1n             | The worker's id. The ID of the datacenter or server can be used as well                                          |
| process     | bigint | no       | 1n             | The process id.                                                                                                  |
| accumulator | bigint | no       | 0n             | The increment id or accumulator that indicates the snowflake's id from their respectiv process, worker and epoch |

## Properties

### [.id](https://github.com/Xander1233/SnowflakeGenerator/blob/f75233aeee86210ed858f1f9f20feb9cb411c56c/index.js#L19)

Get one new generated snowflake 

**Returns:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

**Example:**

```js
const snowflake = snowflakeGenerator.id;
```

## Methods

### [.next([amount])](https://github.com/Xander1233/SnowflakeGenerator/blob/f75233aeee86210ed858f1f9f20feb9cb411c56c/index.js#L28)

Generate 1 or more snowflakes
| Parameter | Type   | Required | Default | Description                                   |
|-----------|--------|----------|---------|-----------------------------------------------|
| amount    | number | no       | 1       | The amount of snowflakes you want to generate |

**Returns:** [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

**Example:**

```js
const snowflake = snowflakeGenerator.next();
```

### [.generateId()](https://github.com/Xander1233/SnowflakeGenerator/blob/f75233aeee86210ed858f1f9f20feb9cb411c56c/index.js#L54)

Generate a new snowflake as a bigint

**Returns:** [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

**Example:**

```js
const snowflake = snowflakeGenerator.generateId();
```
