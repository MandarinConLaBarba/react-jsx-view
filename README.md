## React JSX View Component

A simple component that renders component instances back to JSX. Useful for displaying mounted components in example form.

## Please check out the [Demo](http://mandarinconlabarba.github.io/react-jsx-view/example/index.html).

## Install

```
npm install --save react-jsx-view
```

## General Usage

```

var JSXView = require('react-jsx-view');

    ...

    <JSXView>
        <div>This is a test</div>
        <SomeComponent/>
    </JSXView>

```

This will render the JSX representation, with all the props (explicit + default) merged:

```

    <div>This is a test</div>
    <SomeComponent
        prop1={...}
        prop2={...} />

```

## Props

### excludedAttributes={Array}

Used to prevent attributes from being rendered...some things you may want to hide..format:


```
 ["<ComponentDisplayName>.<Attribute>", ...]
```

Example:

```
 ["SomeComponent.prop1", "SomeComponent.prop2"]
```

### onPropMouseOver={Function}

Function that's fired when an object or function is moused over

