import React from 'react';
import {
  Card,
  Layout,
  LegacyCard,
  BlockStack,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonThumbnail,
  InlineStack,
  InlineGrid,
  SkeletonTabs
} from '@shopify/polaris';
export default function SkeletonLoading() {
  return (
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section variant="oneThird">
          <Card>
            <InlineGrid columns={['oneThird', 'twoThirds']}>
              <SkeletonThumbnail size="medium" />
              <SkeletonBodyText />
            </InlineGrid>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap={400}>
              <SkeletonTabs />
              <SkeletonDisplayText size="medium" />
              <InlineStack gap={400}>
                <SkeletonThumbnail size="large" />
                <SkeletonThumbnail size="large" />
                <SkeletonThumbnail size="large" />
                <SkeletonThumbnail size="large" />
              </InlineStack>
              <SkeletonThumbnail size="small" />
              <SkeletonThumbnail size="small" />
              <SkeletonDisplayText size="small" />
              <InlineGrid columns={2}>
                <LegacyCard.Section>
                  <SkeletonBodyText lines={5} />
                </LegacyCard.Section>
                <LegacyCard.Section>
                  <SkeletonBodyText lines={5} />
                </LegacyCard.Section>
              </InlineGrid>
            </BlockStack>
          </Card>
        </Layout.Section>
        <LegacyCard.Section></LegacyCard.Section>
        <LegacyCard.Section></LegacyCard.Section>
      </Layout>
    </SkeletonPage>
  );
}
