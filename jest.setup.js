module.exports = async function () {
  // NOTE (pradeep): Can this be synced with the definitions in webpack configs?
  globalThis.__DEV__ = true;

  // NOTE (pradeep): `requestAnimationFrame` and `setInterval` is already defined by jsdom.
  // However, I'm redefining it to run the frame synchronously to make testing easier.
  globalThis.requestAnimationFrame = (callback) => callback();
  globalThis.setInterval = (callback, _interval) => callback();
};
