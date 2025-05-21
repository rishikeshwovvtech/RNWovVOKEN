import * as React from 'react';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef?.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    setTimeout(() => {
      navigationRef.current.navigate(name, params);
    }, 6000);
  }
}

export function resetNavigation(parent, child, tempAuthToken = '') {
  if (isReadyRef?.current && navigationRef.current) {
    // navigationRef.current?.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: parent,
    //       params: {
    //         screen: child,
    //         tempAuthToken:tempAuthToken
    //       },
    //     },
    //   ],
    // });

    navigationRef.current?.reset({
      index: 0,
      routes: [
        {
          name: parent,
          state: {
            routes: [
              {
                name: child,
                params: {
                  tempAuthToken: tempAuthToken,
                },
              },
            ],
          },
        },
      ],
    });
  }
}
