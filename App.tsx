import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';

import { store, persistor } from 'src/store';

import RootNavigation from 'navigations/RootNavigation';
import GlobalContext from 'components/globalContext';

const App = () => {

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      console.log('do multiple sync or async tasks');
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true, duration: 1000 });
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalContext>
          <RootNavigation />
        </GlobalContext>
      </PersistGate>
    </Provider>
  );
};

export default App;
