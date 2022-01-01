/* eslint no-underscore-dangle: "off", implicit-arrow-linebreak: "off", operator-linebreak: "off", max-len: "off" */

import _ from 'lodash';

export default class GamePool {
  constructor() {
    this.levelTierMatrix = {};
    this.champsInTier = {};
    this.uniqueChampsInTier = {};
    this.tiers = [];
    this.levels = [];
    this.fMemo = {};
  }

  _F = (num) => {
    if (num === 0) return 1;
    if (num === 1) return 1;

    const result = this.fMemo[num] !== undefined ? this.fMemo[num] : num * this._F(num - 1);
    this.fMemo[num] = result;
    return result;
  };

  _C = (total, selected) => this._F(total) / (this._F(total - selected) * this._F(selected));

  populateLevels = (levels) => {
    this.levels = levels;
    _.map(this.levels, (level) => {
      this.levelTierMatrix[level.getId()] = {};
    });
  };

  populateTiers = (tiers) => {
    this.tiers = tiers;
    _.map(this.levels || [], (level) => {
      _.map(this.tiers, (tier) => {
        this.levelTierMatrix[level.getId()][tier.getId()] = 0;
      });
    });
  };

  setTierProbabilityForLevel = ({ levelId, tierProbabilities }) => {
    if (!levelId || !tierProbabilities) return;

    if (!this.levelTierMatrix[levelId]) return;

    _.map(_.keys(tierProbabilities), (tier) => {
      this.levelTierMatrix[levelId][tier] = tierProbabilities[tier];
    });
  };

  setNChampsInTier = ({ tierId, number }) => {
    this.champsInTier[tierId] = number;
  };

  setNUniqueChampsInTier = ({ tierId, number }) => {
    this.uniqueChampsInTier[tierId] = number;
  };

  setChancesPerRoll = (number) => {
    this.chancesPerRoll = number;
  };

  setGoldPerRoll = (number) => {
    this.goldPerRoll = number;
  };

  getGoldPerRoll = () => this.goldPerRoll;

  getLevels = () => this.levels;

  getTiers = () => this.tiers;

  getRollEV = ({
    levelId,
    tierId,
    gold,
    championsOwned,
    otherChampionsOwned,
  }) => {
    if (!levelId || !tierId || !gold) return {};

    const numberRolls = gold / this.goldPerRoll;
    const probPerChance =
      this.levelTierMatrix[levelId][tierId] *
      ((this.getNChampsInTier(tierId) - championsOwned) /
        (this.getNChampsInTier(tierId) * this.getNUniqueChampsInTier(tierId) - championsOwned - otherChampionsOwned));

    return {
      ev: numberRolls * this.chancesPerRoll * probPerChance,
      numRolls: numberRolls,
      probPerChance,
    };
  };

  getRollProbability = ({
    levelId,
    tierId,
    gold,
    championsOwned,
    otherChampionsOwned,
  }) => {
    if (!levelId || !tierId || !gold) return {};

    const numberRolls = gold / this.goldPerRoll;
    const rollCorrectTierPr = this.levelTierMatrix[levelId][tierId];

    let probabilityRoll0 = 0;
    for (let i = 0; i <= this.chancesPerRoll; i += 1) {
      probabilityRoll0 +=
        this._C(this.chancesPerRoll, i) *
        (rollCorrectTierPr * (1 - this._getSingleRollProbability(tierId, championsOwned, otherChampionsOwned))) ** i *
        (1 - rollCorrectTierPr) ** (this.chancesPerRoll - i);
    }

    // let finalPr = 1;
    // for (let i = 2; i <= copies; i += 1) {
    //   let probabilityRollX = 0;
    //   for (let j = 0; j <= this.chancesPerRoll - i; i += 1) {
    //     probabilityRollX +=
    //       this._C(this.chancesPerRoll, copies) *
    //       (rollCorrectTierPr * this._getSingleRollProbability(tierId)) ** i *
    //       ((1 - rollCorrectTierPr) ** j *
    //         (rollCorrectTierPr * (1 - this._getSingleRollProbability(tierId)) ** (this.chancesPer))) **
    //         (this.chancesPerRoll - copies);
    //   }
    // }

    // console.log('[Probability]', totalProbability);

    return {
      probability: 1 - probabilityRoll0 ** numberRolls,
    };
  };

  _getSingleRollProbability = (tierId, championsOwned, otherChampionsOwned) => {
    const nThis = this.getNChampsInTier(tierId);
    const nUniqueChars = this.getNUniqueChampsInTier(tierId);

    return (nThis - championsOwned) / (nThis * nUniqueChars - championsOwned - otherChampionsOwned);
  };

  getProbabilityMatrix = () => this.levelTierMatrix || {};

  getNChampsInTier = (tierId) => (tierId ? this.champsInTier[tierId] : this.champsInTier);

  getNUniqueChampsInTier = (tierId) => {
    if (tierId) {
      return this.uniqueChampsInTier[tierId];
    }
    return this.uniqueChampsInTier;
  };
}
