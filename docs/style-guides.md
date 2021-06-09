# Style Guides
This document describes the basic coding styles we should follow rather than implement new rules.

Note that the two sub-projects, server and client, are created from the template [typescript-express-starter](https://www.npmjs.com/package/typescript-express-starter) and [create-react-app](https://create-react-app.dev/docs/adding-typescript/). Additionally, we adopt airbnb modules.

It is recommended to read and follow basic rules at;

1. [typescript-eslint rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules)
1. [ESLint rules](https://eslint.org/docs/rules/)

### Server modules
[eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript) requires several modules related to React. To avoid those unnecessary dependencies, use `eslint-config-airbnb-base-ts` instead.
```json
{
  "eslint": "7.27.0",
  "eslint-config-airbnb-base-ts": "14.1.1",
  "eslint-config-prettier": "8.3.0",
  "eslint-plugin-prettier": "3.4.0"
}
```

### Client modules
```json
{
  "eslint-config-airbnb": "^18.2.1",
  "eslint-config-airbnb-typescript": "^12.0.0",
  "eslint-config-prettier": "^7.2.0",
  "eslint-config-react-app": "^6.0.0",
  "eslint-import-resolver-typescript": "^2.3.0",
  "eslint-plugin-import": "^2.22.1",
  "eslint-plugin-jest": "^24.1.3",
  "eslint-plugin-jsx-a11y": "^6.4.1",
  "eslint-plugin-prettier": "^3.3.1",
  "eslint-plugin-react": "^7.22.0",
  "eslint-plugin-react-hooks": "^4.2.0",
  "eslint-webpack-plugin": "^2.4.3",
  "jest-environment-jsdom-sixteen": "^1.0.3",
  "prettier": "^2.2.1",
  "prettier-eslint": "^12.0.0",
  "prettier-eslint-cli": "^5.0.0"
}
```

### Test
Although IDEs(VSCode or Webstorm) verify if the codes meet the rules, it is recommended to run `npm run lint` before committing.

### Ignoring a rule
In some cases, it's inevitable to ignore some rules.

**Ignore in a block**

```javascript
  transform: (doc, ret) => {
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-param-reassign */
    delete ret._id;
    delete ret.password;
  }
```

**Ignore a line**

```javascript
// eslint-disable-next-line no-alert
alert('foo');
```

### Disabling a rule

If a rule should be dropped, disable it in .eslintrc file
```json
{
  "rules": {
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-parameter-properties": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off"
  }
}
```
### References

- [Airbnb React/JSX Style Guide](https://airbnb.io/javascript/react/)
  
- [eslint-config-airbnb-base-ts](https://www.npmjs.com/package/eslint-config-airbnb-base-ts)
  see [Got npm install Warnings When Use eslint-config-airbnb-base](https://github.com/iamturns/eslint-config-airbnb-typescript/issues/6)
  
- [typescript-express-starter](https://www.npmjs.com/package/typescript-express-starter)
  
- [create-react-app --template typescript](https://create-react-app.dev/docs/adding-typescript/)
