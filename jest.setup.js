module.exports = async function () {
  // NOTE (pradeep): Can this be synced with the definitions in webpack configs?
  globalThis.__DEV__ = true;
};
