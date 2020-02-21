## Classes

<dl>
<dt><a href="#Field">Field</a></dt>
<dd></dd>
<dt><a href="#Model">Model</a></dt>
<dd></dd>
<dt><a href="#Schema">Schema</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#asyncForEach">asyncForEach(array, callback)</a></dt>
<dd><p>Runs async code for each item in array.</p>
</dd>
</dl>

<a name="Field"></a>

## Field
**Kind**: global class  

* [Field](#Field)
    * [new Field()](#new_Field_new)
    * _instance_
        * [.validate(fieldData)](#Field+validate) ⇒
        * [.validateField(fieldData)](#Field+validateField) ⇒
        * [.validateObject(fieldData)](#Field+validateObject) ⇒
        * [.validateArray(arrayData)](#Field+validateArray) ⇒
        * [._defineType()](#Field+_defineType)
        * [._add(filter)](#Field+_add) ⇒ <code>this</code>
        * [.custom(filter)](#Field+custom) ⇒ <code>this</code>
        * [.default(defaultValue)](#Field+default) ⇒ <code>this</code>
        * [.nullable()](#Field+nullable) ⇒ <code>this</code>
        * [.optional()](#Field+optional) ⇒ <code>this</code>
        * [.arrayOf(fieldOrSchema, ...args)](#Field+arrayOf) ⇒ <code>this</code>
        * [.objectOf(objectOfFieldsOrSchema, ...args)](#Field+objectOf) ⇒ <code>this</code>
    * _static_
        * [.Field](#Field.Field)
            * [new Field(_label)](#new_Field.Field_new)

<a name="new_Field_new"></a>

### new Field()
Definition of Field.

<a name="Field+validate"></a>

### field.validate(fieldData) ⇒
Validates Field Data against Field.

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: Validated Field Data.  

| Param | Type | Description |
| --- | --- | --- |
| fieldData | <code>\*</code> | Field Data. |

<a name="Field+validateField"></a>

### field.validateField(fieldData) ⇒
Validated Field Data at high level.

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: Validated Field Data.  

| Param | Type | Description |
| --- | --- | --- |
| fieldData | <code>\*</code> | Field Data. |

<a name="Field+validateObject"></a>

### field.validateObject(fieldData) ⇒
Validates nested Fields of Object Field.

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: Validated Field Data.  

| Param | Type | Description |
| --- | --- | --- |
| fieldData | <code>\*</code> | Field Data. |

<a name="Field+validateArray"></a>

### field.validateArray(arrayData) ⇒
Validates nested Fields of Array Field.

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: Validated Array Data.  

| Param | Type | Description |
| --- | --- | --- |
| arrayData | <code>\*</code> | Array Data. |

<a name="Field+_defineType"></a>

### field.\_defineType()
Sets _isTypeDefined to true, so Field can only be of one type.

**Kind**: instance method of [<code>Field</code>](#Field)  
<a name="Field+_add"></a>

### field.\_add(filter) ⇒ <code>this</code>
Adds filter to stack.

**Kind**: instance method of [<code>Field</code>](#Field)  

| Param | Type |
| --- | --- |
| filter | <code>function</code> | 

<a name="Field+custom"></a>

### field.custom(filter) ⇒ <code>this</code>
Adds custom filter to stack.

**Kind**: instance method of [<code>Field</code>](#Field)  

| Param | Type |
| --- | --- |
| filter | <code>function</code> | 

<a name="Field+default"></a>

### field.default(defaultValue) ⇒ <code>this</code>
Defines default value that will be returned if Field Data is undefined.

**Kind**: instance method of [<code>Field</code>](#Field)  

| Param | Type |
| --- | --- |
| defaultValue | <code>\*</code> | 

<a name="Field+nullable"></a>

### field.nullable() ⇒ <code>this</code>
Allows Field Data to be null.

**Kind**: instance method of [<code>Field</code>](#Field)  
<a name="Field+optional"></a>

### field.optional() ⇒ <code>this</code>
Makes Field optional.

**Kind**: instance method of [<code>Field</code>](#Field)  
<a name="Field+arrayOf"></a>

### field.arrayOf(fieldOrSchema, ...args) ⇒ <code>this</code>
Defines Field as an Array with items defined by nested Field or Schema.

**Kind**: instance method of [<code>Field</code>](#Field)  

| Param | Type | Description |
| --- | --- | --- |
| fieldOrSchema | [<code>Field</code>](#Field) \| [<code>Schema</code>](#Schema) | Field or Schema. |
| ...args | <code>\*</code> |  |

<a name="Field+objectOf"></a>

### field.objectOf(objectOfFieldsOrSchema, ...args) ⇒ <code>this</code>
Defines Field as an Object with entries defined by nested object of Fields or Schema.

**Kind**: instance method of [<code>Field</code>](#Field)  

| Param | Type | Description |
| --- | --- | --- |
| objectOfFieldsOrSchema | [<code>Object.&lt;Field&gt;</code>](#Field) \| [<code>Schema</code>](#Schema) | Object of Fields or Schema. |
| ...args | <code>\*</code> |  |

<a name="Field.Field"></a>

### Field.Field
**Kind**: static class of [<code>Field</code>](#Field)  
<a name="new_Field.Field_new"></a>

#### new Field(_label)
Creates an instance of Field.


| Param | Type | Description |
| --- | --- | --- |
| _label | <code>String</code> | Field's Label. |

<a name="Model"></a>

## Model
**Kind**: global class  

* [Model](#Model)
    * [new Model()](#new_Model_new)
    * _instance_
        * [._id](#Model+_id) : <code>String</code>
        * [._createdAt](#Model+_createdAt) : <code>String</code>
        * [._updatedAt](#Model+_updatedAt) : <code>String</code>
        * [._collectionPath](#Model+_collectionPath) : <code>String</code>
        * [._collectionRef](#Model+_collectionRef) : <code>String</code>
        * [._docRef](#Model+_docRef) : <code>String</code>
        * [.emit(event)](#Model+emit)
        * [.delete()](#Model+delete)
        * [.save(options)](#Model+save) ⇒
        * [.validate([data], [all])](#Model+validate) ⇒
        * [.runHooks(hooks, [data])](#Model+runHooks) ⇒
        * [.parseData([data], [all])](#Model+parseData) ⇒
        * [.toJSON()](#Model+toJSON) ⇒ <code>Object</code>
    * _static_
        * [.Model](#Model.Model)
            * [new Model(_snapshot, _data)](#new_Model.Model_new)
        * [._collectionRef](#Model._collectionRef) : <code>CollectionReference</code>
        * [._events](#Model._events) : <code>EventEmitter</code>
        * [.on(event, cb)](#Model.on)
        * [.prehook(path, cb)](#Model.prehook)
        * [.posthook(path, cb)](#Model.posthook)
        * [.getById(id)](#Model.getById) ⇒ <code>this</code> \| <code>null</code>
        * [.getBy(key, value)](#Model.getBy) ⇒ <code>this</code> \| <code>null</code>
        * [.getAllBy(key, value, optionalModifiers)](#Model.getAllBy) ⇒ <code>Array.&lt;this&gt;</code>
        * [.create([data])](#Model.create) ⇒

<a name="new_Model_new"></a>

### new Model()
Boilerplate ODM to interact with Cloud Firestore.
Must be extended.

<a name="Model+_id"></a>

### model.\_id : <code>String</code>
ID of Document.

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+_createdAt"></a>

### model.\_createdAt : <code>String</code>
Date of Document creation in ISO String format.

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+_updatedAt"></a>

### model.\_updatedAt : <code>String</code>
Date of Document update in ISO String format.

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+_collectionPath"></a>

### model.\_collectionPath : <code>String</code>
Collection Path.

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+_collectionRef"></a>

### model.\_collectionRef : <code>String</code>
Collection Reference.

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+_docRef"></a>

### model.\_docRef : <code>String</code>
Document Reference.

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+emit"></a>

### model.emit(event)
Emits event.

**Kind**: instance method of [<code>Model</code>](#Model)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Event name. |

<a name="Model+delete"></a>

### model.delete()
Deletes Document.

**Kind**: instance method of [<code>Model</code>](#Model)  
<a name="Model+save"></a>

### model.save(options) ⇒
Saves changes made to Document.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: This.  

| Param | Type |
| --- | --- |
| options | <code>\*</code> | 

<a name="Model+validate"></a>

### model.validate([data], [all]) ⇒
Validates Document Data.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: Validated Data.  

| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>\*</code> | <code>{}</code> | 
| [all] | <code>boolean</code> | <code>false</code> | 

<a name="Model+runHooks"></a>

### model.runHooks(hooks, [data]) ⇒
Runs hooks on Document Data.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: Updated Document Data.  

| Param | Type | Default |
| --- | --- | --- |
| hooks | <code>Object</code> |  | 
| [data] | <code>Object</code> | <code>{}</code> | 

<a name="Model+parseData"></a>

### model.parseData([data], [all]) ⇒
Parses Document Data, running hooks and validating it.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: Updated and Validated Document Data.  

| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>\*</code> | <code>this._data</code> | 
| [all] | <code>boolean</code> | <code>false</code> | 

<a name="Model+toJSON"></a>

### model.toJSON() ⇒ <code>Object</code>
Exposes public data to be shown in API responses.

**Kind**: instance method of [<code>Model</code>](#Model)  
<a name="Model.Model"></a>

### Model.Model
**Kind**: static class of [<code>Model</code>](#Model)  
<a name="new_Model.Model_new"></a>

#### new Model(_snapshot, _data)
Creates an instance of Model.

**Returns**: <code>Proxy</code> - ModelProxy which handles data setters and getters.  

| Param | Type | Description |
| --- | --- | --- |
| _snapshot | <code>DocumentSnapshot</code> | Document Snapshot. |
| _data | <code>Object</code> | Document Data. |

<a name="Model._collectionRef"></a>

### Model.\_collectionRef : <code>CollectionReference</code>
Collection Reference.

**Kind**: static property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model._events"></a>

### Model.\_events : <code>EventEmitter</code>
Instance of EventEmitter used with this.on() and this.emit().

**Kind**: static property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model.on"></a>

### Model.on(event, cb)
Subsribes to event.

**Kind**: static method of [<code>Model</code>](#Model)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Event name. |
| cb | <code>function</code> | Callback function. |

<a name="Model.prehook"></a>

### Model.prehook(path, cb)
Adds hook that will be fired before parsing data
if this[path] has changed.

**Kind**: static method of [<code>Model</code>](#Model)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path of property. |
| cb | <code>function</code> | Callback function. |

<a name="Model.posthook"></a>

### Model.posthook(path, cb)
Adds hook that will be fired after parsing data
if this[path] has changed.

**Kind**: static method of [<code>Model</code>](#Model)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path of property. |
| cb | <code>function</code> | Callback function. |

<a name="Model.getById"></a>

### Model.getById(id) ⇒ <code>this</code> \| <code>null</code>
Fetches Document by ID.

**Kind**: static method of [<code>Model</code>](#Model)  
**Returns**: <code>this</code> \| <code>null</code> - Instance of Model or null.  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="Model.getBy"></a>

### Model.getBy(key, value) ⇒ <code>this</code> \| <code>null</code>
Fetches Document by key and value pair.

**Kind**: static method of [<code>Model</code>](#Model)  
**Returns**: <code>this</code> \| <code>null</code> - Instance of this or null.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Key. |
| value | <code>\*</code> | Value to compare. |

<a name="Model.getAllBy"></a>

### Model.getAllBy(key, value, optionalModifiers) ⇒ <code>Array.&lt;this&gt;</code>
Fetches all Documents by key and value pair.

**Kind**: static method of [<code>Model</code>](#Model)  
**Returns**: <code>Array.&lt;this&gt;</code> - Array of instances of this.  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>\*</code> | 
| optionalModifiers | <code>array</code> | 

<a name="Model.create"></a>

### Model.create([data]) ⇒
Creates new Document.

**Kind**: static method of [<code>Model</code>](#Model)  
**Returns**: Instance of this.  

| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>Object</code> | <code>{}</code> | 

<a name="Schema"></a>

## Schema
**Kind**: global class  

* [Schema](#Schema)
    * [new Schema()](#new_Schema_new)
    * _instance_
        * [.validate([data], [fields])](#Schema+validate) ⇒
        * [.validateSelected([data], [changedKeys])](#Schema+validateSelected) ⇒
    * _static_
        * [.Schema](#Schema.Schema)
            * [new Schema(_fields)](#new_Schema.Schema_new)

<a name="new_Schema_new"></a>

### new Schema()
Definition of Document Schema.

<a name="Schema+validate"></a>

### schema.validate([data], [fields]) ⇒
Validates Document Data agains Fields.

**Kind**: instance method of [<code>Schema</code>](#Schema)  
**Returns**: Validated Document Data.  

| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>Object</code> | <code>{}</code> | 
| [fields] | [<code>Object.&lt;Field&gt;</code>](#Field) | <code>this._fields</code> | 

<a name="Schema+validateSelected"></a>

### schema.validateSelected([data], [changedKeys]) ⇒
Validates Document Data against selected Fields.

**Kind**: instance method of [<code>Schema</code>](#Schema)  
**Returns**: Valdiated Document Data.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>Object</code> | <code>{}</code> | Document Data |
| [changedKeys] | <code>Set</code> | <code>new Set()</code> | Set with Paths of changed Fields. |

<a name="Schema.Schema"></a>

### Schema.Schema
**Kind**: static class of [<code>Schema</code>](#Schema)  
<a name="new_Schema.Schema_new"></a>

#### new Schema(_fields)
Creates an instance of Schema.


| Param | Type | Description |
| --- | --- | --- |
| _fields | [<code>Object.&lt;Field&gt;</code>](#Field) | Object containing Field definitions. |

<a name="asyncForEach"></a>

## asyncForEach(array, callback)
Runs async code for each item in array.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Array of items. |
| callback | <code>function</code> | Callback for each item. |

