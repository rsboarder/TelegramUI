import styles from './MultiselectDropdown.module.css';

import { usePlatform } from 'hooks/usePlatform';

import { Icon20Select } from 'icons/20/select';
import { Icon20SelectIOS } from 'icons/20/select_ios';

import { Cell, CellProps } from 'components/Blocks/Cell/Cell';
import { MultiselectOption } from 'components/Form/Multiselect/types';

export const renderOptionDefault = ({
  option: _option,
  ...props
}: CellProps & { option?: MultiselectOption }) => {
  const platform = usePlatform();

  const SelectedIcon = platform === 'ios' ? Icon20SelectIOS : Icon20Select;
  return (
    <Cell
      {...props}
      after={props.selected ? <SelectedIcon className={styles.selectedIcon} /> : undefined}
    />
  );
};
