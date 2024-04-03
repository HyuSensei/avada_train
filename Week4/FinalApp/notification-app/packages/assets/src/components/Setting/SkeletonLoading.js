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
              <SkeletonDisplayText size="small" />
              <InlineStack gap={400}>
                <SkeletonThumbnail size="large" />
                <SkeletonThumbnail size="large" />
                <SkeletonThumbnail size="large" />
                <SkeletonThumbnail size="large" />
              </InlineStack>
              <SkeletonThumbnail size="small" />
              <SkeletonThumbnail size="small" />
              <SkeletonDisplayText size="small" />
              <Layout>
                <Layout.Section variant="oneHalf">
                  <LegacyCard.Section>
                    <SkeletonBodyText lines={3} />
                  </LegacyCard.Section>
                </Layout.Section>
                <Layout.Section variant="oneHalf">
                  <LegacyCard.Section>
                    <SkeletonBodyText lines={3} />
                  </LegacyCard.Section>
                </Layout.Section>
              </Layout>
            </BlockStack>
          </Card>
        </Layout.Section>
        <LegacyCard.Section></LegacyCard.Section>
        <LegacyCard.Section></LegacyCard.Section>
      </Layout>
    </SkeletonPage>
  );
}
