import { useEffect, useCallback } from 'react';
import { useFormState, Control } from 'react-hook-form';
import { useTranslate } from '../i18n';
import { eventEmitter } from '../lib';

export const useUnsavedChangeNotifier = (
  enable: boolean,
  control?: Control,
  warnMessage = 'rs.message.unsaved_changes',
) => {
  const translate = useTranslate();

  const { isSubmitting, dirtyFields } = useFormState(control ? { control } : undefined);

  const warnWhen = enable && !isSubmitting && Object.keys(dirtyFields).length > 0;

  const warnWhenListener = useCallback(
    (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = translate(warnMessage);
      return e.returnValue;
    },
    [warnMessage, translate],
  );

  useEffect(() => {
    if (warnWhen) {
      window.addEventListener('beforeunload', warnWhenListener);
    }
    return () => {
      window.removeEventListener('beforeunload', warnWhenListener);
    };
  }, [warnWhenListener, warnWhen]);

  useEffect(() => {
    const routerChangeStart = () => {
      if (!warnWhen) {
        return;
      }
      const allowTransition = window.confirm(translate(warnMessage));
      if (allowTransition) {
        // go to next page
      } else {
        // todo: add blocker
      }
    };
    eventEmitter.on('routerChangeStart', routerChangeStart);
    return () => {
      eventEmitter.off('routerChangeStart', routerChangeStart);
    };
  }, [warnMessage, warnWhen, translate]);

  return null;
};
