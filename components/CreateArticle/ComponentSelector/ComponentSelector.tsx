import { ArrowDownOutlined, ArrowUpOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import ArticleHeader from 'components/Article/ArticleHeader';
import {
  ArticleComponent,
  ArticleComponentType,
  emptyImgComponent,
  emptySubtitleComponent,
  emptyTextComponent,
} from 'components/CreateArticle/ComponentSelector/ComponentType';
import { Flex } from 'UI/Flex';
import { TextArea, TextInput } from 'UI/Inputs';
import { MarginBox } from 'UI/MarginBox';

interface ComponentSelectorProps {
  addComponent: (component: ArticleComponent) => void;
  itemsCount: number;
}

export const ComponentSelector = ({ addComponent, itemsCount }: ComponentSelectorProps) => {
  const handleClick = (type: ArticleComponentType) => {
    const order = itemsCount;
    switch (type) {
      case 'h3':
        addComponent({
          ...emptySubtitleComponent,
          order,
        });
        return;
      case 'img':
        addComponent({
          ...emptyImgComponent,
          order,
        });
        return;
      default:
        addComponent({
          ...emptyTextComponent,
          order,
        });
        return;
    }
  };

  return (
    <Flex direction={'row'} justify={'center'}>
      <Button onClick={() => handleClick('h3')}>{'Section Title'}</Button>
      <MarginBox mr={8} />
      <Button onClick={() => handleClick('p')}>{'Text'}</Button>
      <MarginBox mr={8} />
      <Button onClick={() => handleClick('img')}>{'Picture'}</Button>
    </Flex>
  );
};

interface EditableComponentSelectorProps {
  item: ArticleComponent;
  articleContent: ArticleComponent[];
  setArticleContent: (content: ArticleComponent[]) => void;
}

export const EditableComponent = ({ item, articleContent, setArticleContent }: EditableComponentSelectorProps) => {
  const move = (direction: 'up' | 'down', order?: number) => {
    if (order) {
      const tmpContent = [...articleContent];
      const start = direction === 'up' ? order - 1 : order;
      const end = direction === 'up' ? order : order + 1;
      const previous = tmpContent.splice(start, 1)[0];
      const current = tmpContent.splice(start, 1)[0];
      tmpContent.splice(order, 0, { ...current, order: start });
      tmpContent.splice(order, 0, { ...previous, order: end });
      setArticleContent(tmpContent.sort((a, b) => (Number(a.order) > Number(b.order) ? 1 : -1)));
    }
  };

  const getEditableComponent = () => {
    switch (item.component) {
      case 'img':
        return (
          <Flex background={'white'}>
            <MarginBox mx={8} my={8}>
              <Upload listType="picture" maxCount={2} multiple onChange={(item) => console.log(item)}>
                <Button icon={<UploadOutlined />}>Upload (Max: 2)</Button>
              </Upload>
            </MarginBox>
          </Flex>
        );
      case 'h2':
        return (
          <Flex justify={'center'}>
            <ArticleHeader text={item.text} />
          </Flex>
        );
      case 'h3':
        return <TextInput value={item.text} onChange={(value) => console.log(value)} />;
      case 'p':
        return <TextArea value={item.text} onChange={(value) => console.log(value)} />;
      default:
        return <></>;
    }
  };

  return (
    <Flex direction={'row'}>
      {getEditableComponent()}
      {item.order !== 0 && (
        <MarginBox ml={8}>
          <Flex direction={'row'} justify={'flex-end'}>
            <Button onClick={() => move('up', item.order)} icon={<ArrowUpOutlined />} disabled={item.order === 1} />
            <MarginBox mr={8} />
            <Button
              onClick={() => move('down', item.order)}
              icon={<ArrowDownOutlined />}
              disabled={item.order === articleContent.length - 1}
            />
          </Flex>
        </MarginBox>
      )}
    </Flex>
  );
};
