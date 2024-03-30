module.exports = async function () {
  console.log('ARGUMENTS', arguments);
  globalThis.__DEV__ = true;

  // NOTE (pradeep): `requestAnimationFrame` is already defined by jsdom.
  // However, I'm redefining it to run the frame synchronously to make testing easier.
  globalThis.requestAnimationFrame = (callback) => callback();
};
