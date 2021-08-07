import React from 'react';

import styles from '../styles/Item.module.scss';

const url = 'https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo';

interface ContentDataType {
  contentUrl: string;
  description: string;
  title: string;
}

interface PropTypes {
  imageDetails: any;
  renderItemView: (contentData: ContentDataType) => void;
  title: string;
  token: string;
}

const Item: React.FC<PropTypes> = ({ imageDetails, renderItemView, title, token }) => {


  const getContent = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        "MediaId": imageDetails.MediaId,
        "StreamType": "TRIAL"
      }),
    })
      .then(response => response.json())
      .then(data => {
        const contentData = {
          contentUrl: data.ContentUrl,
          description: data.Description,
          title: data.Title
        };
        renderItemView(contentData);
      })
      .catch(error => console.error('Error: ', error));
  }

  return (
    <li className={styles.itemContainer} >
      <h3>{title}</h3>
      <div className={styles.imageContainer} >
        <img src={imageDetails.Url} alt={title} onClick={getContent} />
      </div>
    </li>
  )
};

export default Item;