import React, { useEffect, useState } from 'react';
import Item from '../components/Item';
import ItemView from './ItemView';

import styles from '../styles/ListView.module.scss';

const url = 'https://thebetter.bsgroup.eu/Media/GetMediaList';

const requestData = {
  MediaListId: 2,
  IncludeCategories: false,
  IncludeImages: true,
  IncludeMedia: false,
  PageNumber: 1,
  PageSize: 15
  }

interface PropTypes {
  token: string;
}

interface ContentDataType {
  contentUrl: string;
  description: string;
  title: string;
}

const ListView: React.FC<PropTypes> = ({ token }) => {

  const [entities, setEntities] = useState<any[]>([]);
  const [shouldRenderItemView, setShouldRenderItemView] = useState<boolean>(false);
  const [itemViewData, setItemViewData] = useState<any>('');


  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body:  JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        setEntities(data.Entities)
      })
      .catch(error => console.error('Error: ', error));
  }, [token]);

  const renderItemView = (contentData: ContentDataType) => {
    setShouldRenderItemView(true);
    setItemViewData(contentData)
  };

  const renderListView = () => setShouldRenderItemView(false);

  const mappedEntities = entities.map(entity => (
    <Item 
      key={entity.Guid} 
      imageDetails={entity.Images.find((image: any) => image.ImageTypeCode === 'FRAME')} 
      renderItemView={renderItemView}
      title={entity.Title} 
      token={token}
    />
  ));

  if (shouldRenderItemView) {
    return (
      <main className={styles.container} >
        <ItemView 
          goBack={renderListView} 
          contentData={itemViewData} 
        />
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <h2>Video Content List</h2>
      <ul>
        {mappedEntities}
      </ul>
    </main>
  )
};

export default ListView;