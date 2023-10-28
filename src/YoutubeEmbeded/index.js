import React from 'react';
import propTypes from 'prop-types';
import styles from './index.module.css';

export default function YouTubeEmbed({ videoID }) {
  return (
    <div className={styles.mainDiv}>
    <div className={ styles.videoContainer }>
        <h1>Video</h1>
        <iframe
          data-testid="video"
          src={ `https://www.youtube.com/embed/${videoID}` }
          frameBorder="0"
          title="Embedded youtube"
          allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture"
        />
      </div>
    </div>
  );
}

YouTubeEmbed.propTypes = {
  videoID: propTypes.string,
}.isRequired;
