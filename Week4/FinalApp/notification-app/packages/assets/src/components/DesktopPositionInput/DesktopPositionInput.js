import React from 'react';
import PropTypes from 'prop-types';
import './DesktopPositionInput.scss';
import {Labelled, InlineStack, Text} from '@shopify/polaris';

const defaultOptions = [
  {label: 'Bottom Left', value: 'bottom-left'},
  {label: 'Bottom Right', value: 'bottom-right'},
  {label: 'Top Left', value: 'top-left'},
  {label: 'Top Right', value: 'top-right'}
];

const DesktopPositionInput = ({label, value, onChange, helpText, options = defaultOptions}) => {
  return (
    <Labelled label={label}>
      <InlineStack gap="400">
        {options.map((option, key) => (
          <div
            key={key}
            className={`Avada-DesktopPosition ${
              value === option.value ? 'Avada-DesktopPosition--selected' : ''
            }`}
            onClick={() => onChange('position', option.value)}
          >
            <div
              className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
            ></div>
          </div>
        ))}
      </InlineStack>
      <Text as="span" color="subdued">
        {helpText}
      </Text>
    </Labelled>
  );
};

DesktopPositionInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string
};

export default DesktopPositionInput;
