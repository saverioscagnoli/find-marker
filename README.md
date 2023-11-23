# Find the closest arbitrary marker file

![npm-badge](https://img.shields.io/npm/v/find-marker)

## Usage

Let's say you have a project, called "root", and secondary sub-projects called "child-1" and "child-2", so your tree looks like this:

```md
base/path/to/root/
├── child-1/
│ ├── index.js
│ └── package.json
├── child-2/
│ └── package.json
├── ...
└── package.json
```

I _really really_ need to get the path of the "root" folder from
"child-1/index.js".

Using this package, you can add a `.marker` file to your "root" folder, and using this snippet, you can get it!

```js
import { findMarker } from "find-marker";

const rootPath = findMarker();

// -> "base/path/to/root"
```

You can pass options to the `findMarker` function:

| option     | description                                        | type    | default   |
| ---------- | -------------------------------------------------- | ------- | --------- |
| recursive? | Whether to search recursively for the marker file. | boolean | false     |
| file?      | The name of the marker file.                       | string  | ".marker" |

#### Examples

```js
findMarker({ file: "package.json" });

//-> Will search for the closest package.json
```

```js
findMarker({ recursive: true, file: ".prettierrc" });

//-> Will recursively search for the closest .prettierrc
```

### License

MIT (c) 2023 Saverio Scagnoli
