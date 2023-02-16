import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';

import App from './App';
import {NotificationContextProvider} from './context/NotificationContextProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App/>
    </NotificationContextProvider>
  </QueryClientProvider>
);