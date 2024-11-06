import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { type RootState } from '../../common/types/types';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };