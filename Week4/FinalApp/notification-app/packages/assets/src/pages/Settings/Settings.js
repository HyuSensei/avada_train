import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  Layout,
  Page,
  Button,
  Text,
  LegacyCard,
  Checkbox,
  BlockStack,
  Select,
  TextField,
  RangeSlider,
  Frame,
  Tabs,
  FormLayout,
  Box
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import SkeletonLoading from '../../components/Setting/SkeletonLoading';
import Display from '../../components/Setting/Display';
import Trigger from '../../components/Setting/Trigger';
import ToastComponent from '../../components/Toast/Toast';
import { api } from '../../helpers';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [showIncludedUrls, setShowIncludedUrls] = useState(false);
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

  const [isValidTextField, setIsValidTextField] = useState({
    displayDuration: true,
    popsInterval: true,
    firstDelay: true,
    maxPopsDisplay: true
  });
  const [erroValid, setErrorValid] = useState({
    displayDuration: '',
    popsInterval: '',
    firstDelay: '',
    maxPopsDisplay: ''
  });

  const isValidInput = () => {
    if (!input.displayDuration) {
      setIsValidTextField(prev => ({
        ...prev,
        displayDuration: false
      }));
      setErrorValid(prev => ({
        ...prev,
        displayDuration: 'Display duration is required'
      }));
      return false;
    }
    if (!input.popsInterval) {
      setIsValidTextField(prev => ({
        ...prev,
        popsInterval: false
      }));
      setErrorValid(prev => ({
        ...prev,
        popsInterval: 'Pops interval is required'
      }));
      return false;
    }
    if (!input.firstDelay) {
      setIsValidTextField(prev => ({
        ...prev,
        firstDelay: false
      }));
      setErrorValid(prev => ({
        ...prev,
        firstDelay: 'First delay is required'
      }));
      return false;
    }
    if (!input.maxPopsDisplay) {
      setIsValidTextField(prev => ({
        ...prev,
        maxPopsDisplay: false
      }));
      setErrorValid(prev => ({
        ...prev,
        maxPopsDisplay: 'Max pops display is required'
      }));
      return false;
    }
    return true;
  };

  const getSetting = async () => {
    try {
      setIsLoading(true);
      const res = await api('/settings');
      if (res.success) {
        setInput(prev => ({ ...prev, ...res.data }));
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
    setErrorValid(prev => ({
      ...prev,
      [key]: ''
    }));
    setIsValidTextField(prev => ({
      ...prev,
      [key]: true
    }));
  };

  const handleSave = async () => {
    try {
      const check = isValidInput();
      if (check) {
        setIsLoading(true);
        const res = await api('/settings', { method: 'PUT', body: input });
        if (res.success) {
          setInput(prev => ({ ...prev, ...input }));
          setIsLoading(false);
          setMessage(res.message);
          setActiveToast(true);
        }
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

  const tabs = [
    {
      id: 1,
      content: 'Display',
      body: <Display input={input}
        handleChangeInput={handleChangeInput}
        isValidTextField={isValidTextField}
        erroValid={erroValid} />
    },
    {
      id: 2,
      content: 'Triggers',
      body: <Trigger
        input={input}
        handleChangeInput={handleChangeInput}
        showIncludedUrls={showIncludedUrls} />
    }
  ];

  return !isLoading ? (
    <Page
      title="Settings"
      subtitle="Decide how your notifications will display"
      primaryAction={
        <Button loading={isLoading} onClick={handleSave} variant="primary">
          Save
        </Button>
      }
      fullWidth
    >
      <Layout>
        <>
          <Layout.Section variant="oneThird">
            <NotificationPopup />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
                {
                  tabs[selected].body
                }
              </Tabs>
            </Card>
          </Layout.Section>
        </>
      </Layout>
    </Page>
  ) : (
    <SkeletonLoading />
  );
  // {/* <ToastComponent
  //   active={activeToast}
  //   setActive={setActiveToast}
  //   message={message}
  //   erro={erro}
  // /> */}
}

Settings.propTypes = {};
