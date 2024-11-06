import { useDispatch } from 'react-redux';

import { type AppDispatch } from '../../common/types/types';

const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export { useAppDispatch };