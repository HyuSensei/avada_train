import React, {useState} from 'react';
import {Page, Card, ResourceItem, ResourceList, Text, InlineStack, Box} from '@shopify/polaris';
import {useStore} from '@assets/reducers/storeReducer';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import {formatDateOnly} from '@assets/helpers/utils/formatFullTime';
/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const {dispatch} = useStore();
  const [selectedItems, setSelectedItems] = useState([]);
  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const items = [
    {
      id: 1,
      firstName: 'John Doe',
      city: 'New York',
      country: 'United States',
      productName: 'Puffer Jacket With Hidden Hood',
      timestamp: 'a day ago',
      productImage:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTj6DoZBwRbMkXGyBWrWXPtVTWUnqRYa7uNcAUqunH1z7ZGkpRG'
    },
    {
      id: 2,
      firstName: 'John Doe',
      city: 'New York',
      country: 'United States',
      productName: 'Puffer Jacket With Hidden Hood',
      timestamp: 'a day ago',
      productImage:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTj6DoZBwRbMkXGyBWrWXPtVTWUnqRYa7uNcAUqunH1z7ZGkpRG'
    },
    {
      id: 3,
      firstName: 'John Doe',
      city: 'New York',
      country: 'United States',
      productName: 'Puffer Jacket With Hidden Hood',
      timestamp: 'a day ago',
      productImage:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTj6DoZBwRbMkXGyBWrWXPtVTWUnqRYa7uNcAUqunH1z7ZGkpRG'
    },
    {
      id: 4,
      firstName: 'John Doe',
      city: 'New York',
      country: 'United States',
      productName: 'Puffer Jacket With Hidden Hood',
      timestamp: 'a day ago',
      productImage:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTj6DoZBwRbMkXGyBWrWXPtVTWUnqRYa7uNcAUqunH1z7ZGkpRG'
    }
  ];

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit')
    }
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags')
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags')
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete')
    }
  ];

  const {data: notifications, loading} = useFetchApi({url: '/notifications'});
  console.log('notification:', notifications);

  const renderItem = item => {
    const {id, firstName, city, country, productName, timestamp, productImage} = item;
    return (
      <ResourceItem id={id}>
        <InlineStack align="space-between">
          <NotificationPopup
            firstName={firstName}
            city={city}
            country={country}
            productName={productName}
            timestamp={formatDateOnly(timestamp)}
            productImage={productImage}
          />
          <Box>
            <Text as="p" fontWeight="medium">
              From {formatDateOnly(timestamp)}
            </Text>
          </Box>
        </InlineStack>
      </ResourceItem>
    );
  };

  return (
    <Page title="Notifications" subtitle="List of Sales notification from Shopify" fullWidth>
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={notifications}
          bulkActions={bulkActions}
          promotedBulkActions={promotedBulkActions}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          sortValue={sortValue}
          sortOptions={[
            {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
            {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
          ]}
          onSortChange={selected => {
            setSortValue(selected);
            console.log(`Sort option changed to ${selected}.`);
          }}
          pagination={{
            hasNext: true,
            onNext: () => {}
          }}
          loading={loading}
          renderItem={item => renderItem(item)}
        />
      </Card>
    </Page>
  );
}
