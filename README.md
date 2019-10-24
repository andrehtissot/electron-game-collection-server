# Backend App
The [electron-game-collection](https://github.com/andrehtissot/electron-game-collection) project has frontend, backend and pluguins in different git repos.

## Reasons for a frontend (SPA) backend approach
- Faster to development the frontend aside, as newer browser console features can be used;
- Clear separation between the user's data (frontend) and common data (cache);
- Easier to work-around Cross Origin Request issues;
- To delegate async heavy load.

## Communication with frontend app
- HTTP
	- Simply to serve raw content fast;
	- One direction; And
	- E.g. cached images managed by plugins.
- WebSocket
	- By-directional messaging communication; And
	- `[operation: string, params: any[]] => [status: "SUCCESS" | "ERROR", payload: any]` standard.

The plugins, on both front and backend, act as extension of the app's functionality. And, to facilitate sharing data, share, the context from which to extend.

# The Other Repos
- [Frontend (ReactJS)](https://github.com/andrehtissot/electron-game-collection)
- [Steam plugin (frontend & backend)](https://github.com/andrehtissot/electron-game-collection-steam-plugin)
