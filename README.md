# sparkline

[![Build Status](https://travis-ci.org/Rowno/sparkline.svg?branch=master)](https://travis-ci.org/Rowno/sparkline)
[![Dependency Status](https://david-dm.org/Rowno/sparkline/status.svg)](https://david-dm.org/Rowno/sparkline)

Lightweight React sparklines ✨ 📈

![Example sparkline](example1.png)


## Install

```sh
yarn add @rowno/sparkline
# or
npm install --save @rowno/sparkline
```


## Example

```js
function Spark() {
  const lines = [
    {
      values: [789, 880, 676, 200, 890, 677, 900],
      colors: {
        area: 'rgba(217, 227, 237, 0.5)',
        line: '#193652'
      }
    }, {
      values: [354, 456, 200, 566, 344, 467, 545],
      colors: {
        area: 'rgba(199, 228, 255, 0.5)',
        line: '#004585'
      }
    }
  ]

  return (
    <Sparkline
      width={56}
      height={12}
      lines={lines}
      />
  )
}
```

Outputs: ![Example output](example2.png)


## Properties

```js
{
  width: 56,
  height: 12,
  lines: [{
    values: [789, 880, 676],
    colors: {
      area: 'rgba(217, 227, 237, 0.5)',
      line: '#193652'
    },
    title: 'Allowed events',
    key: 'allowed'
  }]
}
```

### width

Type: `number` (required)

Width of the sparkline.

### height

Type: `number` (required)

Height of the sparkline.

### lines

Type: `array<object>` (required)

Objects defining the lines to draw.

#### values

Type: `array<number>` (required)

Numbers that make up the data points of the line.

#### colors

Type: `object`

Custom colors for the line.

##### area

Type: `string`

Color of the line's filled in area.

##### line

Type: `string`

Color of the line's stroke.

#### title

Type: `string`

`title` of the line. Shown as a tooltip in the browser.

#### key

Type: `any`

Unique React `key` of the line.


## License

sparkline is released under the ISC license.

Copyright © 2017, Roland Warmerdam.
