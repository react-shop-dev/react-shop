import {
  useRef,
  Children,
  ReactElement,
  ReactNode,
  isValidElement,
  useInsertionEffect,
  useMemo,
} from 'react';
import { isBrowser } from '@functions/isBrowser';

export type HeadProps = {
  children: ReactNode;
};

const SUPPORTED_TAGS = new Set(['title', 'base', 'meta', 'link', 'style']);
const set = new Set();

export const Head = ({ children }: HeadProps) => {
  const headElement = isBrowser() ? document?.getElementsByTagName('head')[0] : null;

  const tags = useMemo(() => {
    const tagsMap: Record<string, ReactElement[]> = {};

    Children.forEach(children, element => {
      if (isValidElement(element) && SUPPORTED_TAGS.has(element.type as string)) {
        const type = element.type as string;
        tagsMap[type] = [...(tagsMap[type] || []), element as ReactElement];
      }
    });

    return tagsMap;
  }, [children]);

  const mountedElements = useRef(set);

  useInsertionEffect(() => {
    if (!headElement) {
      return;
    }

    const tagsUpdates: Record<string, HTMLElement[]> = {};

    // Render title based on <title /> tag
    const renderTitle = () => {
      if (tags.title && tags.title[0]) {
        const title = tags.title[0].props.children;
        const finalTitle = Array.isArray(title) ? title.join('') : String(title);
        if (finalTitle !== document.title) {
          document.title = finalTitle;
        }
      }
    };

    // Render 'base', 'meta', 'link', 'style'
    for (const type in tags) {
      if (Object.prototype.hasOwnProperty.call(tags, type)) {
        if (type === 'title') continue;
        const components = tags[type];
        components.forEach(({ props }, index) => {
          const selector = getSelector(type, props);
          if (mountedElements.current.has(selector)) {
            updateExistingElement(document.querySelector(selector) as HTMLElement, props);
          } else {
            const newTag = reactElementToDom({ key: `${type}:${index}`, type, props });
            tagsUpdates[type] = [...(tagsUpdates[type] || []), newTag];
            mountedElements.current.add(selector);
          }
        });
      }
    }

    // Apply batched updates to the head element
    for (const type in tagsUpdates) {
      if (Object.prototype.hasOwnProperty.call(tagsUpdates, type)) {
        tagsUpdates[type].forEach(newTag => {
          headElement.insertAdjacentElement('afterbegin', newTag);
        });
      }
    }

    renderTitle();
  }, [headElement, children, tags, mountedElements]);

  return null;
};

const getSelector = (type: string, props: any) => {
  if (type === 'base') {
    return `base[href="${props.href}"]`;
  }
  if (type === 'link') {
    return `link[rel="${props.rel}"]`;
  }
  if (type === 'meta' && props.name !== 'next-error') {
    return `meta[name="${props.name}"]`;
  }
  if (type === 'style') {
    return `style[data-id="${props.id}"]`;
  }
  return props.id;
};

// Convert React element to DOM element
const reactElementToDom = ({ type, props }: JSX.Element): HTMLElement => {
  const element = document.createElement(type);
  const { children } = props;

  reactPropsToHtmlAttributes(props, element);

  if (children) {
    element.textContent =
      typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  }
  element.dataset.shop = 'true';

  return element;
};

// Update attributes of existing tag
const updateExistingElement = (existingTag: Element, props: any) => {
  const existingAttributes = existingTag?.getAttributeNames();

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const attr = propToAttr(key);
      if (!existingAttributes?.includes(attr) || existingTag?.getAttribute(attr) !== props[key]) {
        existingTag.setAttribute(attr, props[key]);
      }
    }
  }
};

// Convert React props to HTML attributes
const reactPropsToHtmlAttributes = (props: any, element: Element) => {
  for (const prop in props) {
    if (!Object.prototype.hasOwnProperty.call(props, prop)) continue;
    if (prop === 'children') continue;

    const attr = propToAttr(prop);
    const value = props[prop];

    if (value === 'boolean') {
      value ? element.setAttribute(attr, '') : element.removeAttribute(attr);
      return;
    }
    value != null ? element.setAttribute(attr, value) : element.removeAttribute(attr);
  }
};

const propToAttr = (prop: string) => prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
