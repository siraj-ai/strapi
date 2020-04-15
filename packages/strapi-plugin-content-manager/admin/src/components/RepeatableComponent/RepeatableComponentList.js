/* eslint-disable import/no-cycle */
import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import ItemTypes from '../../utils/ItemTypes';
import DraggedItem from './DraggedItem';

const RepeatableComponentList = ({
  componentErrorKeys,
  componentValue,
  fields,
  hasMinError,
  name,
  onMoveCollapse,
  onRemoveCollapse,
  toggleCollapses,
  collapses,
  schema,
}) => {
  const [, drop] = useDrop({ accept: ItemTypes.COMPONENT });

  return (
    <div ref={drop}>
      {componentValue.map((data, index) => {
        const componentFieldName = `${name}.${index}`;
        const doesPreviousFieldContainErrorsAndIsOpen =
          componentErrorKeys.includes(`${name}.${index - 1}`) &&
          index !== 0 &&
          get(collapses, [index - 1, 'isOpen'], false) === false;
        const hasErrors = componentErrorKeys.includes(componentFieldName);

        return (
          <DraggedItem
            fields={fields}
            componentFieldName={componentFieldName}
            doesPreviousFieldContainErrorsAndIsOpen={doesPreviousFieldContainErrorsAndIsOpen}
            hasErrors={hasErrors}
            hasMinError={hasMinError}
            isFirst={index === 0}
            isOpen={get(collapses, [index, 'isOpen'], false)}
            key={get(collapses, [index, '_temp__id'], null)}
            onClickToggle={() => {
              // Close all other collapses and open the selected one
              toggleCollapses(index);
            }}
            removeCollapse={() => onRemoveCollapse(index)}
            moveCollapse={onMoveCollapse}
            parentName={name}
            schema={schema}
            toggleCollapses={toggleCollapses}
          />
        );
      })}
    </div>
  );
};

RepeatableComponentList.defaultProps = {
  componentValue: null,
  fields: [],
};

RepeatableComponentList.propTypes = {
  componentValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fields: PropTypes.array,
  name: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
};

export default RepeatableComponentList;
