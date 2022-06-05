import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';


const renderWithRouter = (ui, path = '/') => {
  const history = createBrowserHistory({ initialEntries: [path] });
  // history.push(path);
  const { ...resources } = render(
    <Router location={history.location} navigator={history}>
      {ui}
    </Router>,
  );
  return { ...resources, history };
};

export default renderWithRouter;
