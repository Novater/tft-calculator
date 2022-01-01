/* eslint no-debugger: 1, react/forbid-prop-types: "off" */

import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../components/Icon';

export default function Home({ gamePool }) {
  const [goldToRoll, setGoldToRoll] = useState(0);
  const [prelimGoldToRoll, setPrelimGoldToRoll] = useState(0);
  const [level, setLevel] = useState(1);
  const [tier, setTier] = useState(1);
  const [championsOwned, setChampionsOwned] = useState(0);
  const [prelimChampionsOwned, setPrelimChampionsOwned] = useState(0);
  const [otherChampionsOwned, setOtherChampionsOwned] = useState(0);
  const [prelimOtherChampionsOwned, setPrelimOtherChampionsOwned] = useState(0);

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

  const EV = gamePool.getRollEV({
    levelId: level,
    tierId: tier,
    gold: goldToRoll || 0,
    championsOwned,
    otherChampionsOwned,
  }).ev || 0;

  const PR = gamePool.getRollProbability({
    levelId: level,
    tierId: tier,
    gold: goldToRoll || 0,
    copies: 1,
    championsOwned,
    otherChampionsOwned,
  }).probability || 0;

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
                <input title="Number of Desired Champion Out of Pool" id="champions-owned" value={prelimChampionsOwned} type="number" min="0" onChange={setNewPrelimChampionsOwned} data-tier={tier} onBlur={setNewChampionsOwned} />
              </label>
            </div>
            <div className="input-row">
              <label htmlFor="other-champions-owned" className="font-sans font-semibold">
                <p>Same Tier Copies Gone</p>
                <input title="Champions of Same Tier Out of Pool" id="other-champions-owned" value={prelimOtherChampionsOwned} type="number" min="0" onChange={setNewPrelimOtherChampionsOwned} data-tier={tier} onBlur={setNewOtherChampionsOwned} />
              </label>
            </div>
          </div>
          <div className="input-group" id="gold-and-exp">
            <label htmlFor="goldToRoll" className="font-sans font-semibold">
              <div className="input-row">
                <p style={{ display: 'none' }}>GOLD TO ROLL</p>
                <input title="Gold to Roll" id="goldToRoll" type="number" value={prelimGoldToRoll} onChange={setNewPrelimGoldToRoll} onBlur={setNewGoldToRoll} min="0" step="2" />
                <Icon type="coins" />
              </div>
            </label>
          </div>
        </div>
        <div className="graph-container">
          <div className="printed-stats">
            <p>
              {`E(Desired ${tier} Cost | Level ${level} and ${goldToRoll} gold) `}
              &#8773;
              {` ${EV}`}
            </p>
            <p>
              P(At least one copy)
              &#8773;
              {` ${PR}`}
            </p>
          </div>
        </div>
      </section>
      <section className="footer-container">
        <h1 className="font-sans">Tool by Novater.io</h1>
      </section>
    </div>
  );
}

Home.propTypes = {
  gamePool: PropTypes.object.isRequired,
};
