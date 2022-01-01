/* eslint no-debugger: 1 */

import _ from 'lodash';
import React, { useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import GamePool from '../class/gamepool';
import Level from '../class/level';
import Tier from '../class/tier';
import Icon from '../components/Icon';

export default function Home() {
  const [goldToRoll, setGoldToRoll] = useState(0);
  const [prelimGoldToRoll, setPrelimGoldToRoll] = useState(0);
  const [level, setLevel] = useState(1);
  const [tier, setTier] = useState(1);
  const [championsOwned, setChampionsOwned] = useState(0);
  const [prelimChampionsOwned, setPrelimChampionsOwned] = useState(0);
  const [otherChampionsOwned, setOtherChampionsOwned] = useState(0);
  const [prelimOtherChampionsOwned, setPrelimOtherChampionsOwned] = useState(0);

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

  function setNewLevel(event) {
    let newVal = parseInt(event.target.value, 10);
    newVal = Number.isNaN(newVal) ? 0 : newVal;
    setLevel(newVal);
    setPrelimOtherChampionsOwned(0);
    setOtherChampionsOwned(0);
    setPrelimChampionsOwned(0);
    setChampionsOwned(0);
  }

  function setNewTier(event) {
    let newVal = parseInt(event.target.value, 10);
    newVal = Number.isNaN(newVal) ? 0 : newVal;
    setTier(newVal);
    setPrelimOtherChampionsOwned(0);
    setOtherChampionsOwned(0);
    setPrelimChampionsOwned(0);
    setChampionsOwned(0);
  }

  function setNewPrelimGoldToRoll(event) {
    let newVal = parseInt(event.target.value, 10);
    newVal = Number.isNaN(newVal) ? 0 : newVal;
    setPrelimGoldToRoll(newVal);
  }

  function setNewGoldToRoll(event) {
    let newVal = parseInt(event.target.value, 10);
    newVal = Number.isNaN(newVal) ? 0 : newVal;
    setPrelimGoldToRoll(Math.ceil(newVal / 2) * 2);
    setGoldToRoll(Math.ceil(newVal / 2) * 2);
  }

  function setNewChampionsOwned(event) {
    setPrelimChampionsOwned(event.target.value);
    setChampionsOwned(event.target.value);
  }

  function setNewOtherChampionsOwned(event) {
    setPrelimOtherChampionsOwned(event.target.value);
    setOtherChampionsOwned(event.target.value);
  }

  function setNewPrelimChampionsOwned(event) {
    let newVal = parseInt(event.target.value, 10);
    newVal = Number.isNaN(newVal) ? 0 : newVal;
    newVal = newVal > gamePool.getNChampsInTier(tier)
      ? gamePool.getNChampsInTier(tier) : newVal;
    setPrelimChampionsOwned(newVal);
  }

  function setNewPrelimOtherChampionsOwned(event) {
    let newVal = parseInt(event.target.value, 10);
    newVal = Number.isNaN(newVal) ? 0 : newVal;
    const maxVal = gamePool.getNChampsInTier(tier)
      * gamePool.getNUniqueChampsInTier(tier) - gamePool.getNChampsInTier(tier);
    newVal = newVal > maxVal ? maxVal : newVal;
    setPrelimOtherChampionsOwned(newVal);
  }

  return (
    <div className="homepage-container flex">
      <section className="banner-container font-sans font-semibold" />
      <section className="calculator-container">
        <div className="input-container">
          <div className="input-group">
            <div className="input-row">
              <label htmlFor="level" className="font-sans font-semibold" id="curr-level">
                Current Level
                <div className="btn-group">
                  {
                    _.map(gamePool.getLevels(), (thisLevel, idx) => (
                      <button type="button" key={`level-${idx}`} className={`level-btn${thisLevel.getId().toString() === level.toString() ? ' selected' : ''}`} onClick={setNewLevel} value={thisLevel.getId()}>
                        {thisLevel.getName()}
                      </button>
                    ))
                  }
                </div>
              </label>
            </div>
          </div>
          <div className="input-group" id="champion-tier">
            <div className="input-row">
              <label htmlFor="tier" className="font-sans font-semibold">
                <p>Champion Tier</p>
                <div className="btn-group">
                  {
                    _.map(gamePool.getTiers(), (thisTier, idx) => (
                      <button type="button" key={`tier-${idx}`} id={`tier-${thisTier.getId().toString()}`} className={`level-btn${thisTier.getId().toString() === tier.toString() ? ' selected' : ''}`} onClick={setNewTier} value={thisTier.getId()}>
                        {thisTier.getName()}
                      </button>
                    ))
                  }
                </div>
              </label>
            </div>
            <div className="input-row">
              <label htmlFor="champions-owned" className="font-sans font-semibold">
                <p>Copies Gone</p>
                <input id="champions-owned" value={prelimChampionsOwned} type="number" min="0" onChange={setNewPrelimChampionsOwned} data-tier={tier} onBlur={setNewChampionsOwned} />
              </label>
            </div>
            <div className="input-row">
              <label htmlFor="other-champions-owned" className="font-sans font-semibold">
                <p>Same Tier Copies Gone</p>
                <input id="other-champions-owned" value={prelimOtherChampionsOwned} type="number" min="0" onChange={setNewPrelimOtherChampionsOwned} data-tier={tier} onBlur={setNewOtherChampionsOwned} />
              </label>
            </div>
          </div>
          <div className="input-group" id="gold-and-exp">
            <label htmlFor="goldToRoll" className="font-sans font-semibold">
              <div className="input-row">
                <p style={{ display: 'none' }}>GOLD TO ROLL</p>
                <input id="goldToRoll" type="number" value={prelimGoldToRoll} onChange={setNewPrelimGoldToRoll} onBlur={setNewGoldToRoll} min="0" step="2" />
                <Icon type="coins" />
              </div>
            </label>
          </div>
        </div>
        <div className="graph-container">
          <div className="printed-stats">
            <div>
              <MathJaxContext>
                <MathJax dynamic>
                  {`\\(E\\) (Desired ${tier} Cost at Level ${level} rolling ${goldToRoll} gold)`}
                </MathJax>
                <MathJax dynamic>
                  {`\\(\\leq \\frac{${goldToRoll || 0}}{${gamePool.getGoldPerRoll()}} * ${!_.isEmpty(gamePool.getProbabilityMatrix()) ? gamePool.getProbabilityMatrix()[level][tier] : 0} * \\frac{${gamePool.getNChampsInTier(tier)}}{${gamePool.getNChampsInTier(tier)} * ${gamePool.getNUniqueChampsInTier(tier)}}\\)`}
                </MathJax>
                <MathJax dynamic>
                  {'\\(\\approx \\hspace{1mm} \\)'}
                  {
                    gamePool.getRollEV({
                      levelId: level,
                      tierId: tier,
                      gold: goldToRoll || 0,
                      championsOwned,
                      otherChampionsOwned,
                    }).ev || 0
                  }
                </MathJax>
                <MathJax dynamic>
                  {'\\(P\\) (Rolling at least one)'}
                </MathJax>
                <MathJax dynamic>
                  {'\\(\\approx \\hspace{1mm} \\)'}
                  {
                    gamePool.getRollProbability({
                      levelId: level,
                      tierId: tier,
                      gold: goldToRoll || 0,
                      copies: 1,
                      championsOwned,
                      otherChampionsOwned,
                    }).probability || 0
                  }
                </MathJax>
              </MathJaxContext>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-container">
        <h1 className="font-sans">Tool by Novater.io</h1>
      </section>
    </div>
  );
}
