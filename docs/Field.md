# filters

All filters are chainable.

# Options

## field.default(defaultValue)
Defines default value that will be returned if Field Data is undefined.
**Arguments**:
* `{any} defaultValue`

## field.nullable()
Allows Field Data to be null.

## field.optional()
Makes Field optional.


# Helper Validators

## field.after(date, errorMessage)

## field.before(date, errorMessage)

## field.email(errorMessage)

## field.oneOf(acceptableValue, errorMessage)

## field.equal(compare, errorMessage)

## field.length(length, errorMessage)

## field.match(regex, errorMessage)

## field.max(max, errorMessage)

## field.maxLength(maxLength, errorMessage)

## field.min(min, errorMessage)

## field.minLength(minLength, errorMessage)

## field.range(min, max, errorMessage)

## field.trim(errorMessage)

## field.toLowerCase(errorMessage)

## field.toUpperCase(errorMessage)

# Data Types Validators

## field.any()

## field.array(errorMessage)

## field.arrayOf()
Defines Field as an Array with items defined by nested Field or Schema.

## field.date(errorMessage)

## field.boolean(errorMessage)

## field.geopoint(errorMessage)

## field.integer(errorMessage)

## field.number(errorMessage)

## field.object(errorMessage)

## field.oneOf(errorMessage)

## field.reference(errorMessage)

## field.string(errorMessage)

## field.timestamp(errorMessage)

# Custom / Misc / Additional

## field.custom(filter)
Adds custom filter to stack.
**Arguments**:
* `{Function} filter` – filter function
