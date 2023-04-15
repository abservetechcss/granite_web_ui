import React, { useState, createContext, useContext, useEffect } from 'react';

interface INavigationData {
  currentPath: string;
}

type NavigationContextType = {
  setNavigationData?: (data: INavigationData) => Promise<void>;
  navigationData: INavigationData;
};
const NavigationContext = createContext<NavigationContextType>({ navigationData: { currentPath: '' } });
const useNavigation = () => useContext(NavigationContext);

function NavigationProvider(props: any) {
  const [navigationData, setNavigationData] = useState({});

  return (
    <NavigationContext.Provider
      value={{ navigationData, setNavigationData }}
      {...props}
    />
  );
}

function withNavigationWatcher(Component: any) {
  return function (props: any) {
    const { path } = props.match;
    const { setNavigationData } = useNavigation();

    useEffect(() => {
      if (setNavigationData) { setNavigationData({ currentPath: path }); }
    }, [path, setNavigationData]);

    return React.createElement(Component, props);
  }
}

export {
  NavigationProvider,
  useNavigation,
  withNavigationWatcher
}
