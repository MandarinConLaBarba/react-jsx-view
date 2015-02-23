## React JSX View Component

A simple component that renders component instances back to JSX. Useful for displaying mounted components in example form.

## Please check out the [Demo](http://mandarinconlabarba.github.io/react-jsx-view/example/index.html).

## Install

```
npm install --save react-jsx-view
```

## General Usage

```

var JSXView = require('react-tree-menu');

    ...

    <JSXView>
        <div>This is a test</div>
        <SomeComponent/>
    </JSXView>

```

This will render the JSX representation, with all the props (explicit + default props merged:

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

