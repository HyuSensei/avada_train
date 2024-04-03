import React, {useCallback, useEffect, useState} from 'react';
import {Card, Layout, Page, LegacyCard, Tabs} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import SkeletonLoading from '../../components/Setting/SkeletonLoading';
import Display from '../../components/Setting/Display';
import Trigger from '../../components/Setting/Trigger';
import {api} from '../../helpers';
import {useStore} from '@assets/reducers/storeReducer';
import {setToast} from '@assets/actions/storeActions';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [showIncludedUrls, setShowIncludedUrls] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const {dispatch} = useStore();

  const {loading, data: input, setData: setInput} = useFetchApi({
    url: '/settings'
  });
  console.log(('data:', input));
  const handleChangeInput = (key, value) => {
    setInput(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoadingSubmit(true);
      const res = await api('/settings', {method: 'PUT', body: input});
      if (res.success) {
        setInput(prev => ({...prev, ...input}));
        setToast(dispatch, res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (input.allowShow === 'specific') {
      setShowIncludedUrls(true);
    }
    if (input.allowShow === 'all') {
      setShowIncludedUrls(false);
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
      body: <Display input={input} handleChangeInput={handleChangeInput} />
    },
    {
      id: 2,
      content: 'Triggers',
      body: (
        <Trigger
          input={input}
          handleChangeInput={handleChangeInput}
          showIncludedUrls={showIncludedUrls}
        />
      )
    }
  ];

  if (loading) return <SkeletonLoading />;

  return (
    <Page
      title="Settings"
      subtitle="Decide how your notifications will display"
      primaryAction={{
        content: 'save',
        onAction: handleSave,
        loading: isLoadingSubmit
      }}
      fullWidth
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
              {tabs[selected].body}
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
      <LegacyCard.Section></LegacyCard.Section>
    </Page>
  );
}

Settings.propTypes = {};
