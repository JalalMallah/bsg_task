import React, { useEffect } from 'react';
import { MediaPlayer } from 'dashjs';

import styles from '../styles/ItemView.module.scss';

interface PropTypes {
  contentData: {
    contentUrl: string;
    description: string;
    title: string;
  },
  goBack: () => void;
}

const ItemView: React.FC<PropTypes> = ({ contentData, goBack }) => {

  useEffect(() => {
    const url = contentData.contentUrl;
    const player = MediaPlayer().create();
    player.initialize(document.querySelector('#video-player')! as HTMLElement, url, true);
  }, []);

  return (
    <>
      <h3 className={styles.itemTitle} >{contentData.title}</h3>
      <p className={styles.description} >{contentData.description}</p>
      <video id='video-player' className={styles.videoPlayer} controls ></video>
      <button onClick={goBack} className={styles.button} >Go Back To List View</button>
    </>
  )
};

export default ItemView;