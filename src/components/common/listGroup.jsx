import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  return (
    <ul className="list-group">
      {props.items.map(item => (
        <li
          className="list-group-item"
          key={item._id}
          onClick={() => props.onItemChange(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string })
  ).isRequired,
  currentItem: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  onItemChange: PropTypes.func.isRequired
};

export default ListGroup;
