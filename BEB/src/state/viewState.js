import {atom} from 'jotai';

// 현재 활성 상태 (write-review, main-tab, book-info, search-results)
export const viewStateAtom = atom('main-tab');
