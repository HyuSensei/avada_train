import React, {useState} from 'react';
import {
  Page,
  Card,
  ResourceItem,
  ResourceList,
  Text,
  InlineStack,
  Layout,
  LegacyCard
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import usePaginate from '@assets/hooks/api/usePaginate';
import {formatDateOnly} from '@assets/helpers/utils/formatFullTime';
/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };
  const [sortValue, setSortValue] = useState('desc');

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

  const {data: notifications, loading, prevPage, nextPage, onQueryChange} = usePaginate({
    url: '/notifications',
    defaultLimit: 5,
    defaultSort: sortValue
  });

  const nextPageAllow = ({totalPages, currentPage}) => {
    if (totalPages === currentPage) {
      return false;
    }
    return true;
  };

  const previousPageAllow = currentPage => {
    if (currentPage === 1) {
      return false;
    }
    return true;
  };

  const renderItem = item => {
    const {id, firstName, city, country, productName, timestamp, productImage, createdAt} = item;
    return (
      <ResourceItem id={id}>
        <InlineStack align="space-between">
          <NotificationPopup
            firstName={firstName}
            city={city}
            country={country}
            productName={productName}
            timestamp={timestamp}
            productImage={productImage}
          />
          <Text as="p" fontWeight="medium">
            From {formatDateOnly(createdAt)}
          </Text>
        </InlineStack>
      </ResourceItem>
    );
  };

  return (
    <Page title="Notifications" subtitle="List of Sales notification from Shopify" fullWidth>
      <Layout>
        <Layout.Section>
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
                {label: 'Newest notifications', value: 'desc'},
                {label: 'Oldest notifications', value: 'asc'}
              ]}
              onSortChange={selected => {
                setSortValue(selected);
                onQueryChange('sort', selected, true);
              }}
              pagination={{
                hasPrevious: notifications[0]
                  ? previousPageAllow(notifications[0].currentPage)
                  : false,
                hasNext: notifications[0]
                  ? nextPageAllow({
                      totalPages: notifications[0].totalPages,
                      currentPage: notifications[0].currentPage
                    })
                  : false,
                onPrevious: prevPage,
                onNext: nextPage
              }}
              loading={loading}
              renderItem={item => renderItem(item)}
            />
          </Card>
        </Layout.Section>
        <LegacyCard.Section></LegacyCard.Section>
      </Layout>
    </Page>
  );
}
