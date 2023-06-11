import React from 'react';
import styles from './styles.module.scss';
//import { setSearchValue } from '../../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Index = ({searchValue, setSearchValue}) => {
    const dispatch = useDispatch();

    const inputRef = React.useRef();
    const onCrossClick = () => {
        setSearchValue('');
        inputRef.current.focus();
        inputRef.current.value = '';
    };

    const onChangeInput = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className={styles.root}>
            <svg className={styles.searchIcon} viewBox='0 0 32 32'>
                <title />
                <g id='search'>
                    <path d='M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z' />
                </g>
            </svg>
            <input
                value={searchValue}
                ref={inputRef}
                className={styles.input}
                placeholder={'Поиск книги'}
                onChange={(e) => onChangeInput(e)}
            />
            <svg
                onClick={() => onCrossClick()}
                className={styles.clearIcon}
                enableBackground='new 0 0 512 512'
                id='Layer_1'
                viewBox='0 0 512 512'
            >
                <path
                    d='M256,7C118.467,7,7,118.468,7,256.002C7,393.533,118.467,505,256,505s249-111.467,249-248.998  C505,118.468,393.533,7,256,7z M256,485.08c-126.31,0-229.08-102.771-229.08-229.078C26.92,129.692,129.69,26.92,256,26.92  c126.309,0,229.08,102.771,229.08,229.082C485.08,382.309,382.309,485.08,256,485.08z'
                    fill='#425661'
                />
                <polygon
                    fill='#425661'
                    points='368.545,157.073 354.461,142.988 255.863,241.587 157.733,143.456 143.648,157.54 241.78,255.672   143.648,353.809 157.733,367.893 255.863,269.75 354.461,368.361 368.545,354.275 269.947,255.672 '
                />
            </svg>
        </div>
    );
};

export default Index;