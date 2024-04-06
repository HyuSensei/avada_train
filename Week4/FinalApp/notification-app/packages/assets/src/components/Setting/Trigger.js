import React from 'react';
import {Text, Select, TextField, FormLayout, Card} from '@shopify/polaris';

export default function Trigger({input, handleChangeInput, showIncludedUrls}) {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];
  return (
    <Card>
      <FormLayout>
        <Text variant="headingSm" as="h6">
          PAGES RESTRICTION
        </Text>
        <Select
          labelInline
          options={options}
          onChange={value => handleChangeInput('allowShow', value)}
          value={input.allowShow}
        />
        {showIncludedUrls && (
          <TextField
            label="Included pages"
            multiline={4}
            helpText="Page URLs to show the pop-up (separated by new lines)"
            value={input.includedUrls}
            onChange={value => handleChangeInput('includedUrls', value)}
            autoComplete="off"
          />
        )}
        <TextField
          label="Excluded pages"
          multiline={4}
          helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          value={input.excludedUrls}
          onChange={value => handleChangeInput('excludedUrls', value)}
          autoComplete="off"
        />
      </FormLayout>
    </Card>
  );
}
