import React from 'react';
import Widget from '../../../Widget';
import { Col, Row } from 'reactstrap';

const COLORS = {
  black: '#000',
  gray: {},
  red: {},
  orange: {},
  yellow: {},
  green: {},
  teal: {},
  blue: {},
  indigo: {},
  purple: {},
  pink: {},
};

const SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '4rem',
};

const Typography: React.FC = () => {
  return (
    <div className='relative'>
      <Widget>
        <Col>
          {Object.entries(COLORS).map(([color]: [string, any], i: number) => {
            return Object.entries(SIZES).map(([size]: [string, any], j: number) => {
              if (color !== 'black') {
                const arr = [];
                for (let k = 1; k < 10; k++) {
                  arr.push(
                    <Row key={`${i}${j}${k}`}>
                      <Col sm={2} className='text-sm'>
                        <code>
                          .text-{color}-{k}00 .text-{size}
                        </code>
                      </Col>
                      <Col sm={10}>
                        <div className={`text-${color}-${k}00 text-${size}`}>Default full text</div>
                      </Col>
                    </Row>,
                  );
                }
                return arr;
              } else {
                return (
                  <Row key={`${i}${j}`}>
                    <Col sm={2} className='text-sm'>
                      <code>
                        .text-{color} .text-{size}
                      </code>
                    </Col>
                    <Col sm={10}>
                      <div className={`text-${color} text-${size}`}>Default full text</div>
                    </Col>
                  </Row>
                );
              }
            });
          })}
        </Col>
      </Widget>
    </div>
  );
};

export default Typography;
