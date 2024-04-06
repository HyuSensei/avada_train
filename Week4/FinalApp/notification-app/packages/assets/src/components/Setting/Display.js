import React from 'react';
import {Text, Checkbox, TextField, RangeSlider, FormLayout, Box, Card} from '@shopify/polaris';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';

export default function Display({input, handleChangeInput}) {
  const helpText = 'This display position of the pop on your website';
  const label = 'Desktop position';
  return (
    <Card>
      <FormLayout>
        <Text variant="headingSm" as="h6">
          APPEARANCE
        </Text>
        <DesktopPositionInput
          label={label}
          value={input.position}
          helpText={helpText}
          onChange={handleChangeInput}
        />
        <Checkbox
          label="Hide time go"
          checked={input.hideTimeAgo}
          onChange={value => handleChangeInput('hideTimeAgo', value)}
        />
        <Checkbox
          label="Truncate content text"
          helpText="If your product name is long for one line, it will be truncated to 'Product name'"
          checked={input.truncateProductName}
          onChange={value => handleChangeInput('truncateProductName', value)}
        />
        <Text variant="headingSm" as="h6">
          TIMING
        </Text>
        <FormLayout>
          <FormLayout.Group condensed>
            <RangeSlider
              label="Display duration"
              value={input.displayDuration}
              onChange={value => handleChangeInput('displayDuration', value)}
              output
              helpText="How long each pop will display on your page."
              suffix={
                <Box maxWidth="140px">
                  <TextField
                    value={input.displayDuration}
                    type="number"
                    min={1}
                    max={60}
                    onChange={value => handleChangeInput('displayDuration', value)}
                    suffix={'second(s)'}
                  />
                </Box>
              }
              max={60}
            />
            <RangeSlider
              label="Gap time between two pops"
              value={input.popsInterval}
              onChange={value => handleChangeInput('popsInterval', value)}
              output
              helpText="The time interval between two popup notifications."
              suffix={
                <Box maxWidth="140px">
                  <TextField
                    value={input.popsInterval}
                    type="number"
                    min={1}
                    max={60}
                    onChange={value => handleChangeInput('popsInterval', value)}
                    suffix={'second(s)'}
                  />
                </Box>
              }
              max={60}
            />
          </FormLayout.Group>
        </FormLayout>
        <FormLayout>
          <FormLayout.Group condensed>
            <RangeSlider
              label="Time before the first pop"
              value={input.firstDelay}
              onChange={value => handleChangeInput('firstDelay', value)}
              output
              helpText="The delay time before the first notification."
              suffix={
                <Box maxWidth="140px">
                  <TextField
                    value={input.firstDelay}
                    type="number"
                    min={1}
                    max={60}
                    onChange={value => handleChangeInput('firstDelay', value)}
                    suffix={'second(s)'}
                  />
                </Box>
              }
              max={60}
            />
            <RangeSlider
              label="Maximum of popups"
              value={input.maxPopsDisplay}
              onChange={value => handleChangeInput('maxPopsDisplay', value)}
              output
              helpText="The maximum number of popups are allowed. Maximum number is 80"
              min={1}
              max={80}
              suffix={
                <Box maxWidth="140px">
                  <TextField
                    value={input.maxPopsDisplay}
                    type="number"
                    min={1}
                    max={80}
                    onChange={value => handleChangeInput('maxPopsDisplay', value)}
                    suffix={'pop(s)'}
                  />
                </Box>
              }
            />
          </FormLayout.Group>
        </FormLayout>
        {/* <Layout.Section variant="oneThird">
            <RangeSlider
              label="Display duration"
              value={input.displayDuration}
              onChange={value => handleChangeInput('displayDuration', value)}
              output
              helpText="How long each pop will display on your page."
              suffix={
                <Box maxWidth="140px">
                  <TextField
                    value={input.displayDuration}
                    type="number"
                    min={1}
                    max={60}
                    onChange={value => handleChangeInput('displayDuration', value)}
                    suffix={'second(s)'}
                  />
                </Box>
              }
              max={60}
            />
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <RangeSlider
              label="Gap time between two pops"
              value={input.popsInterval}
              onChange={value => handleChangeInput('popsInterval', value)}
              output
              helpText="The time interval between two popup notifications."
              suffix={
                <Box maxWidth="140px">
                  <TextField
                    value={input.popsInterval}
                    type="number"
                    min={1}
                    max={60}
                    onChange={value => handleChangeInput('popsInterval', value)}
                    suffix={'second(s)'}
                  />
                </Box>
              }
              max={60}
            />
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <RangeSlider
              label="Time before the first pop"
              value={input.firstDelay}
              onChange={value => handleChangeInput('firstDelay', value)}
              output
              helpText="The delay time before the first notification."
              suffix={
                <Box maxWidth="140px">
                  <TextField
                    value={input.firstDelay}
                    type="number"
                    min={1}
                    max={60}
                    onChange={value => handleChangeInput('firstDelay', value)}
                    suffix={'second(s)'}
                  />
                </Box>
              }
              max={60}
            />
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <RangeSlider
              label="Maximum of popups"
              value={input.maxPopsDisplay}
              onChange={value => handleChangeInput('maxPopsDisplay', value)}
              output
              helpText="The maximum number of popups are allowed. Maximum number is 80"
              min={1}
              max={80}
              suffix={
                <Box maxWidth="140px">
                  <TextField
                    value={input.maxPopsDisplay}
                    type="number"
                    min={1}
                    max={80}
                    onChange={value => handleChangeInput('maxPopsDisplay', value)}
                    suffix={'pop(s)'}
                  />
                </Box>
              }
            />
          </Layout.Section> */}
      </FormLayout>
    </Card>
  );
}
