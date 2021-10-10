import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Icon, Tooltip, useStyles2 } from '@grafana/ui';
import { Rule } from 'app/types/unified-alerting';
import React, { FC } from 'react';

interface Prom {
  rule: Rule;
}

export const RuleHealth: FC<Prom> = ({ rule }) => {
  const style = useStyles2(getStyle);
  if (rule.health === 'err' || rule.health === 'error') {
    return (
      <Tooltip theme="error" content={rule.lastError || 'No error message provided.'}>
        <div className={style.warn}>
          <Icon name="exclamation-triangle" />
          <span>error</span>
        </div>
      </Tooltip>
    );
  }
  return <>{rule.health}</>;
};

const getStyle = (theme: GrafanaTheme2) => ({
  warn: css`
    display: inline-flex;
    flex-direction: row;
    color: ${theme.colors.warning.text};
    & > * + * {
      margin-left: ${theme.spacing(1)};
    }
  `,
});