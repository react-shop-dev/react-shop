// https://ckeditor.com/blog/immutability-with-immer-clone/

const isDraft = Symbol('draft');

interface State {
  [key: string]: any;
}

interface Draft {
  base: State;
  isModified: boolean;
  copy?: State;
  parent: Draft | null;
  [key: string]: any;
}

export function produce(state: State, recipe: (draft: State) => void): State {
  const draft = createDraft(state);

  recipe(draft.proxy);

  return convertDraftToState(draft);
}

function createDraft(state: State, parent: Draft | null = null): Draft {
  const draft: Draft = {
    base: state,
    isModified: false,
    [isDraft]: true,
    parent,
  };
  const proxy = new Proxy(
    {},
    {
      set(_target, property, receiver) {
        markModified(draft);

        if (!draft.copy) {
          draft.copy = { ...draft.base };
        }

        return Reflect.set(draft.copy, property, receiver);
      },
      get(_target, property) {
        const baseValue = Reflect.get(draft.copy || draft.base, property);

        if (!baseValue || typeof baseValue !== 'object') {
          return baseValue;
        }

        if (!draft.copy) {
          draft.copy = { ...draft.base };
        }

        if (typeof property !== 'symbol' && !draft.copy[property][isDraft]) {
          draft.copy[property] = createDraft(draft.copy[property], draft);
        }

        const proxiedValue = Reflect.get(draft.copy, property);

        return proxiedValue.proxy;
      },
    },
  );

  draft.proxy = proxy;

  return draft;
}

function convertDraftToState(draft: Draft): State {
  if (!draft.isModified) {
    return draft.base;
  }
  const state = Object.entries(draft.copy || {}).reduce((state, [property, value]) => {
    const newValue = getPropertyValue(value);

    return { ...state, [property]: newValue };
  }, {});

  return state;
}

function getPropertyValue(value: any): any {
  if (isValueDraft(value)) {
    return convertDraftToState(value);
  }
  return value;
}

function isValueDraft(value: any): boolean {
  return value && value[isDraft];
}

function markModified(draft: Draft): void {
  draft.isModified = true;

  if (draft.parent) {
    markModified(draft.parent);
  }
}
