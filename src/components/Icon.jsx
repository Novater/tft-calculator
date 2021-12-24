import propTypes from 'prop-types';

export default function Icon({ type }) {
  switch (type) {
    case 'levelup': {
      return (
        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="level-up-alt" className="svg-inline--fa fa-level-up-alt fa-w-10 levelup-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <g className="fa-group">
            <path className="fa-secondary" fill="currentColor" d="M232 160v328a24 24 0 0 1-24 24H12a12 12 0 0 1-8.48-20.48l56-56A12 12 0 0 1 68 432h84V160z" opacity="0.4" />
            <path className="fa-primary" fill="currentColor" d="M88 160c-20.94 0-31.76-25-17.6-40.33l104-112c.4-.43.82-.86 1.26-1.26a24 24 0 0 1 33.91 1.26l104 112C327.82 135 316.84 160 296 160z" />
          </g>
        </svg>
      );
    }
    case 'coins': {
      return (
        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="coins" className="svg-inline--fa fa-coins fa-w-16 coin-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g className="fa-group">
            <path className="fa-secondary" fill="currentColor" d="M416 311.4c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5zm-4.7-95.1c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2zM512 64c0-35.3-86-64-192-64S128 28.7 128 64s86 64 192 64 192-28.7 192-64z" opacity="0.4" />
            <path className="fa-primary" fill="currentColor" d="M192 320c106 0 192-35.8 192-80s-86-80-192-80S0 195.8 0 240s86 80 192 80zM0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zm0-104.9V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4z" />
          </g>
        </svg>
      );
    }
    default: {
      return null;
    }
  }
}

Icon.propTypes = {
  type: propTypes.string.isRequired,
};
