/** RandomChance function factory.
 *
 * @param {number} chance percent chance of being true or not
 * @param {boolean} debug returns an object of functions if true
 * @returns a randomChance function or if debug is true, returns {randomChance: returns true or false based on chance, getResults: returns an object of results of all randomChance calls}
 */

const makeRandomChanceFunc = (chance, { debug }) => {
  const randomChance = () => Math.random() < chance;

  if (!debug) {
    return randomChance;
  }

  const results = { true: 0, false: 0 };

  const debugChance = () => {
    const res = randomChance();
    if (res) results.true++;
    else results.false++;
    return res;
  };

  const getResults = () => {
    return results;
  };
  return { randomChance: debugChance, getResults };
};

export { makeRandomChanceFunc };
