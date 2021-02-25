# Firestore Schema Validator

> Elegant object modeling for Google Cloud Firestore.

![version](https://img.shields.io/github/package-json/v/bypatryk/firestore-schema-validator?color=informational)
![npm downloads](https://img.shields.io/npm/dm/firestore-schema-validator?color=informational)

## What is it?

Firestore Schema Validator allows you to define schemas, validate, and clean up data before pushing it to Cloud Firestore Database or displaying it to users.

It draws inspiration from [mongoose](https://github.com/Automattic/mongoose) and [datalize](https://github.com/flowstudio/datalize).

## Installation

Requires `firebase-admin` package.

```bash
npm install firestore-schema-validator --save
```

## Documentation

[DOCS.md](/DOCS.md)

## Usage

For more code examples check [Examples](#examples) page.

### Defining UserModel

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
  // Path of Firestore Collection
  static get _collectionPath() {
    return 'users'
  }

  // Schema
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
  // eg. send welcome email
})

// Fired when user is successfully updated and stored.
UserModel.on('updated', async (user) => {
  // eg. send email about changes
})

// Fired when user is succsessfully deleted.
UserModel.on('deleted', async (user) => {
  // eg. delete photos uploaded by User
})

// Fired during user.validate() if user.email has changed,
// but *before* validating the data.
UserModel.prehook('email', (data, user) => {
  // eg. set emailVerificationCode
})

// Fired during user.validate() if user.password has changed,
// but *after* validating the data.
UserModel.posthook('password', (data, user) => {
  // eg. hash password to store it securely
})
```

### Working with UserModel

```javascript
// index.js
const admin = require('firebase-admin')
const User = require('../UserModel.js')

// Initialize Firebase
admin.initailizeApp({
  // config
})

// Create User
const user = await User.create({
  firstName: 'Jon',
  lastName: 'Doe',
  email: 'jon.doe@example.com',
  password: 'J0nD03!@#',
  birthDate: '1990-01-10',
}) // => instance of UserModel

// Log User data
console.log(user.toJSON())
// {
//   id: 'x22sSpmaJek0CYS9KTsI'.
//   createdAt: '2019-06-14T15:46:55.108Z',
//   updatedAt: null,
//   fullName: 'Jon Doe',
//   email: 'jon.doe@example.com',
//   isEmailVerified: false,
// }

// Update User
user.firstName = 'J'
user.foo = 'bar' // Won't be stored as it's not defined in UserModel._schema
await user.save() // => instance of UserModel

// Get User
const fetchedUser = await UserModel.getByEmail('jon.doe@example.com') // => instance of UserModel

// Delete User
await fetchedUser.delete()

const nonExistingUser = await UserModel.getByEmail('jon.doe@example.com') // => null
```

## Roadmap

- [ ] `Field.prototype.unique` – checks if the value provided to field is unique in the collection.
- [ ] `Filed.prototype.immutable` – allows the field to be set only during creation.