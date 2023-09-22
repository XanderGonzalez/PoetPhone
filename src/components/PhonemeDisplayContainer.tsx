import * as React from 'react';
import { SearchBar, DisplayText } from "./header";
import PhonemeDisplay from './PhonemeDisplay';

const PhonemeDisplayContainer: React.FunctionComponent<{
  displayText: DisplayText;
  currentSearch: SearchBar;
  updateSearch: (e: SearchBar) => void;
}> = (p) => {
    return (
		<div className='phoneme-display-container'>
			<PhonemeDisplay {...p} />
		</div>
	);
};

export default PhonemeDisplayContainer;