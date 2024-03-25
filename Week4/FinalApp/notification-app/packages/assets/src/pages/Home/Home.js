import React, {useEffect, useState} from 'react';
import {Page, Layout, SettingToggle, Text} from '@shopify/polaris';
import {useStore} from '@assets/reducers/storeReducer';
// import {api} from '../../helpers';
/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const {dispatch} = useStore();
  // const getApi = async () => {
  //   try {
  //     const data = await api('/notifications');
  //     console.log('data:', data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getApi();
  // }, []);
  return (
    <Page title="Home">
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: enabled ? 'Disable' : 'Enable',
              onAction() {
                setEnabled(prev => !prev);
              }
            }}
            enabled={enabled}
          >
            <Text variant="bodyMd" as="span">
              App status is {enabled ? 'enabled' : 'disabled'}
            </Text>
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
