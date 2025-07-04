import * as React from 'react';
import Routes from './Routes';

export const navigationRef = React.createRef() as any;

export function navigate(name: keyof typeof Routes, params: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(params: any) {
  navigationRef.current?.push(params.name, params.params);
}
