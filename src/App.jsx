/* eslint import/no-named-as-default: "off", import/no-named-as-default-member: "off" */

import './stylesheets/index.scss';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Home from './views/home';
import Level from './class/level';
import Tier from './class/tier';
import GamePool from './class/gamepool';

function App() {
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
  return (
    <div className="App">
      <RecoilRoot>
        <Routes>
          <Route path="/tft-calculator" element={<Home gamePool={gamePool} />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
