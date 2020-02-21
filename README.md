# Firestore Schema Validator

Elegant object modeling for Google Cloud Firestore.

Inspired by [mongoose](https://github.com/Automattic/mongoose) and [datalize](https://github.com/flowstudio/datalize).

## Installation

Requires `firebase-admine` package.

```bash
npm install --save firestore-schema-validator
```

## API Docs

[DOCS.md](/DOCS.md)

## Usage

### Schema & Model - Simple example
```javascript
// UserModel.js
const { Model, schema, field } = require('firestore-schema-validator')

const userSchema = schema({
  firstName: field('First Name')
    .string()
    .trim(),
  lastName: field('Last Name')
    .string()
    .trim(),
  email: field('Email Address')
    .string()
    .email(),
})

class UserModel extends Model {
  // Path to Cloud Firestore collection.
  static get _collectionPath() {
    return 'users'
  }

  // Model Schema.
  static get _schema() {
    return userSchema
  }
}
```

### Schema & Model - Robust example
```javascript
// UserModel.js
const { Model, schema, field } = require('firestore-schema-validator')

const userSchema = schema({
  firstName: field('First Name')
    .string()
    .trim(),
  lastName: field('Last Name')
    .string()
    .trim(),
  password: field('Password')
    .string()
    .match(/[A-Z]/, '%s must contain an uppercase letter.')
    .match(/[a-z]/, '%s must contain a lowercase letter.')
    .match(/[0-9]/, '%s must contain a digit.')
    .minLength(8),
  email: field('Email Address')
    .string()
    .email(),
  emailVerificationCode: field('Email Verification Code')
    .string()
    .nullable(),
  birthDate: field('Birth Date')
    .date('YYYY-MM-DD')
    .before(
      moment()
        .subtract(13, 'years')
        .toISOString(),
      'You must be at least 13 years old.',
    ),
  options: field('Options')
    .objectOf({
      lang: field('Language')
        .oneOf([
          'en-US',
          'pl-PL'
        ])
        .default('en-US'),
    })
})

class UserModel extends Model {
  static get _collectionPath() {
    return 'users'
  }

  static get _schema() {
    return userSchema
  }

  // You can define additional methods...
  static async getByEmail(email) {
    return await this.getBy('email', email)
  }

  // ... or getters.
  get isEmailVerified() {
    return Boolean(this._data.emailVerificationCode)
  }

  get fullName() {
    return `${this._data.firstName} ${this._data.lastName}`
  }

  // this.toJSON() by default returns this._data,
  // but you might want to display it differently
  // (eg. don't show password in responses,
  // combine firstName and lastName into fullName, etc.)
  toJSON() {
    return {
      id: this._id, // ID of Document stored in Cloud Firestore
      createdAt: this._createdAt, // ISO String format date of Document's creation.
      updatedAt: this._updatedAt, // ISO String format date of Document's last update.
      fullName: this.fullName,
      email: this.email,
      isEmailVerified: this.isEmailVerified,
    }
  }
}

// Fired when new user is successfully created and stored.
UserModel.on('created', async (user) => {
  // eg. send Welcome Email to User
})

// Fired when user is successfully updated and stored.
UserModel.on('updated', async (user) => {
  // eg. log info to console
})

// Fired when user is succsessfully deleted.
UserModel.on('deleted', async (user) => {
  // eg. delete photos uploaded by User
})

// Fired during user.validate() if user.email has changed,
// but *before* actually validating and storing the data.
UserModel.prehook('email', (data, user) => {
  // eg. set emailVerificationCode
})

// Fired during user.validate() if user.email has changed,
// but *after* actually validating and storing the data.
UserModel.posthook('email', (data, user) => {
  // eg. send Email Verification Email to User
})

UserModel.posthook('password', (data, user) => {
  // eg. hash password to store it securely
})
```

### Working with UserModel

```javascript
const admin = require('firebase-admin')
const User = require('../UserModel.js')

// Initialize Firebase
admin.initailizeApp({
  // config
})

const user = await User.create({
  firstName: 'Jon',
  lastName: 'Doe',
  email: 'jon.doe@example.com',
  password: 'J0nD03!@#',
  birthDate: '1990-01-10',
}) // => instance of UserModel

console.log(user.toJSON()) // =>
// {
//   id: 'x22sSpmaJek0CYS9KTsI'.
//   createdAt: '2019-06-14T15:46:55.108Z',
//   updatedAt: null,
//   fullName: 'Jon Doe',
//   email: 'jon.doe@example.com',
//   isEmailVerified: false,
// }

user.firstName = 'J'
user.foo = 'bar' // Won't be stored as it's not defined in UserModel._schema
await user.save() // => instance of UserModel

console.log(user.toJSON()) // =>
// {
//   id: 'x22sSpmaJek0CYS9KTsI'.
//   createdAt: '2019-06-14T15:46:55.108Z',
//   updatedAt: null,
//   fullName: 'J Doe',
//   email: 'jon.doe@example.com',
//   isEmailVerified: false,
// }

const fetchedUser = await UserModel.getByEmail('jon.doe@example.com') // => instance of UserModel

console.log(fetchedUser.toJSON()) // =>
// {
//   id: 'x22sSpmaJek0CYS9KTsI'.
//   createdAt: '2019-06-14T15:46:55.108Z',
//   updatedAt: null,
//   fullName: 'J Doe',
//   email: 'jon.doe@example.com',
//   isEmailVerified: false,
// }

await fetchedUser.delete()

const nonExistingUser = await UserModel.getByEmail('jon.doe@example.com') // => null
```

### Nesting Schema
`field.arrayOf(fieldOrSchema)` and `field.objectOf(objectOfFieldsOrSchema)` accept instances of Schema as an argument, so you can reuse repeatable schemas:

```javascript
const { schema, field } = require('firestore-schema-validator')

const simplifiedAddressSchema = schema({
  street: field('Street')
    .string()
    .trim(),
  countryCode: field('Country')
    .oneOf([
      'US',
      'CA',
    ]),
  zipCode: field('ZIP Code')
    .string()
    .trim(),
})

const userSchema = schema({
  firstName: field('First Name')
    .string()
    .trim(),
  lastName: field('Last Name')
    .string()
    .trim(),
  mailingAddress: field('Mailing Address')
    .objectOf(simplifiedAddressSchema),
})

const companySchema = schema({
  name: field('Company Name')
    .string()
    .trim(),
  locations: field('Locations')
    .arrayOf(simplifiedAddressSchema),
})
```

## TODO

- `Field.prototype.unique()` that checks if the value provided to field is unique in the collection.