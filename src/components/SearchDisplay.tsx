import * as React from 'react';

const SearchDisplay: React.FunctionComponent<{
  count: number;
}> = (props) => {
  return <h1>{props.count}</h1>;
};

export default SearchDisplay;