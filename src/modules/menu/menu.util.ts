import { isNil, omit, omitBy, pick } from 'lodash';
import { ContentResponse } from './menu.type';

export const toResponseContentList = (contentList: Array<ContentResponse>) => {
  return contentList.map((item: ContentResponse) => {
    const _item = { ...item, ...item.content };
    const select = ['id', 'author', 'languageCode', 'description', 'status', 'author'];
    if (_item.startDate) select.push('startDate');
    return omitBy(pick(_item, select), isNil);
  });
};

export const toResponseContent = (contentData: ContentResponse) => {
  return omitBy(omit({ ...contentData, ...contentData.content }, ['updatedAt', 'content']), isNil);
};
