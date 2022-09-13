import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchUsersAction } from "../redux/actions/user-action";

function AutoComplete({
  style = {},
  type,
  className,
  keyword,
  handleClick,
  ...props
}) {
  const { searchUsers } = props;
  useEffect(() => {
    switch (type) {
      default: searchUsers(keyword)
    }
  }, [keyword]);

  return (
    <>
   {props[type].length ?  <div style={style} className="autocompleteContainer" onClick={handleClick}>
      {props[type]?.map((v, i) => {
        return (
          <div className="autocompleteItem" key={i}>
          {props.children(v)}
          </div>
        );
      })}
    </div> : ''}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (keyword) => {
      dispatch(searchUsersAction(keyword));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);
