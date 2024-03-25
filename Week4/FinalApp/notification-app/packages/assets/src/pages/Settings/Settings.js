import React, {useCallback, useEffect, useState} from 'react';
import {
  Card,
  Layout,
  Page,
  Button,
  Text,
  InlineStack,
  Box,
  LegacyTabs,
  LegacyCard,
  Checkbox,
  BlockStack,
  Select,
  TextField,
  InlineGrid,
  RangeSlider,
  Frame
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import DesktopPositionInput from '../../components/DesktopPositionInput/DesktopPositionInput';
import ToastComponent from '../../components/Toast/Toast';
import Loading from '../../components/Loading/Loading';
import {api} from '../../helpers';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [showIncludedUrls, setShowIncludedUrls] = useState(false);
  const [helpText, setHelpText] = useState('This display position of the pop on your website');
  const [label, setLabel] = useState('Desktop position');
  const [isLoading, setIsLoading] = useState(false);
  const [activeToast, setActiveToast] = useState(false);
  const [message, setMessage] = useState('');
  const [erro, setErro] = useState(false);

  const [input, setInput] = useState({
    hideTimeAgo: false,
    truncateProductName: false,
    position: 'bottom-left',
    displayDuration: 30,
    popsInterval: 30,
    firstDelay: 30,
    maxPopsDisplay: 30,
    allowShow: '',
    includedUrls: '',
    excludedUrls: ''
  });

  const getSetting = async () => {
    try {
      setIsLoading(true);
      const res = await api('/settings');
      if (res.success) {
        setInput(prev => ({...prev, ...res.data}));
        setIsLoading(false);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleChangeInput = (key, value) => {
    setInput(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await api('/settings', {method: 'PUT', body: input});
      if (res.success) {
        setInput(prev => ({...prev, ...input}));
        setIsLoading(false);
        setMessage(res.message);
        setActiveToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input.allowShow === 'specific') {
      setShowIncludedUrls(true);
      input.includedUrls = '';
    }
    if (input.allowShow === 'all') {
      setShowIncludedUrls(false);
      input.includedUrls = '';
    }
  }, [input.allowShow]);

  //Tabs
  const handleTabChange = selectedTabIndex => {
    setSelected(selectedTabIndex);
  };

  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];

  const tabs = [
    {
      id: 1,
      content: 'Display'
    },
    {
      id: 2,
      content: 'Triggers'
    }
  ];

  const DisplaySettings = () => {
    return (
      <>
        <BlockStack gap="500">
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
          <InlineGrid gap="400" columns={2}>
            <BlockStack gap="500">
              <RangeSlider
                label="Display duration"
                value={input.displayDuration}
                onChange={value => handleChangeInput('displayDuration', value)}
                output
                helpText="How long each pop will display on your page."
                suffix={<Card padding="300">{input.displayDuration} second(s)</Card>}
                max={60}
              />
              <RangeSlider
                label="Gap time between two pops"
                value={input.popsInterval}
                onChange={value => handleChangeInput('popsInterval', value)}
                output
                helpText="The time interval between two popup notifications."
                suffix={<Card padding="300">{input.popsInterval} second(s)</Card>}
                max={60}
              />
            </BlockStack>
            <BlockStack gap="500">
              <RangeSlider
                label="Time before the first pop"
                value={input.firstDelay}
                onChange={value => handleChangeInput('firstDelay', value)}
                output
                helpText="The delay time before the first notification."
                suffix={<Card padding="300">{input.firstDelay} second(s)</Card>}
                max={60}
              />
              <RangeSlider
                label="Maximum of popups"
                value={input.maxPopsDisplay}
                onChange={value => handleChangeInput('maxPopsDisplay', value)}
                output
                helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80."
                max={80}
                suffix={<Card padding="300">{input.maxPopsDisplay} pop(s)</Card>}
              />
            </BlockStack>
          </InlineGrid>
        </BlockStack>
      </>
    );
  };

  const TriggerSettings = () => {
    return (
      <>
        <BlockStack gap="500">
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
        </BlockStack>
      </>
    );
  };
  return (
    <Frame>
      <Page
        title="Settings"
        subtitle="Decide how your notifications will display"
        primaryAction={
          <Button disabled={isLoading} onClick={handleSave} variant="primary">
            Save
          </Button>
        }
        fullWidth
      >
        <Layout sectioned>
          <Card sectioned>
            {!isLoading ? (
              <InlineGrid columns={['oneThird', 'twoThirds']} gap="400">
                <NotificationPopup />
                <LegacyCard>
                  <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <LegacyCard.Section
                      title={selected === 0 ? DisplaySettings() : TriggerSettings()}
                    ></LegacyCard.Section>
                  </LegacyTabs>
                </LegacyCard>
              </InlineGrid>
            ) : (
              <Loading pastDelay={isLoading} />
            )}
          </Card>
        </Layout>
      </Page>
      <ToastComponent
        active={activeToast}
        setActive={setActiveToast}
        message={message}
        erro={erro}
      />
    </Frame>
  );
}

Settings.propTypes = {};
