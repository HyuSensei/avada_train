import React from 'react';
import './NoticationPopup.scss';
import {CheckIcon, XIcon} from '@shopify/polaris-icons';
import {Icon, InlineStack, Text, Box} from '@shopify/polaris';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTj6DoZBwRbMkXGyBWrWXPtVTWUnqRYa7uNcAUqunH1z7ZGkpRG'
}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <InlineStack align="space-between">
            <a href="#" className={'Avava-SP__LinkWrapper'}>
              <div
                className="Avava-SP__Image"
                style={{
                  backgroundImage: `url(${productImage})`
                }}
              ></div>
              <div className="Avada-SP__Content">
                <div className="Polaris-Text--headingXs">
                  {firstName} in {city}, {country}
                </div>
                <div className="Polaris-Text--root Polaris-Text--headingSm">
                  Purchased {productName}
                </div>
                <div style={{fontSize: '13px'}} className={'Avada-SP__Footer'}>
                  {/* <span className="uni-blue Polaris-Text--root Polaris-Text--headingMd"> */}
                  <InlineStack>
                    <Text variant="bodyLg" as="p">
                      {timestamp}
                    </Text>
                    <Box>
                      <InlineStack>
                        <Icon source={CheckIcon} tone="magic" />
                        <Text tone="magic-subdued" fontWeight="medium">
                          by AVADA
                        </Text>
                      </InlineStack>
                    </Box>
                  </InlineStack>
                  {/* </span> */}
                </div>
              </div>
            </a>
            <Box>
              <Icon source={XIcon} tone="base" />
            </Box>
          </InlineStack>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
