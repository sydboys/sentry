import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import DropdownButton from 'sentry/components/dropdownButton';
import DropdownMenu from 'sentry/components/dropdownMenu';
import {InlineContainer, SectionHeading} from 'sentry/components/charts/styles';
import {DropdownItem} from 'sentry/components/dropdownControl';
import DropdownBubble from 'sentry/components/dropdownBubble';
import space from 'sentry/styles/space';
import {SelectValue} from 'sentry/types';

type Props = {
  options: SelectValue<string>[];
  selected: string;
  onChange: (value: string) => void;
  title: string;
  menuWidth?: string;
};

function OptionSelector({options, onChange, selected, title, menuWidth = 'auto'}: Props) {
  const selectedOption = options.find(opt => selected === opt.value) || options[0];

  return (
    <InlineContainer>
      <SectionHeading>{title}</SectionHeading>
      <MenuContainer>
        <DropdownMenu alwaysRenderMenu={false}>
          {({isOpen, getMenuProps, getActorProps}) => (
            <React.Fragment>
              <StyledDropdownButton {...getActorProps()} size="zero" isOpen={isOpen}>
                {selectedOption.label}
              </StyledDropdownButton>
              <StyledDropdownBubble
                {...getMenuProps()}
                alignMenu="right"
                width={menuWidth}
                isOpen={isOpen}
                blendWithActor={false}
                blendCorner
              >
                {options.map(opt => (
                  <DropdownItem
                    key={opt.value}
                    onSelect={onChange}
                    eventKey={opt.value}
                    disabled={opt.disabled}
                    isActive={selected === opt.value}
                    data-test-id={`option-${opt.value}`}
                  >
                    {opt.label}
                  </DropdownItem>
                ))}
              </StyledDropdownBubble>
            </React.Fragment>
          )}
        </DropdownMenu>
      </MenuContainer>
    </InlineContainer>
  );
}

const MenuContainer = styled('div')`
  display: inline-block;
  position: relative;
`;

const StyledDropdownButton = styled(DropdownButton)`
  padding: ${space(1)} ${space(2)};
  font-weight: normal;
  color: ${p => p.theme.gray600};
  z-index: ${p => (p.isOpen ? p.theme.zIndex.dropdownAutocomplete.actor : 'auto')};

  &:hover,
  &:focus,
  &:active {
    color: ${p => p.theme.gray700};
  }
`;

const StyledDropdownBubble = styled(DropdownBubble)<{isOpen: boolean}>`
  display: ${p => (p.isOpen ? 'block' : 'none')};
`;

OptionSelector.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.string,
};

export default OptionSelector;
