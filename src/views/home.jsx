import React, { useState } from 'react';
import GamePool from '../config/gamepool';
import Level from '../config/level';
import Tier from '../config/tier';
import ProbabilityChart from '../components/ProbabilityChart';

export default function Home() {
  const [goldToRoll, setGoldToRoll] = useState(0);
  const [level, setLevel] = useState(0);
  const [tier, setTier] = useState(0);

  const gamePool = new GamePool();
  const levels = [];
  const tiers = [];
  for (let i = 1; i <= 11; i += 1) {
    const newLevel = new Level(i, i);
    levels.push(newLevel);
  }
  for (let i = 1; i <= 5; i += 1) {
    const newTier = new Tier(`${i}*`, i);
    tiers.push(newTier);
  }
  gamePool.populateLevels(levels);
  gamePool.populateTiers(tiers);
  gamePool.setTierProbabilityForLevel({
    levelId: 1,
    tierProbabilities: {
      1: 1,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 2,
    tierProbabilities: {
      1: 1,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 3,
    tierProbabilities: {
      1: 0.75,
      2: 0.25,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 4,
    tierProbabilities: {
      1: 0.55,
      2: 0.30,
      3: 0.15,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 5,
    tierProbabilities: {
      1: 0.45,
      2: 0.33,
      3: 0.20,
      4: 0.02,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 6,
    tierProbabilities: {
      1: 0.25,
      2: 0.40,
      3: 0.30,
      4: 0.05,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 7,
    tierProbabilities: {
      1: 0.19,
      2: 0.30,
      3: 0.35,
      4: 0.15,
      5: 0.01,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 8,
    tierProbabilities: {
      1: 0.15,
      2: 0.20,
      3: 0.35,
      4: 0.25,
      5: 0.05,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 9,
    tierProbabilities: {
      1: 0.10,
      2: 0.15,
      3: 0.30,
      4: 0.30,
      5: 0.15,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 10,
    tierProbabilities: {
      1: 0.05,
      2: 0.10,
      3: 0.20,
      4: 0.40,
      5: 0.25,
    },
  });
  gamePool.setTierProbabilityForLevel({
    levelId: 11,
    tierProbabilities: {
      1: 0.01,
      2: 0.02,
      3: 0.12,
      4: 0.50,
      5: 0.35,
    },
  });
  gamePool.setNChampsInTier({
    tierId: 1,
    number: 29,
  });
  gamePool.setNChampsInTier({
    tierId: 2,
    number: 22,
  });
  gamePool.setNChampsInTier({
    tierId: 3,
    number: 18,
  });
  gamePool.setNChampsInTier({
    tierId: 4,
    number: 12,
  });
  gamePool.setNChampsInTier({
    tierId: 5,
    number: 10,
  });
  gamePool.setNUniqueChampsInTier({
    tierId: 1,
    number: 13,
  });
  gamePool.setNUniqueChampsInTier({
    tierId: 2,
    number: 13,
  });
  gamePool.setNUniqueChampsInTier({
    tierId: 3,
    number: 13,
  });
  gamePool.setNUniqueChampsInTier({
    tierId: 4,
    number: 11,
  });
  gamePool.setNUniqueChampsInTier({
    tierId: 5,
    number: 9,
  });
  gamePool.setChancesPerRoll(5);
  gamePool.setGoldPerRoll(2);

  console.log(gamePool.getProbabilityMatrix());

  function setNewLevel(event) {
    setLevel(event.target.value);
  }

  function setNewTier(event) {
    setTier(event.target.value);
  }

  function setNewGoldToRoll(event) {
    setGoldToRoll(event.target.value);
  }

  return (
    <div className="homepage-container flex">
      <section className="banner-container font-sans font-semibold" />
      <section className="calculator-container">
        <div className="input-container">
          <div className="input-group">
            <label htmlFor="level">
              Level:
              <input id="level" type="text" value={level} onChange={setNewLevel} />
            </label>

          </div>
          <div className="input-group">
            <label htmlFor="tier">
              Tier:
              <input id="tier" type="text" value={tier} onChange={setNewTier} />
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="goldToRoll">
              Gold To Roll:
              <input id="goldToRoll" type="text" value={goldToRoll} onChange={setNewGoldToRoll} />
            </label>
          </div>
          <div>
            EV:
            {
              gamePool.getRollEV({
                levelId: level,
                tierId: tier,
                gold: goldToRoll,
              }).ev || 0
            }
          </div>
          <div>
            Num Rolls:
            {
              gamePool.getRollEV({
                levelId: level,
                tierId: tier,
                gold: goldToRoll,
              }).numRolls || 0
            }
          </div>
          <div>
            Probability Per Slot:
            {
              gamePool.getRollEV({
                levelId: level,
                tierId: tier,
                gold: goldToRoll,
              }).probPerChance || 0
            }
          </div>
        </div>
        <div className="graph-container"><ProbabilityChart /></div>
      </section>
      <section className="footer-container">
        <h1 className="font-sans">Tool by Novater.io</h1>
      </section>
    </div>
  );
}
