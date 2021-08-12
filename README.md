# SnowflakeGenerator
Twitter snowflake generator in pure javascript.

## Tutorial

1. Create a new `SnowflakeGenerator` object
2. Call `id` to generate a new id

```
const generator = new SnowflakeGenerator();

generator.id; // New generated snowflake
generator.id; // New generated snowflake. Different to the snowflake that got generated before
```

## Docs


| Key         | Type   | Required | Default        | Description                                                                                                      |
|-------------|--------|----------|----------------|------------------------------------------------------------------------------------------------------------------|
| epoch       | bigint | no       | 1609459201000n | The epoch that indicates the start of the snowflakes timestamp                                                   |
| worker      | bigint | no       | 1n             | The worker's id. The ID of the datacenter or server can be used as well                                          |
| process     | bigint | no       | 1n             | The process id.                                                                                                  |
| accumulator | bigint | no       | 0n             | The increment id or accumulator that indicates the snowflake's id from their respectiv process, worker and epoch |
