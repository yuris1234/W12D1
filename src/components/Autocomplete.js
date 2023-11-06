import React from 'react';
import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Autocomplete = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     inputVal: '',
  //     showList: false
  //   };
  //   this.inputRef = React.createRef();
  // }

  const [inputVal, setInputVal] = useState('');
  const [showList, setShowList] = useState(false);
  const inputRef = React.useRef();

  useEffect(() => {
    if (showList) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return (() => {
      document.removeEventListener('click', handleOutsideClick)
    })
  }, [showList])

  // componentDidUpdate() {
  //   if (this.state.showList) {
  //     document.addEventListener('click', this.handleOutsideClick);
  //   } else {
  //     console.log("Removing Autocomplete listener on update!");
  //     document.removeEventListener('click', this.handleOutsideClick);
  //   }
  // }
  // useEffect(() => {
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick)
  //   }
  // }, [])

  // componentWillUnmount () {
  //   console.log("Cleaning up event listener from Autocomplete!");
  //   document.removeEventListener('click', this.handleOutsideClick);
  // }

  const handleInput = (e) => {
    setInputVal(e.target.value);
    // this.setState({ inputVal: e.target.value });
  }

  const selectName = e => {
    e.stopPropagation();
    setInputVal(e.target.innerHTML);
    setShowList(false);
    // this.setState({ inputVal: e.target.innerHTML, showList: false });
  }

  const handleOutsideClick = () => {
    // Leave dropdown visible as long as input is focused
    if (document.activeElement === inputRef.current) return;
    else setShowList(false);
    // else this.setState({ showList: false });
  }

  const matches = () => {
    // const { inputVal } = state;
    const { names } = props;
    const inputLength = inputVal.length;
    const matches = [];

    if (inputLength === 0) return names;

    names.forEach(name => {
      const nameSegment = name.slice(0, inputLength);
      if (nameSegment.toLowerCase() === inputVal.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) matches.push('No matches');

    return matches;
  }

  const results = matches().map((result) => {
    const nodeRef = React.createRef();
    return (
      <CSSTransition
        nodeRef={nodeRef}
        key={result}
        classNames="result"
        timeout={{ enter: 500, exit: 300 }}
      >
        <li ref={nodeRef} className="nameLi" onClick={selectName}>
          {result}
        </li>
      </CSSTransition>
    )
  });

  return (
    <section className="autocomplete-section">
      <h1>Autocomplete</h1>
      <div className="auto">
        <input
          placeholder="Search..."
          ref={inputRef}
          onChange={handleInput}
          value={inputVal}
          onFocus={() => setShowList(true)}
        />
        {showList && (
          <ul className="auto-dropdown">
            <TransitionGroup>
              {results}
            </TransitionGroup>
          </ul>
        )}
      </div>
    </section>
  );
}

export default Autocomplete;