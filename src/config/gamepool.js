import _ from 'lodash';

export default class GamePool {
  constructor() {
    this.levelTierMatrix = {};
    this.champsInTier = {};
    this.uniqueChampsInTier = {};
    this.tiers = [];
    this.levels = [];
  }

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

  getLevels = () => this.levels;

  getTiers = () => this.tiers;

  getRollEV = ({ levelId, tierId, gold }) => {
    if (!levelId || !tierId || !gold) return {};

    const numberRolls = gold / this.goldPerRoll;
    const probPerChance = this.levelTierMatrix[levelId][tierId]
      * (this.getNChampsInTier(tierId) / (this.getNChampsInTier(tierId)
      * this.getNUniqueChampsInTier(tierId)));

    return {
      ev: numberRolls * this.chancesPerRoll * probPerChance,
      numRolls: numberRolls,
      probPerChance,
    };
  };

  getProbabilityMatrix = () => this.levelTierMatrix;

  getNChampsInTier = (tierId) => (tierId ? this.champsInTier[tierId] : this.champsInTier);

  getNUniqueChampsInTier = (tierId) => {
    if (tierId) {
      return this.uniqueChampsInTier[tierId];
    }
    return this.uniqueChampsInTier;
  };
}
