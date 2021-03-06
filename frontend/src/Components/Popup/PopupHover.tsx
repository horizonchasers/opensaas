import React, { forwardRef, MouseEvent, useCallback, useRef, useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import { PopoverProps } from './types';
import { useStyles } from './styles';

const DEBOUNCE_DELAY = 100;

export const PopupHover = forwardRef<HTMLElement, PopoverProps>((props, ref) => {
  const { trigger, content, anchorOrigin, transformOrigin, mountNode } = props;

  const debounceRef = useRef<number>(0);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const onMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    clearTimeout(debounceRef.current);
    setAnchorEl(e.currentTarget);
  }, []);

  const onMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setAnchorEl(null);
    }, DEBOUNCE_DELAY);
  }, []);

  const onMouseEnterPopup = useCallback((e: MouseEvent<HTMLElement>) => {
    clearTimeout(debounceRef.current);
  }, []);

  return (
    <>
      {React.cloneElement(trigger, { ref, onMouseEnter, onMouseLeave })}
      <Popover
        className={classes.popover}
        container={mountNode}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus>
        <Box className={classes.box} onMouseEnter={onMouseEnterPopup} onMouseLeave={onMouseLeave}>
          {content}
        </Box>
      </Popover>
    </>
  );
});
