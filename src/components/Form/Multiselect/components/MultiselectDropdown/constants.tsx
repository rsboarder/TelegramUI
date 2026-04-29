import styles from './MultiselectDropdown.module.css';

import { usePlatform } from 'hooks/usePlatform';

import { Icon20Select } from 'icons/20/select';
import { Icon20SelectIOS } from 'icons/20/select_ios';

import { Cell, CellProps } from 'components/Blocks/Cell/Cell';
import { MultiselectOption } from 'components/Form/Multiselect/types';

/**
 * Default option renderer. Receives the spreadable Cell props (including
 * `data-value` / `data-testid`) and the raw `option` as a separate
 * argument — keeping `option` out of the props bag means it can never
 * leak onto the rendered DOM as `option="[object Object]"`.
 */
export const renderOptionDefault = (
  props: CellProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _option: MultiselectOption,
) => {
  const platform = usePlatform();

  const SelectedIcon = platform === 'ios' ? Icon20SelectIOS : Icon20Select;
  return (
    <Cell
      {...props}
      after={props.selected ? <SelectedIcon className={styles.selectedIcon} /> : undefined}
    />
  );
};
