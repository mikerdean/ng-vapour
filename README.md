# vapour

`vapour` is a web interface plugin for Kodi designed for use primarily with mobile devices (although other devices are also catered for).

## Installation

1. [Download the `vapour` addon from the releases tab](https://github.com/mikerdean/ng-vapour/releases).
2. Enable `Settings > Addons > Unknown resources` in Kodi
3. Use `Addons > Install from zip` option within Kodi and select the downloaded zip file

## Other information

To use this addon you will need to enable the following options in Kodi:

1. Enable `Settings > Services > Control > Allow Remote Control via HTTP`
2. Enable `Settings > Services > Control > Allow Remote Control from applications on this system`

`vapour` will attempt to connect to the default ports:

- HTTP Port: `8080`
- TCP Port: `9090`

You can change the default ports and host names if Kodi fails to connect to the defaults.

## Development

This project is developed using:

- AngularJS
- TailwindCSS
- Fontawesome
- ...along with many other utility libraries!

To hack on this repo, you can clone the repository and then:

```
npm install
```

To run the development server you can use:

```
npm start
```

This will start a `vite` development server, the address for accessing this will be displayed in your shell. In order to develop successfully with this repository, you will need a running version of Kodi, with the aforementioned options enabled.

For a better development experience with this repo, you can use [Volta](https://docs.volta.sh/guide/getting-started) to ensure nodeJS is the minimum version tested with this repository.
